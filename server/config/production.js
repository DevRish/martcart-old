const path = require("path");
const express = require("express");

module.exports.prodConfig = (app) => {
    if(process.env.NODE_ENV==='production')
    {
        app.use(express.static('client/build'));
        app.get('*', (req,res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
}