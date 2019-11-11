const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = new express.Router();

router.post('/users',auth , async (req, res) => {              // using .post to create data to a server
    const user = new User(req.body);        // creating the new user requiring the body    

    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
    await res.send(req.user);
    } catch(e) {
        res.status(500);
        console.log(e);
    }
});
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/:id', async (req, res) => {    //fetches users by id
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age']; //allowed updates checks the fields
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update));// matching the allowed updates to object.keys

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const user = await User.findById(req.params.id); //finding user by id

        updates.forEach((update) => {
            return user[update] = req.body[update]; //updating ech user
        })
        await user.saves

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/:id', async (req, res) => {    //deleting  users by id
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id); //using async await to find by id and delete
        if (!user) {
            return res.status(404).send(); //checking if no user
        }
        res.send(user);//sending the user

    } catch (e) {
        res.status(500).send();//catching the error
    }
})


module.exports = router;//exporting the module