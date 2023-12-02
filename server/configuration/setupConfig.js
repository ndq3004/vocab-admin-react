

exports.configApp = (app) => {
    require('dotenv').config()

    const express = require("express");
    const cors = require('cors')
    const path = require('path')

    app.use(cors());
 
    //middleware
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname, 'build')));

    const cookieParser = require('cookie-parser')
    app.use(cookieParser())
}

exports.configEnv = () => {
    require('dotenv').config()
}

