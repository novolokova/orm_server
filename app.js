const express = require('express');
const router = require('./router');
const app = express();


app.use(express.json());// Content-Type: application/json
//http://localhost:3000/api
app.use('/api', router)

app.use((err, req, res, next)=>{
    console.log(err.message)
})

module.exports = app;
