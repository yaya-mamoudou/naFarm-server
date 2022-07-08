const { user } = require('@routes/User');
const { discovery } = require('@routes/Discovery');
const { farm } = require('@routes/Farm');
const { investment } = require('@routes/Investments');
const { product } = require('@routes/Product');
const { order } = require('@routes/Order');
const { interest } = require('@routes/Interest');
const { location } = require('@routes/Location');

module.exports = { user, discovery, farm, investment, product, order, interest, location };
