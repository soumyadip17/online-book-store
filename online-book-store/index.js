const express = require('express')
const app = express()
const path=require('path')
const data=require('./data.json')
const methodOverride=require('method-override')
const mongoose=require('mongoose')
const assert=require('assert')
const BookModel=require('./models/book')
const UserModel=require('./models/user')
const CartModel=require('./models/cart')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true, useUnifiedTopology: true})
.then((data)=>{console.log("yesssssssssssssssssssss");})
.catch((err)=>{console.log("noooooooooooooooooooooo");})
// const url='mongodb://localhost:27017/library'


let userid=""
let login=false

app.get('/',async (req,res)=>
	{
		const books=await BookModel.find({})
		
		if(login===false)res.render('home',{login,books})
		else {const user=await UserModel.find({_id:userid});res.render('home',{login,user:user[0],books})}
	})
app.post('/',async(req,res)=>
	{
		login=false
		const books=await BookModel.find({})
		res.render('home',{login,books})
	})
app.get('/register',(req,res)=>{res.render('register')})
app.post('/signup',async (req,res)=>
	{
		let user=
		{
			name:req.body.name,
			age:req.body.age,
			phone:req.body.phone
		}
		UserModel.create(user).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
		login=true

		user=await UserModel.find({"name":req.body.name,"age":req.body.age})
		userid=user[0]._id

		const books=await BookModel.find({})
		res.render('home',{login,user:user[0],books})
	})
app.post('/login',async (req,res)=>	
	{
		const user=await UserModel.find({"name":req.body.name,"age":req.body.age})
		const books=await BookModel.find({})
		if(user.length!=1){res.send("Invalid user")}
		else {login=true;userid=user[0]._id;res.render('home',{login,user:user[0],books})}
	})
app.get('/mathematics',async (req,res)=>
{
	const mathematics=await BookModel.find({subject:"Mathematics"})
	console.log(mathematics)
	res.render('subject',{mathematics,physics:[],chemistry:[]})
})
app.get('/physics',async (req,res)=>
{
	const physics=await BookModel.find({subject:'Physics'})
	res.render('subject',{mathematics:[],physics,chemistry:[]})
})
app.get('/chemistry',async (req,res)=>
{
	const chemistry=await BookModel.find({subject:"Chemistry"})
	res.render('subject',{mathematics:[],physics:[],chemistry})
})
app.get('/:sub/:book/:id',async (req,res)=>
	{
		const {id}=req.params;
		const book=await BookModel.find({_id:id})
		console.log(book)
		res.render('book',{book:book[0]})
	})
app.get('/cart',async(req,res)=>
	{
		if(login===true)
		{
			const cart=await CartModel.find({userid:userid})
			res.render('cart',{cart})
		}
		else res.render('register')
	})
app.delete('/:sub/:book/:id/cart/delete',async(req,res)=>
	{
		const {sub,book,id}=req.params;
		const item=await CartModel.find({bookid:id})
		CartModel.deleteOne({bookid:id}).catch((error)=>{console.log(error)})
		const cart=await CartModel.find({userid:userid})
		res.render('cart',{cart})
	})


app.get('/:sub/:book/:bookid/cart',async (req,res)=>
	{
		if(login===false){res.redirect('/register')}
		const {sub,book,bookid}=req.params
		const item=
		{
			userid:userid,
			bookid:bookid,
			name:book,
			subject:sub
		}
		const ins=CartModel(item)
		ins.save((err,data)=>{if(err)console.log(err);else console.log(data)})

		const cart=await CartModel.find({userid:userid})
		res.render('cart',{cart})
	})

app.use((req,res)=>{res.send("Not found")})

app.listen(8080,()=>{console.log("Listening on port 8080")})