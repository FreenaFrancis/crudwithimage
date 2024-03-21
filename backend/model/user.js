const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name: { type: String, },
    place:{type:String},
    image:{type:String}
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel;