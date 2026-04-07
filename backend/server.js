import express from "express";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Inventory API is running.' });
});


app.listen(PORT, ()=>{
    console.log(`API listening on http://localhost:${PORT}`);
})