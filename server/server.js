const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require('mongodb');


var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos,
            });
    },(e)=>{
        res.status(400).send(e);
    });
});


app.get('/todos/:id',(req,res)=>{

    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        res.status(400)
            .send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res
                .status(404)
                .send();
            return;
        }
        res.send(todo);
    },(e)=>{
       res.status(400)
           .send('something wrong with your request');
    });

});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send('invalid Id');
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(todo){
           return res.status(200).send({todo});
        }
        return res.status(404).send("Could not find your Todo");
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res)=>{

    var id = req.params.id;

    //choose only text / completed from user params

    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send('invalid Id');
    }


    //check if body is boolean and if completed //if completed use current time as a completedat , else reset to null

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }




    Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});


module.exports = {app};
