const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const { prodConfig } = require("./config/production");
const { PORT, CLIENT_URL } = require("./config/keys");
const { connectDB } = require("./config/databaseConn");
const { userRoutes } = require('./routes/userRoutes');
const { authRoutes } = require('./routes/authRoutes');
const { cartRoutes } = require('./routes/cartRoutes');
const { orderRoutes } = require('./routes/orderRoutes');

const app = express();

const connection = connectDB();

app.use(cors({
    origin: CLIENT_URL,
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

app.get('/', (req,res) => {
    res.send('<h1>Server is running :)</h1><h3>Client and server were separated. <br> Please visit client at https://martcartdevrish.netlify.app/</h3>')
})

prodConfig(app); // for production
 
app.listen(PORT, () => console.log(chalk.greenBright(`[+] Server running on port ${PORT}`)) );
