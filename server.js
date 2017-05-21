var fs = require('fs');
var express = require('express');
var app = express();

var hbs = require('hbs');

hbs.registerHelper('GetCopyWrite',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt',(objectOf) =>{
    return objectOf.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine","hbs");
app.use(express.static('public'));
////////////////////////////////////////////////////

app.use('/about', (req,res,next) => {
   
   var timeStamp = new Date().toString();
   var logString = ` Current Time at the time of the request ${timeStamp} and the ${req.method}`
   console.log(logString);
   fs.appendFile('WebLog.log',logString + '\n', (error)=>{ if(error){console.log('There was an error appending the file \n ' + error)}})

    next();
} );


/////




// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
   var daObject = {
        title : "!This is the Welcome Page",
        
        greeting : "Welcome to the Welcome page"

    }

    

    res.render('welcome.hbs', daObject);
});


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Unable to make this request"
    });
});

app.get('/about', (req,res)=>{
    
    var timeObject = {
        title : "This is the About Page",
       
    }

    console.log(timeObject);

    res.render('about.hbs', timeObject);
});






app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

