const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // 🔥 ADD THIS
app.use(express.json());

let emails = []; // store data

// receive data from n8n
app.post('/api/email-data', (req, res) => {
    emails.unshift(req.body); // latest first
    console.log("Received:", req.body);
    res.json({ status: "ok" });
});

// send data to dashboard
app.get('/api/emails', (req, res) => {
    res.json(emails);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
