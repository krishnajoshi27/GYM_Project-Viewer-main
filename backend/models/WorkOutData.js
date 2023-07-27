const mongoose = require('mongoose')

const WorkOut = mongoose.model('WorkOut',{
    userName : {
        type:String
    },
    workoutName : {
        type : String
    },
    duration : {
        type:String
    },
    numberOfRounds :{
        type : Number,
        default : 1
    },
    created : {
        type :String
    }   
})

module.exports = WorkOut