const express =require('express')
const router = express.Router()
const User = require ('../models/users')

const dotenv =  require('dotenv')

const { dbConn } = require('../config/dbConn')
dotenv.config()

// connect to the database
dbConn()

router.get('/', (req, res) => {
    res.send('API')
})


// API to register User
router.post('/register', (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) =>{
        if(error){
            console.log(error)
        }
        else{
            res.status(200).send(registeredUser)
        }
    })
})

// login API
router.post('/login', (req, res) =>{
    let userData = req.body //extract 
    User.findOne({email: userData.email}, (error, user) =>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            else if(user.pwd !== userData.pwd){
                res.status(401).send('Invalid password')
            }
            else{
                res.status(200).send(user)
            }
        }
    })
})



module.exports = router




// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
