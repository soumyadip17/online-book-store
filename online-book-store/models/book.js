const mongoose = require('mongoose')
const bookSchema=new mongoose.Schema
({
	name:String,
	subject:String,
	price:Number
})
const Book=mongoose.model('Book',bookSchema)
module.exports=Book