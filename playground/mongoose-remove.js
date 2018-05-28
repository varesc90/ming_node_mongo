const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((res)=>{
//     console.log(res);
// });
//
// Todo.findOneAndRemove({}).then((res)=>{
//
// });

// Todo.findByIdAndRemove('5b0a977d00c6512e234dbb37').then((res)=>{
//     console.log(res);
// });