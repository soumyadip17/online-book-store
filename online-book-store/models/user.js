const mongoose=require('mongoose')
const userSchema=mongoose.Schema
({
	name:String,
	age:Number,
	phone:Number
})
const User=mongoose.model('User',userSchema)
module.exports=User