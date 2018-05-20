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

    // db.collection('Todos').find({
    //     // _id:new ObjectID('5b0147569028492ddf54b984')
    // }).count().then((count)=>{
    //     console.log('Todos Count: ');
    //     console.log(JSON.stringify(count,undefined,2));
    // },(err) =>{
    //     console.log('Unable to fetch Todo');
    // });

    db.collection('Users').find({
        name:"To"
    }).count().then((count)=>{
        console.log('Users Count: ');
        console.log(JSON.stringify(count,undefined,2));
    },(err) =>{
        console.log('Unable to fetch Todo');
    });


    // client.close(); // close the connec tion
});

