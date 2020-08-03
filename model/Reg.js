const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const RegSchema = new Schema({
    username:String,
    surname:String,
    email:String,
    number:String,
    password:String,
    passwordTwo:String,
    file:String,
    data:{
        default:Date.now,
        type:Date
    }
})

module.exports = mongoose.model('reg',RegSchema)