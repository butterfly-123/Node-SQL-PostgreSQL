// express -> it is the function with an argument 'express' which we can use
const fs = require('fs');
const express = require('express');
const fortunes = require('./fortunes_api.json');
const bodyParser = require('body-parser');

// app -> function with express application witch we can configuration
const app = express();

app.use(bodyParser.json());

// req -> request, res -> response
// get -> function witch check url with express function
app.get('/fortunes', (req, res) => {

    // // send -> function response object
    // res.send('requesting fortunes')

    // json -> function response file
    res.json(fortunes);
})

app.get('/fortunes/random', (req, res) => {
    // const random_index = Math.floor(Math.random() * fortunes.length);
    // const r_fortune = fortunes[random_index];
    //
    // res.json(r_fortune)

    res.json(fortunes[Math.floor(Math.random() * fortunes.length)])
})

app.get('/fortunes/random/:id', (req, res) => {
    // find -> function witch find specific element with individual argument
    res.json(fortunes.find(f => f.id == req.params.id));
})

app.post('/fortunes', (req, res) => {
    console.log(req.body);

    const { message, lucky_number, spirit_animal } = req.body;
    const fortune_ids = fortunes.map(f => f.id)
    const fortune = {
        id: (fortune_ids > 0 ? Math.max(...fortune_ids) : 0) + 1,
        message,
        lucky_number,
        spirit_animal
    };
    const new_fortunes = fortunes.concat(fortune);

    fs.writeFile('data/fortunes.json', JSON.stringify(new_fortunes), err => console.log(err ));

    res.json(new_fortunes);
})

module.exports = app;