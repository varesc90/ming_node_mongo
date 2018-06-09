const {ObjectID} = require('mongodb');
const {mongoose} = require("./../../db/mongoose");
const {Todo} = require("./../../models/todo");
const {User} = require("./../../models/user");
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id : userOneId,
    email: 'varesc@gmail.com',
    password: 'vareschai',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id:userOneId,access:'auth'},process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwoId,
    email:'vares2@gmail.com',
    password: 'vareschai',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id:userTwoId,access:'auth'},process.env.JWT_SECRET).toString()
    }]
}];
const todos = [
    {
        _id: new ObjectID(),
        text:"first test todo",
        _creator:userOneId
    }, {
        _id: new ObjectID(),
        text:"second test todo",
        completed:true,
        completedAt:123123123,
        _creator:userTwoId
    }];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos).then(()=>{
            done();
        },(e)=>{

        });
    },(e)=>{

    });
}

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      return Promise.all([userOne,userTwo]);
    }).then(()=>{
        done();
    });
}

module.exports = {todos,populateTodos,users,populateUsers};