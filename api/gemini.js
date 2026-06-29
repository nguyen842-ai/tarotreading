export default async function handler(req, res) {
    // Chỉ chấp nhận phương thức POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST' });
    }

    try {
        const { prompt } = req.body;
        
        // Lấy danh sách các key từ Vercel
        const keysString = process.env.GEMINI_API_KEYS; 

        if (!keysString) {
            return res.status(500).json({ error: 'Chưa cài đặt API Keys trên Server' });
        }

        // Tách chuỗi thành mảng các key (dựa vào dấu phẩy)
        const apiKeys = keysString.split(',').map(key => key.trim()).filter(key => key.length > 0);
        
        let lastErrorData = null;
        let lastStatus = 500;

        // VÒNG LẶP XOAY VÒNG KEY
        for (let i = 0; i < apiKeys.length; i++) {
            const currentKey = apiKeys[i];
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${currentKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            
            // Nếu thành công (Mã 200), trả kết quả về web ngay lập tức và dừng vòng lặp
            if (response.ok) {
                return res.status(200).json(data);
            } 
            
            // Nếu thất bại, lưu lại lỗi
            lastErrorData = data;
            lastStatus = response.status;
            
            // Kiểm tra xem có phải lỗi hết hạn mức (Quota / 429) không
            const isQuotaError = response.status === 429 || (data.error && data.error.status === "RESOURCE_EXHAUSTED");
            
            if (isQuotaError) {
                // Đang hết hạn mức -> Bỏ qua và chạy tiếp vòng lặp để thử Key tiếp theo
                console.log(`Key thứ ${i + 1} hết hạn mức, chuyển sang key tiếp theo...`);
                continue; 
            } else {
                // Nếu là các lỗi nghiêm trọng khác (sai cú pháp, lỗi server Google...), thì báo lỗi luôn
                return res.status(response.status).json(data);
            }
        }

        // Nếu vòng lặp chạy hết sạch các Key mà vẫn lỗi (Tất cả Key đều cạn kiệt)
        return res.status(lastStatus).json(lastErrorData || { error: 'Tất cả các key đều đã hết hạn mức.' });

    } catch (error) {
        console.error("Lỗi Server:", error);
        return res.status(500).json({ error: 'Lỗi kết nối từ Server' });
    }
}
