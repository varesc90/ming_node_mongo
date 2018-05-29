var env = process.env.NODE_ENV || "development";

console.log('env ******',env);

process.env.MONGODBURI = 'mongodb://db:27017/TodoApp';

if(env == "development"){
    process.env.PORT = 3000;
    process.env.MONGODBURI = 'mongodb://localhost:27017/TodoApp';
} else if(env = "test") {
    process.env.PORT = 3000;
    process.env.MONGODBURI = 'mongodb://localhost:27017/TodoAppTest';
}