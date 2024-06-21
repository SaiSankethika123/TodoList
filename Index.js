const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is Running');
});
