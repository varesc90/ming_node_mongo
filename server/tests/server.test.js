require('./../config/config');
const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require('mongodb');
const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {todos,populateTodos,users,populateUsers} = require("./seed/seed");
var {User} = require("./../models/user");
beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos',()=> {
    it('Should create a new todos', (done) => {
        var text = "test todo";
        request(app)
            .post('/todos')
            .set('x-auth',users[0].tokens[0].token)
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
            },()=>{}).catch((err) => done(err));
        });
    });

    it('Should not create todo with invalid data', (done) => {
        var text = "sleep";
        request(app)
            .post('/todos')
            .set('x-auth',users[0].tokens[0].token)
            .send({})
            .expect(400).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todo) => {
                expect(todo.length).toBe(2);
                done();
            },(e)=>{}).catch((err) => done(err));
        });
    });
});


describe('GET /todos', () =>{
    it('Should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(1);
            }).end(done);
    });





});

describe('GET /todos/:id', () =>{
    it('Should get one todo',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(todos[0].text);
            }).end(done);
    });

    it('Should not return a todo create by other user',(done)=>{
        request(app)
            .get(`/todos/${todos[1]._id.toString()}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404).end(done);
    });


    it('Should return 404 if not found',(done)=>{
        request(app)
            .get(`/todos/5b06cf3e30b28974df13abec`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .expect((res)=>{

            }).end(done);
    });

    it('Should return 400 if invalid id',(done)=>{
        request(app)
            .get(`/todos/12`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(400)
            .expect((res)=>{

            }).end(done);
    });






});

describe('DELETE /todos/:id',()=>{
    it('Should remove a todo',(done)=>{
        var second_todo_id = todos[1]._id.toString();
        request(app)
            .delete(`/todos/${second_todo_id}`)
            .set('x-auth',users[1].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(second_todo_id);
            }).end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(second_todo_id).then((todo)=>{
                expect(todo).toBeFalsy();
                done();
            },(e)=>{}).catch((e)=>{
                done(e);
            });
        });
    });


    it('Should return 404 if trying to delete other user todo',(done)=>{
        var second_todo_id = todos[1]._id.toString();
        request(app)
            .delete(`/todos/${second_todo_id}`)
            .set('x-auth',users[0].tokens[0].token)
            .expect(404)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
            });
        done();
    });

    it('Should return 404 if todo not found',(done)=>{
        var second_todo_id = new ObjectID().toString();
        request(app)
            .delete(`/todos/${second_todo_id}`)
            .set('x-auth',users[1].tokens[0].token)
            .expect(404)
            .end((err,res)=>{
            if(err){
                return done(err);
            }
        });
        done();
    });

    it('Shoud return 404 if objectID is invalid',(done)=>{
        var second_todo_id = 'asdf';
        request(app)
            .delete(`/todos/5b06cf3e30b28974df13ab`)
            .set('x-auth',users[1].tokens[0].token)
            .expect(404).end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });
});

describe('PATCH /todos/:id', ()=>{
    var id = todos[0]._id.toString();
    var body = {
        text:'test',
        completed:true
    };
    it('Should update completed to true and fill in createdAt', (done)=>{
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth',users[0].tokens[0].token)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeTruthy();
            }).end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });

    it('Should not update other user todo', (done)=>{
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth',users[1].tokens[0].token)
            .send(body)
            .expect(404)
            .end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });

    it('Should update text to new text', (done)=>{
        var id = todos[0]._id.toString();
        var body = {text:'new text'};
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth',users[0].tokens[0].token)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(body.text);
            }).end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });

    it('Should set completed to false and unset completedAt', (done)=>{
        var id = todos[0]._id.toString();
        var body = {completed:false};
        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toBeFalsy();
            }).end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
        });
    });
});


describe('GET /users/me',() => {
    it('Should return user if authenticate', (done)=> {
        request(app)
            .get(`/users/me`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('Should return a 401 if not authenticate',(done)=>{
        request(app)
            .get(`/users/me`)
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users',() => {
    it('Should create a user',(done)=>{
        var email = "example1@gmail.com";
        var password = "asdf1234";

        request(app)
            .post(`/users`)
            .send({email,password})
            .expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBeTruthy();
            })
            .end((err)=>{
                if(err){
                    return done(err);
                }

                User.findOne({email}).then((user)=>{
                   expect(user._id).toBeTruthy();
                   expect(user.password).not.toBe(password);
                    done();
                }).catch((e)=> done(e));
            });


    });

    it('Should return validation error if invalid',(done)=>{
        var email = "example1gmail.com";
        var password = "asdf1234";

        request(app)
            .post(`/users`)
            .send({email,password})
            .expect(400)
            .expect((res) => {
                expect(res.header['x-auth']).toBeFalsy();
                expect(res.body._id).toBeFalsy();
                expect(res.header['x-auth']).toBeFalsy();
            })
            .end(done);
    });

    it('Should not create email if already exist',(done)=>{
        var email = users[0].email;
        var password = "asdf1234";

        request(app)
            .post(`/users`)
            .send({email,password})
            .expect(400)
            .expect((res) => {
            })
            .end(done);


    });
});

describe('POST /users/login',() => {
    it('Should return valid x-auth token',(done)=>{
        request(app)
            .post(`/users/login`)
            .send({
                email:users[1].email,
                password:users[1].password
            })
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[1]).toMatchObject({
                        access:'auth',
                        token:res.headers['x-auth']
                    });
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('Should reject invalid login',(done)=> {
        request(app)
            .post(`users/login`)
            .send({
                email: users[1].email,
                password: 'aaaaaa'
            })
            .expect(404)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy()
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens.length).toBe(1);
                    done();
                });
            });



    });
});

describe('DELETE /users/me/token',() => {
    it('Should remove existing token',(done)=>{
        request(app)
            .delete('/users/me/token')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                User.findById(users[0]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e)=>done(e));
            });
    });
});