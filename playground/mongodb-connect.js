// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);

var user = {name:'vares',age:'26'};
var {name} = user;

console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to Mongodb");
    }

    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    // db.collection(`Todos`).insertOne({
    //     text:`Something to do`,
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log(`Unable to insert todo`);
    //     }
    //
    //     console.log(JSON.stringify(result.ops , undefined, 2)); // ops attribute store all doc that was insert
    //
    // });

    // db.collection(`Users`).insertOne({
    //
    //     name:`Vares`,
    //     age:26,
    //     location:`Bangkok`
    // },(err,result)=>{
    //     if(err){
    //         return console.log(`Unable to insert todo`);
    //     }
    //
    //     console.log(result.ops[0]._id.getTimestamp()); // ops attribute store all doc that was insert
    //
    // });

    client.close(); // close the connec tion
});

