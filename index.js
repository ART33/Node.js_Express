const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticater = require('./Authenticater');
const courses = require('./routes/courses');
const root = require('./routes/root');
const express = require('express');
const app = express();

// Templating Engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', root);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

// Using Morgan to show request information
if (app.get('env') === 'production') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//DB work
dbDebugger('Connected to the database...');

app.use(logger);

app.use(authenticater);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));