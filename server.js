const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();

	var log =`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	})
	next();
});
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance Page'
// 	});
// })
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) =>{
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to our website!'
	});
});
app.get('/home', (req,res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to our website!'
	});
});
app.get('/projects', (req,res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
		welcomeMessage: 'Check out our current projects!'
	});
});
app.get('/help', (req,res) => {
	res.render('help.hbs', {
		pageTitle: 'Help',
		welcomeMessage: 'Looks like you need help!'
	});
});
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage:'bad request'
	});
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});