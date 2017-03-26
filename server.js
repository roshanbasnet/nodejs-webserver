const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view eigine','hbs');
//to use middleware


app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = (now+ req.method+ req.url );
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err) =>{
		if (err) {
				console.log('unable to append to server.log');
		}
	});
		next();
});

// app.use((req,res,next)=>{
// 	res.render('maintainance.hbs');
// })
hbs.registerPartials(__dirname + '/public')
hbs.registerHelper('getCurrentYear',() =>{
	return new Date().getFullYear()
});

hbs.registerHelper('screanIt',(text)=>{
	return text.toUpperCase();
})

app.get('/',(req,res) =>{
	// res.send('</h1>Hello Express</h1>');
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage:'Welcome to my home page',
	});
});

app.get('/about',(req,res) =>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
})

app.get('/error',(req,res) =>{
	res.send({
		errorMessage:'Unable to handle request'
	});
})
app.listen(3000,()=>{
	console.log('Server is UP on port 3000');
});
