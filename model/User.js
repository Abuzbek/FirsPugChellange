const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    AccoundName:String,
    name:String,
    surname:String,
    email:String,
    number:String,
    file:String,
    data:{
        default:Date.now,
        type:Date
    }
})

module.exports = mongoose.model('user',UserSchema)