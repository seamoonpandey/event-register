import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const port=process.env.PORT||5000;

const app=express();

app.use(cors());

// Body parser middleware
app.get(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("API is running..... I think so!!!!");
});


app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
});