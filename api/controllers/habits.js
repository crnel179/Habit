const { ReturnDocument } = require('mongodb');
const  Habit = require('./model/Habit');

async function index(req, res) {
    try{
        const habits = await Habit.all;
        res.status(200).json(habits)
    }
    catch(err){
        res.status(400).json({err})
    }
}

async function show(req, res) {
    try{

        const habit = await Habit.findByName(req.param.name);
        res.status(200).json(habit)
    }
    catch(err){
        res.status(400).json({err})
    }
}

async function create(req, res) {
    try{
        const habit = await Habit.create(req.body)
        res.status(201).json(habit)
    }
    catch(err){
        res.status(401).json({err})
    }
}

async function update(req, res) {
    try{
        const habit = await Habit.update(req.param.name, req.body)
    }
}

