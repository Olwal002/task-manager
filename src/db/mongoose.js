const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, //used to read data
    useCreateIndex: true //relate to id
});

const user = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validator(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password must contain password")
            }
        }
    }
});

// const me = new user({
//     name: 'Isaac',
//     age: 20
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error);
// });
// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Task({
//     description: 'Learn how to handle snakes',
//     completed: false
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// })

const me = new user({
    name: '  Paul ',
    email: 'PAUL@gmail.com',
    password: 'paul4546'
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})

