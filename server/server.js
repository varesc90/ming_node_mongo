const mongoose = require('mongoose');


mongoose.Promise = global.Promise; // Tell Mongoose which promise lib we want to use. In this case, Global

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type: String
    },
    completed:{
        type: Boolean
    },
    compleatedAt:{
        type: Number
    }
});


var newTodo = new Todo({
    text:"Learn Node",
});

newTodo.save().then((doc)=>{
    console.log(`Saved todo`,doc);
},(err)=>{
    console.log('Unable to save Todo');
});

var anotherTodo = new Todo({
    text:"Sleep",
    completed:false,
    completedAt:12
});

anotherTodo.save().then((doc)=>{
    console.log(JSON.stringify(doc));
},(err)=>{
    console.log('Unable to save Todo');
});