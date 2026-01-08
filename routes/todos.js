const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Отримати всі задачі
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Створити задачу
router.post('/', async (req, res) => {
    const newTodo = new Todo({ title: req.body.title });
    await newTodo.save();
    res.json(newTodo);
});

// Оновити задачу
router.put('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(todo){
        todo.completed = req.body.completed;
        await todo.save();
        res.json(todo);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});

// Видалити задачу
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

module.exports = router;
