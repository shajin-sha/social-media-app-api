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

            let data = {
                Name: req.body.Name,
                userName: req.body.userName,
                Bio:req.body.Bio,
                Dp:req.body.DpUrl,
                profileUpdated:req.body.profileUpdated,
            }
            client.db("feed_app").collection("users").updateOne({ userName: data.userName }, { $set: { ...data } }, (err) => {
                if (err) {
                    res.json(
                        {
                            err: "err to update user",
                        })
                }
                else {
                    res.json({dp:req.body.DpUrl,Bio:data.Bio})
                }
            })
        }
    })
})


module.exports = router;