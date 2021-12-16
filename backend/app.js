const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.Promise = global.Promise;

user = 'SuperAdmin';
password = 'SuperAdmin';

   // Connection URL
   var url = 'mongodb+srv://'+user+':'+password+'@cluster0.co2wf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
   mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database', err)}
  );

  
 app.use(cors());

 // Importing routes
 const mainRoutes = require("./Routes/Main");

 // Routes
 app.use('/api/', mainRoutes);
 // throw error when page is not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;