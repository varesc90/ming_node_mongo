const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//
// var id = "5b058a0dfec4555906bde5301";
//
// if (!ObjectID.isValid(id)){
//     console.log('id is not valid');
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log("Todo",todos);
// });
//
// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log("Todo",todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('id not found');
//     }
//     console.log('Todo by ID',todo)
// }).catch((e)=>{
//     console.log(e);
// });


var user_id = "5b01a7eb604fc1395a6fe9ee";
if (!ObjectID.isValid(user_id)){
    console.log('id is not valid');
}

User.findById(user_id).then((todo)=>{
    if(!todo){
        return console.log('id not found');
    }
    console.log('Todo by ID',todo)
}).catch((e)=>{
    console.log(e);
});