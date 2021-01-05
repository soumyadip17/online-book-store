const mongoose = require('mongoose')
const cartSchema=new mongoose.Schema
({
	userid:String,
	bookid:String,
	name:String,
	subject:String
})
const Cart=mongoose.model('Cart',cartSchema)
module.exports=Cart