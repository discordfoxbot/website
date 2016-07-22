var app = require('express').Router();

app.get('/:type',(req,res)=>{
    res.render('index');
});

module.exports = app;