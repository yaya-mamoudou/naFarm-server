require('dotenv').config();
require('module-alias/register');

const { PORT } = require('@config/config');
const express = require('express');
const connectDb = require('@db/connection');
const { farm, user, investment, discovery } = require('@routes/');
const port = PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', user);
app.use('/api/v1/farm', farm);
app.use('/api/v1/investment', investment);
app.use('/api/v1/discovery', discovery);

const start = async () => {
	try {
		await connectDb();
		app.listen(port, console.log(`Server running on PORT http://localhost:${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
