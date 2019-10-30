const express = require('express');             // importing express from node modules
require ('./db/mongoose');                      //requiring mongoose from mongoose.js
const User = require('./models/user');
const Task = require('./models/task');         // importing both user and task from models

const app = express(); // creating a variable app and invoking the function express
const port =process.env.PORT || 3000; // creating server host to run on

app.use(express.json());  //

app.post('/users',(req,res) =>{              // using .post to create data to a server
    const user = new User(req.body);        // creating the new user requiring the body    

    user.save().then(()=>{
        res.status(201).send(user);          // saving and sending the code
    }).catch((error) =>{
        res.status(400).send(error);
    });
});

app.get('/users',(req,res) =>{
    User.find({}).then((users) =>{ //requests/fetches users using .get method
        res.send(users);
    }).catch((error) =>{
        res.status(500).send();
    })
})

app.get('/users/:id',(req,res) =>{    //fetches users by id
    const _id = req.params.id;

    User.findById(_id).then((user) =>{ // finding users by id 
        if(!user){
            return res.status(404).send(); // if id doesnt much any user throughs error
        }
        res.send(user);
    }).catch((e) =>{   // produces the error
        res.status(500).send();
    })
})

app.post('/tasks',(req,res) =>{              // using post method to create tasks
    const task = new Task(req.body);        // creating the new task requiring the body    

    task.save().then(()=>{
        res.status(201).send(task);          // saving and sending the tasks
    }).catch((error) =>{
        res.status(400).send(error);
    });
});

app.get('/tasks',(req,res) =>{
    Task.find({}).then((tasks) =>{ //using .get to retrieve or fetches tasks
        res.send(tasks);
    }).catch((error) =>{
        res.status(500).send();
    })
})

app.get('/tasks/:id',(req,res) =>{ // fetches tasks by id
    const _id = req.params.id;

    Task.findById(_id).then((task) =>{
        if(!task){
            return res.status(404).send(); // finding tasks by id
        }
        res.send(task);
    }).catch((e) =>{
        res.status(500).send(); //producing the error
    })
})

app.listen(port,() =>{
    console.log('server is on port' + port);     // the listening port
})