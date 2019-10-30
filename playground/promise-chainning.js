require ('../src/db/mongoose');  // importing mongoose.js from src
const User = require('../src/models/user'); //importing user from models user.js

User.findByIdAndUpdate('5db83a4b5fe3460aac87bdab',{ age:19}).then((user) =>{  //finding and updating user to id passed
    console.log(user);
    return User.countDocuments({ age:19});  //filtering all user names to 19
}).then((result) =>{
    console.log(result);
}).catch((e) =>{
    console.log(e);
});