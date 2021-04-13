const express = require('express')
const router = express.Router();

const Message = require('../models/message')
const User = require('../models/user')

/** Route to get all messages. */
router.get('/', (req, res) => {
    return res.send(`All Messages route`)
})

/** Route to get one message by id. */
router.get('/:messageId', (req, res) => {
    return res.send(`Message with id ${req.params.messageId}`)
})

/** Route to add a new message. */
// we need to correctly associate message with user

// Message created
router.post('/', (req, res) => {
    let message = new Message(req.body) // Create message (message body)
    message.save() // Write to DB collection using schema (save to DB)
    .then(message => { // Promise chain start (success)
        // Find the user that sent the message
        return User.findById(message.author) // Message created. Find the Author. 
    })
    .then(user => { // we need to correctly associate message with user
        console.log(user)
        // store the message into user
        user.messages.unshift(message) // unshift (put message in front of array)
        return user.save() // update user to store new message & changes
    })
    .then(_ => {
        return res.send(message)
    }).catch(err => { // error catch
        throw err.message
    })
})

/** Route to update an existing message. */
router.put('/:messageId', (req, res) => {
    return res.send({
        message: `Update message with id ${req.params.messageId}`,
        data: req.body
    })
})

/** Route to delete a message. */
router.delete('/:messageId', (req, res) => {
    return res.send(`Delete message with id ${req.params.messageId}`)
})

module.exports = router