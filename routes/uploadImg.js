var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient

const dateNow = new Date()


router.post('/', function (req, res, next) {
    const uri = 'mongodb+srv://shajin:shajin1530.@cluster1.umyhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    MongoClient.connect(uri, (err, client) => {

        if(err){
            console.log(err)
        }
        else{
            let data = {
                caption:req.body.caption,
                ImgName:req.body.Img,
                feedby:req.body.feedby,
                likes:0,
                comments:0,
                likedUsers:[],
                key:dateNow.getTime(),
                dateSt:req.body.dateST,
                feedUserDp:req.body.dp,
                type:req.body.type
            }
            console.log(data)    
            client.db("feed_app").collection("Feed").insertOne(data).then(()=>{
                res.json("feed added")
            }).catch((err)=>{
                res.status(400).json("err"+err)

            })
        }
      })

});

module.exports = router;