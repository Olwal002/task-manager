require ('../src/db/mongoose');  // importing mongoose.js from src
const User = require('../src/models/user'); //importing user from models user.js

// User.findByIdAndUpdate('5db83a4b5fe3460aac87bdab',{ age:19}).then((user) =>{  //finding and updating user to id passed
//     console.log(user);
//     return User.countDocuments({ age:19});  //filtering all user names to 19
// }).then((result) =>{
//     console.log(result);   
// }).catch((e) =>{
//     console.log(e);  //using to catch to console.log the error 
// });

const updateAgeAndCount = async(id,age) =>{
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});
    return count;
};

updateAgeAndCount('5db83a4b5fe3460aac87bdab',33).then((count)=>{
    console.log(count);
});