const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+"/views/partials");

app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('Server.log',log+"\n");
  next();
})

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+"/public"));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('makeCaps',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  });*/

  res.render('welcome.hbs',{
    pageTitle:'Welcome Page',
    welcomeMessage:'Welcome to Express'
  });

});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3001,()=>{
  console.log('Server is up in port 3001')
});
