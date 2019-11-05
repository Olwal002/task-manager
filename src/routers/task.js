const express = require ('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {              // using post method to create tasks
    const task = new Task(req.body);        // creating the new task requiring the body    

    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/tasks', async(req, res) => {
    try{
    const tasks = await Task.find({});
    res.send(tasks)
    }catch(e){
        res.status(500).send();
    }
})

router.get('/tasks/:id', async(req, res) => { // fetches tasks by id
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
})

router.delete('/tasks/:id', async(req, res) => { // fetches tasks by id
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {router.delete('/tasks/:id', async(req, res) => { // fetches tasks by id
            const _id = req.params.id;
            try {
                const task = await Task.findByIdAndDelete(_id);
                if (!task) {
                    return res.status(404).send();
                }
                res.send(task);
        
            } catch (e) {
                res.status(500).send();
            }
        })
            return res.status(404).send();
        }
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;