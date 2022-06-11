const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

console.log(MONGO_URI);

const cb = (err) => (err ? 'Connection to database failed' : 'Connected to database');

const connectDb = () => {
	mongoose.connect(MONGO_URI, options, (err) => console.log(cb(err)));
};

module.exports = connectDb;
