const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

beforeEach((done)=>{
    Todo.remove({}).then((e)=>done());
});
describe('POST /todos',()=>{
    it('Should create a new todos',(done)=>{
        var text = "test todo text";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            }).end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find().then((todo)=>{
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((err)=>done(err));
        });
    });

    it('Should not create todo with invalid data',(done)=>{
        var text = "sleep";
        request(app)
            .post('/todos')
            .send({})
            .expect(400).end((err,res)=>{
           if(err){
               return done(err);
           }

           Todo.find().then((todo)=>{
               expect(todo.length).toBe(0);
               done();
           }).catch((err)=>done(err));
        });
    });
});