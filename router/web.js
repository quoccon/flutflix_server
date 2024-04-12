const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const movieController = require('../controllers/movie.controller');

const initWebRouter = (app) => {
    //user
    router.get('/',userController.login);
    router.post('/login',userController.login);
    router.get('/register',userController.register);
    router.post('/register',userController.register);



    //mmovie
    router.get('/getAllMovie',movieController.getAllMovie);
    router.post('/addMovie',movieController.addMovie);
    return app.use('/',router);
}

module.exports = initWebRouter;