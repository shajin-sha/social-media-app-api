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

            let query = req.body.query
            let opt = {'userName':{$regex:query,$options:'$i'}}

            client.db("feed_app").collection("users").find(opt).toArray((err,data)=>{
                if(err){
                    console.log(err)
                    client.close()
                }
                else{
                    console.log(data)
                    res.json(data)
                    client.close()
                }
            })


        }
    })
})


module.exports = router;