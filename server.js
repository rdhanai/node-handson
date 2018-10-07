const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use ( (req, res, next) => {
    var now = new Date().toString();
    console.log('middleware... ', now);
    next();
});

app.use((request, response, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log('log...', log);
    fs.appendFile('./logs/server.log', log + '\n', ()=> {});
    next();
});

// app.use((request, response, next)=>{
//     response.render('maintenance.hbs', {});
// });


app.get('/', (request, response)=> {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'welecome to my app'
    });
});
app.get('/about', (request, response)=> {
    response.render('about.hbs', {
        pageTitle: 'About Page Heading'
    });
});

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
});
