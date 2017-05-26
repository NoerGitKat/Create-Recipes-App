const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');

//Database connection
var connection = "postgres://postgres:Blabla_55@localhost/recipe_app";

//Assign Dust engine to .dust files
app.engine('dust', consolidate.dust);

//Set default view engine to dust
app.set('view engine', 'dust');
app.set('views', 'views');

//Set express for public files
app.use(express.static('public'));

//Set bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set listener
const listener = app.listen(3000, () => {
	console.log("The server has started at port: " + listener.address().port);
})

app.get('/', (request, response) => {
	response.render('index');
});