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
    //Delete Many
    // db.collection('Todos').deleteMany({text:"Eat Lunch"}).then((res)=>{
    //     console.log(res);
    // },(err)=>{
    //
    // });


    //Delete One
    // db.collection('Todos').deleteOne({text:"Eat Lunch"}).then((res)=>{
    //     console.log(res);
    // },()=>{
    //
    // });

    //Find One and Delete

    // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
    //     console.log(res);
    // },()=>{
    //
    // });

    //Delete User

    // db.collection('Users').deleteMany({name:"Vares"}).then((res)=>{
    //     console.log(res);
    // },()=>{
    //
    // });

    //Delete user by id
    db.collection('Users').findOneAndDelete({_id:new ObjectID('5b01579600c6512e234cf308')}).then((res)=>{
        console.log(res);
    },()=>{

    });


    // client.close(); // close the connec tion
});

