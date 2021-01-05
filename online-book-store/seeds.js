const mongoose=require('mongoose')
const Book=require('./models/book')
mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true, useUnifiedTopology: true})
.then((data)=>{console.log("yesssssssssssssssssssss")})
.catch((err)=>{console.log("noooooooooooooooooooooo")})

const books=
[
	{
		name:'Book11',
		subject:'Mathematics',
		price:300
	},
	{
		name:'Book12',
		subject:'Mathematics',
		price:400
	},
	{
		name:'Book13',
		subject:'Mathematics',
		price:500
	},
	{
		name:'Book21',
		subject:'Physics',
		price:300
	},
	{
		name:'Book22',
		subject:'Physics',
		price:400
	},
	{
		name:'Book23',
		subject:'Physics',
		price:500
	},
	{
		name:'Book31',
		subject:'Chemistry',
		price:300
	},
	{
		name:'Book32',
		subject:'Chemistry',
		price:400
	},
	{
		name:'Book33',
		subject:'Chemistry',
		price:500
	},
]
Book.insertMany(books)
.then(data=>{console.log(data)}).catch(err=>{console.log(err)})