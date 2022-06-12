require('dotenv').config();
require('module-alias/register');

const express = require('express');
const connectDb = require('@db/connection');
const User = require('@routes/User');
const Farm = require('@routes/Farm');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', User);
app.use('/api/v1/farm', Farm);

const start = async () => {
	try {
		await connectDb();
		app.listen(PORT, console.log(`Server running on PORT http://localhost:${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
