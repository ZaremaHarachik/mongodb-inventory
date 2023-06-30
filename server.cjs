const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const Item = require('./models/Item.cjs');

const app = express();
app.use(express.json());
const PORT = 5000;

dotenv.config();

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json(items);
    } catch (e) {
        res.status(500).json({
            error: "Error on server"
        })
    }
})

app.post('/items', async (req, res) => {
    const item = req.body;

    try {
        const newItem = await Item.create(item);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).json({
            error: "Error on server"
        })
    }
});

const start = async () => {
    try {
        // connect to db
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.4gc4dgk.mongodb.net/`)
        // launch express application
        app.listen(PORT, () => {
            console.log(`Server was started on http://localhost:${PORT}`)
        })
    } catch (e) {
        console.error(e);   
    }
}

start();
