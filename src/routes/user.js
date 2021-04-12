const express = require('express')
const router = express.Router();

const User = require('../models/user')

/** Route to get all users. */
router.get('/', (req, res) => {
    User.find().then((users) => {
        return res.json({users})
    })
    .catch((err) => {
        throw err.message
    });
})

/** Route to get one user by id. */
router.get('/:userId', (req, res) => {
    console.log(`User id: ${req.params.userId}`)
    User.findById(req.params.userId).then((user) => {
        return res.json({user})
    })
    .catch((err) => {
        throw err.message
    });
})

/** Route to add a new user to the database. */
router.post('/', (req, res) => {
    let user = new User(req.body)
    user.save().then(userResult => {
        return res.json({user: userResult})
    }).catch((err) => {
        throw err.message
    })
})

/** Route to update an existing user. */
router.put('/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body).then((user) => {
        return res.json({user})
    }).catch((err) => {
        throw err.message
    })
})

/** Route to delete a user. */
router.delete('/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId).then(() => {
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.userId
        })
    })
    .catch((err) => {
        throw err.message
    })
})

module.exports = router

