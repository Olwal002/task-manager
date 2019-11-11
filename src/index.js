const express = require('express');             // importing express from node modules
require('./db/mongoose');                      //requiring mongoose from mongoose.js
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express(); // creating a variable app and invoking the function express
const port = process.env.PORT || 3000; // creating server host to run on

// app.use((req,res,next) =>{
//     res.status(503).send('Site is currently down')
// })
app.use(express.json());  //formatting
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    console.log('server is on port' + port);     // the listening port
})

// const bcrypt = require('bcryptjs'); // importing bcrypt from the node modules

// const myFunction = async () =>{
//     const password = 'batman'; //creating a function and passing password to batman
//     const hashedPassword = await bcrypt.hash(password,8); // setting our hash password

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('batman',hashedPassword); //compairing hash password and the password batman
//     console.log(isMatch)
// }
// myFunction();

// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({ _id:'abc123'},'awesome',{expiresIn:'4 days'});
//     console.log(token)

//     const data = jwt.verify(token,'awesome');
//     console.log(data)
// }
// myFunction();