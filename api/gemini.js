export default async function handler(req, res) {
    // 1. CẤP QUYỀN CORS (Giấy thông hành để giao diện ở Github gọi được sang Vercel)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 2. Xử lý kịch bản "hỏi đường" (Preflight) của trình duyệt
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Chỉ chấp nhận POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST' });
    }

    try {
        const { prompt } = req.body;
        const keysString = process.env.GEMINI_API_KEYS; 

        if (!keysString) {
            return res.status(500).json({ error: 'Chưa cài đặt API Keys trên Server' });
        }

        const apiKeys = keysString.split(',').map(key => key.trim()).filter(key => key.length > 0);
        let lastErrorData = null;
        let lastStatus = 500;

        for (let i = 0; i < apiKeys.length; i++) {
            const currentKey = apiKeys[i];
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${currentKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            
            if (response.ok) {
                return res.status(200).json(data);
            } 
            
            lastErrorData = data;
            lastStatus = response.status;
            
            const isQuotaError = response.status === 429 || (data.error && data.error.status === "RESOURCE_EXHAUSTED");
            if (isQuotaError) {
                continue; 
            } else {
                return res.status(response.status).json(data);
            }
        }

        return res.status(lastStatus).json(lastErrorData || { error: 'Tất cả các key đều đã hết hạn.' });

    } catch (error) {
        console.error("Lỗi Server:", error);
        return res.status(500).json({ error: 'Lỗi kết nối từ Server' });
    }
}
