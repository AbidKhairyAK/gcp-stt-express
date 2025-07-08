import express from "express";
import multer from 'multer';
import cors from 'cors';
import { recognize } from "#recognition.js";
const app = express();
const port = "8080";
const upload = multer();
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://zyxadistizyx.prodemy.id',
        'https://didadistidid.prodemy.id',
        'https://adisti.astradigital.id',
    ]
}));
app.get("/", (req, res) => {
    res.send({ msg: "Hello world" });
});
app.post("/transcribe-audio", upload.single('audioFile'), async (req, res) => {
    if (!req.file?.buffer)
        throw new Error('audio file is required');
    const transcription = await recognize(req.file?.buffer);
    res.send({ transcription });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
