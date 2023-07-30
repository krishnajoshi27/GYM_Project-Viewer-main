const router = require("express").Router();
const WorkOut = require('../models/WorkOutData')
const redis= require('redis');



const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl)

router.get('/test',(req,res)=>{
    res.send('Inside route')
})
//Get all Workout logs
router.get('/getWorkouts',async(req,res)=>{
    try {
        const response = await WorkOut.find({})
        res.send(response)
    } catch (error) {
        console.log('Error in finding all logs');
    }
})

//Get all Workout logs of Single User
router.get('/:userName',async(req,res)=>{
   
    try {
        console.log('inside username', req.params.userName);
        const response = await WorkOut.find({userName : req.params.userName})
        res.send(response)
    } catch (error) {
        console.log('Error in finding all logs of particular user');
    }
})

//Delete Log
router.delete('/:id',async(req,res)=>{
    try {
        console.log('delete id : ', req.params.id);
        const response = await WorkOut.deleteOne({_id : req.params.id})
        res.send(response)
    } catch (error) {
        console.log('Error in finding all logs of particular user');
    }
})
//Post WorkOut logs
router.post('/',async (req,res)=>{
    console.log(req.body);
    try {
        let workLog = new WorkOut({
            userName : req.body.userName,
            workoutName : req.body.workoutName,
            duration : req.body.duration,
            numberOfRounds : req.body.numberOfRounds,
            created : req.body.created
        })
        const response = await workLog.save()
        res.send(response)
    } catch (error) {
        console.log('Error in Post Requet',err);
    }
   
})


module.exports = router