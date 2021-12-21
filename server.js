const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// -------Database Connection:---------------
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connection Successful')).catch((err)=>{
    console.log('Failed to connect with error:');
    console.log(err);
});

// ------------Schemas And Models--------------------
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    phone: String,
    email: String,
    password: String,
    cart: Array,
    orders: Array,
    joinDate: String
});

const User = mongoose.model('User', userSchema);

//---------------------Routes------------------------

app.post('/adduser', async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        cart: [],
        orders: [],
        joinDate: req.body.date
    });
    User.find({ username: req.body.username }).then((users) => {
        if(users.length===0)
        {
            newUser.save().then(() => res.send('success')).catch(err => console.log(err));
        }
        else res.send('Username already exists. Please signin or choose different username.');
    }).catch(err => console.log(err));
});

app.post('/validate', (req, res) => {
    User.find({ username: req.body.username }).then((users) => {
        if(users.length===0) res.send('Account doesnot exist.');
        else
        {
            if(users[0].password === req.body.password) res.send('success');
            else res.send('Wrong Password');
        }
    }).catch(err => console.log(err));
});

app.post('/getcartdata', (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.send({ cart: users[0].cart});
    }).catch(err => console.log(err))
})

app.post('/addToCart', (req,res) => {
    User.updateOne({ username: req.body.currUser }, { $push: { cart: req.body.prodid } })
    .then(() => console.log("updated") ).catch(err => console.log(err))
})

app.post('/removeFromCart', (req,res) => {
    console.log(req.body.prodid)
    User.updateOne({ username: req.body.currUser }, { $pull: { cart: req.body.prodid } })
    .then(() => console.log("updated") ).catch(err => console.log(err))
})

app.post('/getorderdata', (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.send({ orders: users[0].orders});
    }).catch(err => console.log(err))
})

app.post('/addOrder', (req,res) => {
    const newOrder = {
        prodid: req.body.prodid,
        date: req.body.date,
        time: req.body.time,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice, 
        address: req.body.address
    }
    User.updateOne({ username: req.body.currUser }, { $push: { orders: newOrder } })
    .then(() => console.log("updated") ).catch(err => console.log(err));
    res.send({ msg: 'success' })
})

app.post('/getUserData', (req,res) => {
    User.find({ username: req.body.currUser }).then((users) => {
        res.send({ 
            firstname: users[0].firstname,
            lastname: users[0].lastname,
            phone: users[0].phone,
            email: users[0].email,
            joinDate: users[0].joinDate
        });
    }).catch(err => console.log(err))
})

// In production
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//------------Start the server on given port---------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});