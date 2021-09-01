const Habit = require('../model/Habit');

async function index(req, res) {
    try{
        const habits = await Habit.all;
        res.status(200).json( habits )
    }
    catch(err){
        res.status(404).json({err})
    }
}

async function show(req, res) {
    try{
        const habit = await Habit.findByName(req.params.name);
        res.status(200).json(habit)
    }
    catch(err){
        res.status(404).json({err})
    }
}

async function create(req, res) {
    try{
        const newHabit = await Habit.create(req.body)
        res.status(201).json(newHabit)
    }
    catch(err){
        res.status(422).json({err})
    }
}

async function update(req, res) {
    try{
        const updatedHabit = await Habit.update(req.params.name, req.body)
        res.status(200).json(updatedHabit)
    }
    catch(err){
        res.status().json({err})
    }
}

async function updateCount(req, res) {
    try{
        const updatedCount = await Habit.updateCount(req.params.name)
    }
    catch(err){

    }
}

async function destroy(req, res) {
    try{
        const deletedHabit = await Habit.destroy(req.params.name)
        res.status(200).json(deletedHabit)
    }
    catch(err){
        res.status(400).json({err})
    }
}

module.exports = { index, show, create, update, destroy }