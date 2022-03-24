const express = require("express");
const expressSession = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const chalk = require("chalk");
const cors = require("cors");
const { PORT, CLIENT_URL, CLIENT_DOMAIN, SESSION_SECRET, DATABASE_URL } = require("./config/keys");
const { connectDB } = require("./config/databaseConn");
const { userRoutes } = require('./routes/userRoutes');
const { authRoutes } = require('./routes/authRoutes');
const { cartRoutes } = require('./routes/cartRoutes');
const { orderRoutes } = require('./routes/orderRoutes');
const { productRoutes } = require('./routes/productRoutes');
require('./config/passport-config');

const app = express();

const connection = connectDB();

app.use(cors({
    origin: CLIENT_URL,
}));
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: DATABASE_URL, collectionName: 'sessions' }),
    cookie: {
        domain: CLIENT_DOMAIN,
        maxAge: 1000 * 60 * 60 * 2 // Equals 2 hours (2 hr * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static('public'));
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req,res) => {
    res.send('<h1>Server is running :)</h1><h3>Client and server were separated. <br> Please visit client at https://martcartdevrish.netlify.app/</h3>')
})
 
app.listen(PORT, () => console.log(chalk.greenBright(`[+] Server running on port ${PORT}`)) );
