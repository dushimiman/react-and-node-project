require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

if (!URL) {
    console.error('MONGO_URI is not defined. Please set it in the .env file.');
    process.exit(1); 
}

console.log('MongoDB URI:', URL); 

async function connectDB() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('db is connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); 
    }
}

connectDB();

app.get("/", (req, res) => {
    res.status(200).send('hello world');
});

app.use('/api/auth', authRoutes); 

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
