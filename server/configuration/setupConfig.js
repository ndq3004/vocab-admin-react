

exports.configApp = (app) => {
    require('dotenv').config()

    const express = require("express");
    app.use(express.json());

    var allowlist = ['http://localhost:3000', 'http://localhost:3001']
    var corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false } // disable CORS for this request
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    }

    const cors = require('cors')
    app.use(cors(corsOptionsDelegate));
    
    //middleware

    const path = require('path')
    app.use(express.static(path.resolve(__dirname, 'build')));

    const cookieParser = require('cookie-parser')
    app.use(cookieParser())
}

exports.configEnv = () => {
    require('dotenv').config()
}

