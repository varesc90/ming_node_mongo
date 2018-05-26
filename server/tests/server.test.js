const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require('mongodb');
const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [
    {
        _id: new ObjectID(),
        text:"first test todo"
    }, {
        _id: new ObjectID(),
        text:"second test todo"
    }];
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos).then(()=>{
            done();
        },()=>{

        });
    },(e)=>{

    });
});
describe('POST /todos',()=> {
    it('Should create a new todos', (done) => {
        var text = "test todo";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            }).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todo) => {
                expect(todo.length).toBe(1);
                expect(todo[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
        });
    });

    it('Should not create todo with invalid data', (done) => {
        var text = "sleep";
        request(app)
            .post('/todos')
            .send({})
            .expect(400).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todo) => {
                expect(todo.length).toBe(2);
                done();
            }).catch((err) => done(err));
        });
    });
});


describe('GET /todos', () =>{
    it('Should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });





});

describe('GET /todos/:id', () =>{
    it('Should get one todo',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(todos[0].text);
            }).end(done);
    });
    it('Should return 404 if not found',(done)=>{
        request(app)
            .get(`/todos/5b06cf3e30b28974df13abec`)
            .expect(404).end(done);
    });

    it('Should return 400 if invalid id',(done)=>{
        request(app)
            .get(`/todos/12`)
            .expect(400).end(done);
    });






});