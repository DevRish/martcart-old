const { DATABASE_URL } = require('./keys');
const { connect } = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const connection = await connect(DATABASE_URL);
    console.log(chalk.greenBright('[+] MongoDB Connected'));
    return connection;
  } catch (err) {
    if (err instanceof Error) console.error(chalk.redBright(`[-] Error while connectiong to MongoDB : ${err.message}`));
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;
