//const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js'
import bugRoutes from './routes/bug.routes.js'

const app = express();
const PORT = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!');
    return;
});

app.use('/auth', authRoutes);
app.use('/bugs', bugRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/bug-report-app')
    .then(() => console.log('Connected to the db!'))
    .catch(() => console.log('err'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
