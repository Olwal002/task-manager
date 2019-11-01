const express = require('express');             // importing express from node modules
require('./db/mongoose');                      //requiring mongoose from mongoose.js
const User = require('./models/user');
const Task = require('./models/task');         // importing both user and task from models

const app = express(); // creating a variable app and invoking the function express
const port = process.env.PORT || 3000; // creating server host to run on

app.use(express.json());  //formatting

app.post('/users',async (req, res) => {              // using .post to create data to a server
    const user = new User(req.body);        // creating the new user requiring the body    

    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

app.get('/users',async (req, res) => {
    try{
        const users = await Users.find({});
        res.send(users)
        }catch(e){
            res.status(500).send();
        }
})

app.get('/users/:id', async (req, res) => {    //fetches users by id
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);

    } catch (e) {
        res.status(500).send();
    }
})

app.patch('/users/:id',async(req,res) =>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'});
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            req.body,{new:true,runValidators:true});

            if(!user) {
                return res.status(404).send();
            }
            res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
})
app.post('/tasks', async (req, res) => {              // using post method to create tasks
    const task = new Task(req.body);        // creating the new task requiring the body    

    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

app.get('/tasks', async(req, res) => {
    try{
    const tasks = await Task.find({});
    res.send(tasks)
    }catch(e){
        res.status(500).send();
    }
})

app.get('/tasks/:id', async(req, res) => { // fetches tasks by id
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

app.listen(port, () => {
    console.log('server is on port' + port);     // the listening port
})