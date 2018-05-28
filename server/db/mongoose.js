const mongoose = require('mongoose');


mongoose.Promise = global.Promise; // Tell Mongoose which promise lib we want to use. In this case, Global

// mongoose.connect('mongodb://db:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/TodoApp'); //local dev


module.exports = {mongoose};