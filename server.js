// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Frontend (HTML/JS) ကနေခေါ်ဖို့အတွက်
app.use(express.json()); // JSON data ကိုလက်ခံဖို့အတွက်

// Google Gemini API Configuration
const genAI = new GoogleGenerativeAI(process.env.AIzaSyA3wcMBc76oKYQ4AUhws2HxIm-aRh11ONQ);

app.post('/api/get-horoscope', async (req, res) => {
    try {
        const { name, birthDate } = req.body;
        
        if (!name || !birthDate) {
            return res.status(400).json({ error: 'Name and birth date are required.' });
        }

        const prompt = `မြန်မာ့ရိုးရာဗေဒင်အဟောပညာအရ ${name} (မွေးနေ့: ${birthDate}) ရဲ့ ကံကြမ္မာအဟောကို အကျယ်တဝင့်ရေးပေးပါ။ အဟောထဲမှာ စီးပွားရေး၊ ကျန်းမာရေး၊ အချစ်ရေးနဲ့ လူမှုရေးကဏ္ဍတွေကို ထည့်သွင်းပေးပါ။`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ horoscope: text });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate horoscope.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
