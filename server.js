const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

app.post('/upload-image', upload.single('image'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'Image uploaded successfully!' });
});

app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;

    res.json({ message: 'Message sent successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
