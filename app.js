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
	//Set up PG connection
	pg.connect(connection, (err, client, done) => {
		if(err) {
			return console.lerr('Beep boop error fetching client from pool', err);
		}
		client.query('SELECT * FROM recipes', (err, result) => {
			if(err) {
				return console.error('Beep boop error running query', err);
			}
			response.render('index', {recipes: result.rows});
			done();
		});

	});
});

app.post('/add', (request, response) => {
	//Set up PG connection
	pg.connect(connection, (err, client, done) => {
		if(err) {
			return console.error('Beep boop error fetching client from pool', err);
		}
		client.query("INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)",
			[request.body.name, request.body.ingredients, request.body.directions]);

		done();
		response.redirect('/');
	});
});

app.delete('/delete/:id', (request, response) => {
		//Set up PG connection
	pg.connect(connection, (err, client, done) => {
		if(err) {
			return console.error('Beep boop error fetching client from pool', err);
		}
		client.query('DELETE FROM recipes WHERE id = $1',
			[request.params.id]);

		done();
		response.send(200);
	});
});