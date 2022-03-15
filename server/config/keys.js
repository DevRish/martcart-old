const dotenv = require('dotenv');
dotenv.config();

module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/martcart';

module.exports.PORT = process.env.PORT || 5000;

module.exports.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
// module.exports.SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
// module.exports.CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'localhost';
