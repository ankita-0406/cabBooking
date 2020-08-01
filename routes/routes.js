const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PostSchema = require("../schema/schema");
const Book = require("../schema/booking");

const Person = require("../schema/driver");

const jwt =  require("jsonwebtoken");




router.put("/bulk/update", async (req, res) => {
    try {
        const { userId, bookingId } = req.body

        const updated = await PostSchema.findByIdAndUpdate(userId,
            {$push:{ Booking: bookingId } }, { new: true, useFindAndModify: false });

        return res.send(updated)

    } catch (error) {
        console.log(error)

    }
})

//get
router.get('/get', async (req, res) => {
    try {
        const post = await PostSchema.find().populate("Booking")
        res.json(post);

    } catch (err) {
        res.json({ message: err })
    }
})
//get controller
//all
router.get('/all', async (req, res) => {
    
    
            try{
                
        const found = await PostSchema.find()
     res.json( found)
            }
       
     catch{
        res.json({ message: err })
    }
   })

//get all booking
router.get('/getall/:username', async (req, res) => {
    try {
        const found = await PostSchema.find({ username: req.params.username }).populate("Booking");
        res.json(found);
    } catch{
        res.json({ message: err })
    }

})
//post

router.post('/post', async (req, res) => {
    //const {username, password} = req.body;
    const propost = new PostSchema({
        //username, password
        username: req.body.username,
        password: req.body.password,
        Booking: req.body.id
    })

    try {
        const savedPost = await propost.save()
        res.send(savedPost);
    } catch (err) {
        res.send({ message: err })
    }

})
//post for login
router.post("/login", (req, res) => {

    PostSchema.findOne({ username: req.body.username }).then((resp) => {

       if( resp.password === req.body.password ){
            //res.status(200).send("u r a username")
        
           const token= jwt.sign({username:req.body.username,password:req.body.password}, "secretkey", (err, token)=>{
                return res.send({token:token})
            })
        }else{
            console.log("not a" );
            res.send("err")

        }
    }).catch(() => {
        res.send({ message: err });
    })

    
   
})
//book a cab

router.post('/book', async(req, res) => {
    try {
         console.log("token", req.headers.authorization);
        jwt.verify(req.headers.authorization,"secretkey",async (err, token)=>{
            if(err){
                res.status(403);
            }else{
        // const saved = await post.save();
        // res.send(saved);
        console.log("auth data is :",token)
      const save=  await Person.find({"location":"pune"})
      res.send(save);
      console.log("saved location ",save.length);
     // console.log("saved location ",save);

      var random = [Math.floor(Math.random()*save.length)];
     
     
      console.log("length of the array", random);
      console.log("the array no. we randomly select ",save[random]);

      console.log("matching is",mongoose.Types.ObjectId.isValid(req.body._id));
        
      const updated= await Book.findOneAndUpdate({id:req.body._id},{$push:{ To:req.body.To,From:req.body.From}},
        {new: true, useFindAndModify: false });
        console.log("updated response is", updated);
        res.send(updated);
   
        }
    })
        }catch(err) {
        res.send(err);
        }
    })

//updating
router.put('/update', async (req, res)=>{
    try{
  const updated= await Book.findByIdAndUpdate({id:req.body._id},{$push:{ To:req.body.To,From:req.body.From}},
   {new: true, useFindAndModify: false });
   res.send(updated);

}catch(err){
    res.send(err)
}
})
//driver

router.post("/driver", async (req, res) => {
   const post = new Person({
        name: req.body.name,
        car: req.body.car,
        location: req.body.location,
    })

    try {
        const saved = await post.save();
        res.send(saved);
    } catch (err) {
        res.json(err);
    }

})
//find driver
router.get("/fetch", async(req, res)=>{
try{
    const save = await Person.find()
    res.send(save);
}catch(err){
res.send(err);
    }
})

function verifyToken(req, res, next){

    const bearerheader = req.header['authorization'];
    
    if(typeOf(bearerheader) !== undefined){
    
    const bearer = split(" ");
    
    const bearerToken= bearer[1];
    
    req.token = bearerToken;
    
    next();
    }else{
    res.status(403);
    }
    }
module.exports = router;