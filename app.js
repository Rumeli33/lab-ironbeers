const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...
app.get('/', (req, res, next) => {
  res.render('index');
  console.log('it worked');
});

// Add the route handlers here:

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = { beersFromApi };
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      const data1 = { responseFromAPI };
      res.render('random-beer', data1);
    })
    .catch(error => console.log(error));
});

app.listen(3060, () => console.log('🏃‍ on port 3000'));
