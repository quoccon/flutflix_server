const express = require('express');
const router = express.Router();
const userApi = require('../api/user.api');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'public/upload');
    },
    filename:function(req,file,cb) {
        cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 1024 * 1024 * 5
    }
});

const initApi = (app) => {
    router.post('/api/register',upload.single('avatar'),userApi.register);
    router.post('/api/login',userApi.login);
 
     return app.use('/',router);
}

module.exports = initApi;