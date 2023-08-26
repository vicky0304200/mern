
//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create restapi
router.post("/", (req, res) => {


    let obj = {
        p_id: req.body.p_id


    }


    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log('Data deleted')
                        res.json({ 'delete': 'success' })
                    }
                    else {
                        console.log('Data Not deleted')
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router
