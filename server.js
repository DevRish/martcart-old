const express = require("express");
const chalk = require("chalk");
const { prodConfig } = require("./config/production");
const { PORT } = require("./config/keys");
const { connectDB } = require("./config/databaseConn");
const { userRoutes } = require('./routes/userRoutes');
const { authRoutes } = require('./routes/authRoutes');
const { cartRoutes } = require('./routes/cartRoutes');
const { orderRoutes } = require('./routes/orderRoutes');

const app = express();

const connection = connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

prodConfig(app); // for production
 
app.listen(PORT, () => console.log(chalk.greenBright(`[+] Server running on port ${PORT}`)) );
