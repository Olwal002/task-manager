require ('../src/db/mongoose');  // importing mongoose.js from src
const Task = require('../src/models/task'); //importing user from models user.js


// goal:use async awaits
//1.create deleteTaskAndCount as an async function
//accept id of task to remove
//use await to delete task and count up incomplete task
//return the count
//call the function and attach then/catch to log results
//test your work
 
const deleteTaskAndCount = async(id) =>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
};

deleteTaskAndCount('5db98a786975803062f2b6de').then((count)=>{
    console.log(count);
 });