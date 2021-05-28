'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
const fileUpload = require('express-fileupload');
const juegosRoutes = require('./routes/juegos');
const uploadsRoutes = require('./routes/uploads');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));

app.use(
  myConnection(
    mysql,{
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'videojuegos',
    }, 'single'
  )
);

//fileUpload para la carga de archivos
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//rutas
app.use('/', juegosRoutes);
app.use('/uploads', uploadsRoutes);

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
