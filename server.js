const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// New express app
var app = express();

//Reuse code
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
//Express related configurations
//Key value pair.

app.set('view engine', 'hbs');

//Register middleware
//next --> What to do one middleware is done.

//Client cam be an app or browser etc.
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  // If you don't pass the callback to appendFile, you'll get a deprecation warning if you use higher versions of node.
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  // If you don't give next(); here, the remaining portion of the file (request handlers) will not execute.
  //Page will keep loading.
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

//express.static takes the absolute path of the folder you want to serve.
//__dirname stores the path to your project's directory. If you move around your code, you don't need to change the path everytime.
app.use(express.static(__dirname + '/public'));

// Set up a handler for HTTP GET requests to our server
// First argument is the path (url) - root of the app
// Second arg is the function to run if someone makes a GET request

//req stores all request information. res has methods.
app.get('/', (req, res) => {
//  res.send('<h1>Hello Express!</h1>');
//    res.send({
//      name: 'Vaithy',
//      likes: [
//        'Badminton',
//        'Carrom'
//      ]
//    });

    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website.',
//      currentYear: new Date().getFullYear()
    });
});

//How to set up routes in express:
// localhost:3000/about
app.get('/about', (req, res) => {
//  res.send('About Page');
    res.render('about.hbs', {
      pageTitle: 'About Page',
//      currentYear: new Date().getFullYear()
    }); //Static page rendering.
});

// Bad

app.get('/bad', (req, res) => {
  //Pass an object instead of a string.
  res.send({
     errorMessage: 'Unable to handle request',
  });
});

// Middleware lets you configure how your express application works.
// Third party add-on

//Bind the application to a port on our machine.
//Takes a function as a second argument.
app.listen(3000, () => {

  console.log('Server is up on port 3000.');

});
