const express = require('express');
const bodyParser = require('body-parser');
const initWeb = require('./router/web');
const initApi = require('./router/api');

const app = express();
const PORT = 1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


initWeb(app);
initApi(app);

app.listen(PORT,() => {
    console.log("Server running on port :" +PORT);
});
