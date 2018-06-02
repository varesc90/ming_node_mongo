var {User} = require('./../models/user');



var authenticate =  (req,res,next)=>{
    console.log('authenticate');
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{

        if(!user){
            Promise.reject('no user found');
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });


}


module.exports = {authenticate};