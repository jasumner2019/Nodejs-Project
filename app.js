const express = require('express');
const app = express();
const User = require('./models/users')

app.get('/users',(req,res)=>{
    res.send('Hello World!')
})

app.get('/users/:id',(req,res)=>{
    res.send('Goodbye World!')
})

app.post('/users',(req,res)=>{
    res.send("Placeholder")
})

app.delete('/users/:id',(req,res)=>{
  res.send("Placeholder")
})

app.put('/users/:id',(req,res)=>{
  res.send("Placeholder")
})

app.listen(3000, () => {
  console.log("Server is listening...");
});