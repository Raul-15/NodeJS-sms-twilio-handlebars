const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const app = express();



// Setting
app.set('port', process.env.PORT || 3001); // process.env.PORT es para las variables de entorno o sino el predefinido
app.set('views', path.join(__dirname, 'views'));
//Motor de plantilla
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlebars.js')
}));

//Encender handlebars
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;