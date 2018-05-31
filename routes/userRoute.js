//requiring user models
let userModel = require('./../model/userModel');

module.exports= (app)=>{
    
    //api to create new user
    app.post('/user/signup',(req, res) => {
        
        let userObject = req.body;
        //create user object
        let newUser = new userModel(userObject);
        //searching if username or email already exist
        userModel.findOne(
          ({username: userObject.username} || {email: userObject.email}), (err, user)=>{
                if(err){
                    res.send(err);
                }
                else if(user){
                //if user exist throw error
                res.send({message: 'email/username already exist'})
                }
                // if no user found crreate new user
                else newUser.save((err, user)=>{
                    if(err){
                        res.status(400).send(err)
                    }
                    else{
                        res.send({
                            message: user.username+ user.email +"successfully created"
                        })
                    }
                });
            })
    
    });


    
    //api to sign in existing user
    app.post('/user/signin', (req, res)=>{
        let body = req.body;
        userModel.findOne({username: body.username, password:body.password}, (err,user)=>{
            if(err){
                return res.send(err)
            }
            else if(user){
                res.send( {Username:body.username, message:' Log in successfully'});
            }
            else res.send({message:'SignUp as new user'});
        })
    });

    //api to list all user
    app.get('/user',(req, res)=>{
        userModel.find((err, user)=>{
            if (err){
              return res.status(400).send(err)
            }
            return res.status(200).send({data: user})
        })
    });

    //api to update new user
    app.put('/user/:userId',(req, res)=>{
        let id = req.params.userId
        let userObject = req.body
        //id: user's id to be updated
        // body: body to be updated
        //{new : true} to replace the existing obj
        userModel.where({_id:id}).update(userObject).exec((err, user)=>{
            if (err){
                return res.status(500).send(err)
            }
            else res.status(200).send({data: user, message: 'updated successfully'})
        })
        
        
    });

    //api to delete user
    app.delete('/user/:userId',(req, res)=>{
        let id = req.params.userId
        let userObject = req.body
       userModel.where({_id:id}).remove(userObject).exec((err, user)=>{
            if (err){
                return res.status(400).send(err)
            }
            return res.status(200).send({
                 message: "User successfully deleted",
                 id: id
            })
        })

    });


}