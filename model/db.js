const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/server_movies")
    .then(() => {
        console.log("Kết nối thành công");
    }).catch((err) => {
        console.log("Kết nối thất bại : " + err);
    });

module.exports = { mongoose }