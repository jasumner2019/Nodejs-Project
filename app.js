const express = require('express');
const app = express();
const {verifyUser, verifyAdmin} = require('./authenticate')
const {corsWithOptions} = require('./cors');
const users = require('./models/users');
const User = require('./models/users')

//GET all the information of all users in the directory
app.get('/users', corsWithOptions, verifyUser, verifyAdmin, (req, res, next)=>{
    User.find()
    .then(users => {
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.json(users);
    })
    .catch(err => next(err))
})

//GET the information of a single user
app.get('/users/:id', corsWithOptions, verifyUser, verifyAdmin, (req, res, next)=>{
    User.findById(req.params._id)
    .then(user => {
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.json(user);
    })
    .catch(err => next(err))
})

//POST a new user to the directory
app.post('/users', corsWithOptions, verifyUser, verifyAdmin, (req,res)=>{
    User.findOne({user: req.user._id})
    .then(user => {
      if(user) {
        if(users.includes(req.params._id)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end('This user already exists.')
        } else {
          users.push(req.params._id)
          .then(user => {
            user.save()
          })
        }
      } else {
        User.create({user: req.user})
        .then(user => {
          user.save()
        })
      }
    })
})

//DELETE a specific user from the directory
app.delete('/users/:id', corsWithOptions, verifyUser, verifyAdmin, (req,res)=>{
  User.findOne({user: req.user._id})
  .then(user => {
    if(user) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('That user does not exist.');
    }
  })
})

//UPDATE a specific user's information
app.put('/users/:id', corsWithOptions, verifyUser, verifyAdmin, (req,res)=>{
    res.end('PUT operations are not supported on /users')
})

app.listen(3000, () => {
  console.log("Server is listening...");
});