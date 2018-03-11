const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('outLoud', (txt) => {
    return txt.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url} ${req.ip} ${JSON.stringify(req.query)}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to file.');
        }
    })
    next();
});

// ####### Maintenance Block Start #######
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Website under maintenance',
//         msg: 'We will be right back!'
//     })
// })
// ####### Maintenance Block End #######


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome home!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to process request.'
    })
});


// serverPort = 3000;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}.`);
});