// File: api/sheets.js
export default async function handler(req, res) {
    // Chỉ cho phép GET request
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const SPREADSHEET_ID = '1YzNgQbl3V0DogaPjtZpBZV9k6-ZwT8WTzTxefIcp2yo';
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY; 

    // Giả sử bạn muốn lấy dữ liệu từ 4 sheet đầu tiên
    const ranges = ['1', '2', '3', '4'];
    const rangesQuery = ranges.map(r => `ranges=${r}`).join('&');

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?${rangesQuery}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi kết nối đến Google Sheets' });
    }
}
