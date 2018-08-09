const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

fs.readdirSync(path.join(__dirname, 'models')).forEach(file => require(`./models/${file}`));

const middleware = require('./middleware/middleware');

const app = express();

const index = require('./routes/index');
const routes = require('./routes/routes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middleware.cors);
app.use('/', index);
app.use('/routes', routes);
app.use(middleware.notFound);
app.use(middleware.unknownError);

module.exports = app;
