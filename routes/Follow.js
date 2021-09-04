var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient

router.post("/", (req, res, next) => {
    const uri = 'mongodb+srv://shajin:shajin1530.@cluster1.umyhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.log("err")
        }
        else {
            let ThisUser = req.body.ThisUser
            let UserTOFollow = req.body.UserTOFollow

            // follow 
            // 

            // seting data
             const data = {
                ThisUserDp:req.body.ThisUserDp,
                ThisUserBio:req.body.ThisUserBio,
                ThisUser:req.body.ThisUser
             }
             client.db("feed_app").collection("users").findOne({userName:UserTOFollow},(err,res)=>{
                //  console.log(res)
                 const FollowNow = res.follows
                 FollowNow.push({...data})
                 console.log(FollowNow)

                 client.db("feed_app").collection("users").updateOne({userName:UserTOFollow},{$set:{follows:FollowNow}},()=>{
                    //  all done
                    res.send("ok")
                    client.close()
                 })

             })


            
            


        }
    })




})


module.exports = router;