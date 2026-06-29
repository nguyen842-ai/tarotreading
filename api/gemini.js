export default async function handler(req, res) {
    // Chỉ chấp nhận phương thức POST từ Frontend gửi lên
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST' });
    }

    try {
        // Nhận câu hỏi (prompt) từ giao diện
        const { prompt } = req.body;
        
        // Lấy chìa khóa bí mật đã được giấu trên Vercel
        const apiKey = process.env.GEMINI_API_KEY; 

        if (!apiKey) {
            return res.status(500).json({ error: 'Chưa cài đặt API Key trên Server' });
        }

        // Tạo đường dẫn gọi thẳng sang Google Gemini
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        // Gửi yêu cầu sang Google
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        // Nếu Gemini báo lỗi (ví dụ: hết dung lượng)
        if (!response.ok) {
            return res.status(response.status).json(data);
        }
        
        // Trả kết quả thành công về lại cho giao diện web
        return res.status(200).json(data);

    } catch (error) {
        console.error("Lỗi Server:", error);
        return res.status(500).json({ error: 'Lỗi kết nối từ Server' });
    }
}
