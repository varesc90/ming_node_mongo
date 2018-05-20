// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to Mongodb");
    }
    const db = client.db('TodoApp');
    console.log('connected to mongodb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('5b0155b400c6512e234cf233')
    // }, {
    //    $set:{
    //        completed:true
    //    }
    // }, {
    //     returnOriginal:false
    // }).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5b014963501e882e7b88d72f')
    }, {
        $set:{
            name:"Ming"
        },
        $inc:{
            age:1
        }
    }, {
        returnOriginal:false
    }).then((res) => {
        console.log(res);
    });

    // client.close(); // close the connec tion
});

