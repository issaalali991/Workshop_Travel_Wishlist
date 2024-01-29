import express from 'express';
import countries from './countries.js';
import { matchedData, validationResult } from 'express-validator';
import { body, param } from 'express-validator';
import bodyParser from 'body-parser';

import ejs from 'ejs';
const wishlistRouter = express.Router();
wishlistRouter.use(bodyParser.json());


// -------1. GET /api/countries-------------
wishlistRouter.get('/', (req, res) => {
  let sortCountries = countries;
  const sortParam = req.query.sort;
  if (sortParam && sortParam.toLowerCase() === 'true') {
    sortCountries = sortCountries.sort((a,b)=>a.name.localeCompare(b.name));
  }

  // res.json(sortCountries);
  res.render('index.ejs', { countries: sortCountries });
}
);

//  ------------ Add a new country to the list of countries -----------------
wishlistRouter.get('/add', (req, res) => {
 
  res.render('addCountry.ejs');
});

//  ------------2. POST /api/countries-----------------

wishlistRouter.post('/', (req, res) => {
  const newCountry = req.body;
  console.log(newCountry);
  const lastId = countries[countries.length - 1].id;
  if (!newCountry.name || !newCountry.alpha2Code || !newCountry.alpha3Code) {
    res.status(400).json({ error: 'Missing data' });
    return;
  }
  if (countries.find((country) => country.name === newCountry.name)) {
    res.status(400).json({ error: 'Country already exists' });
    return;
  }
  if(newCountry.alpha2Code.length!==2)
  {
    res.status(400).json({ error: 'alpha2Code must be 2 characters' });
    return;
  }
  if(newCountry.alpha3Code.length!==3)
  {
    res.status(400).json({ error: 'alpha3Code must be 3 characters' });
    return;
  }

  // --------  Validate the data with express-validator -------------

  // const errors = validationResult(req.body);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  //   return;
  // }
  // const data= matchedData(req);
  // console.log(data);




  newCountry.id = lastId + 1;
  countries.push(newCountry);
  // res.json(newCountry);

  res.redirect('/api/countries');
}
);
//  ------------3. GET /api/countries/:code-----------------
wishlistRouter.get('/:code', (req, res) => {
  const code = req.params.code;
  const country = countries.find((country) => country.alpha3Code === code);
  if (!country) {
    res.status(404).json({ error: 'Country not found' });
    return;
  }
  res.json(country);
}
);



//  ---------------------------4. PUT /api/countries/:code ---------

wishlistRouter.put('/:code', (req, res) => {
  const code = req.params.code;
  if(code.length!==3)
  {
    res.status(400).json({ error: 'alpha3Code must be 3 characters' });
    return;
  }
  const country = countries.find((country) => country.alpha3Code === code);
  if (!country) {
    res.status(404).json({ error: 'Country not found' });
    return;
  }
  const updatedCountry = req.body;
  if (!updatedCountry.name || !updatedCountry.alpha2Code || !updatedCountry.alpha3Code) {
    res.status(400).json({ error: 'Missing data' });
    return;
  }
  if (countries.find((country) => country.name === updatedCountry.name)) {
    res.status(400).json({ error: 'Country already exists' });
    return;
  }
  if(updatedCountry.alpha2Code.length!==2)
  {
    res.status(400).json({ error: 'alpha2Code must be 2 characters' });
    return;
  }
  if(updatedCountry.alpha3Code.length!==3)
  {
    res.status(400).json({ error: 'alpha3Code must be 3 characters' });
    return;
  }
  country.name = updatedCountry.name;
  country.alpha2Code = updatedCountry.alpha2Code;
  country.alpha3Code = updatedCountry.alpha3Code;
  res.json(country);
}
);

// -----------------------------5. DELETE /api/countries/:code-----------------
wishlistRouter.delete('/:code', (req, res) => {
  const code = req.params.code;
  const country = countries.find((country) => country.alpha3Code === code);
  if (!country) {
    res.status(404).json({ error: 'Country not found' });
    return;
  }
  const index = countries.indexOf(country);
  countries.splice(index, 1);
  res.json(country);
}
);
export default wishlistRouter;
