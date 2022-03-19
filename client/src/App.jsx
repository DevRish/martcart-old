import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/HomePage/Home'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import Product from './pages/ProductPage/Product'
import MyOrders from './pages/OrdersPage/MyOrders'
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/ProfilePage/Profile'
import Cart from './pages/CartPage/Cart'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [currUser, setcurrUser] = useState('');
    const [cartCount, setCartCount] = useState(0);

    const checkLoggedIn = async () => {
        fetch('/api/auth/checkLogged').then(res => res.json()).then(data => {
            if(data.user !== undefined) 
            {
                setisLoggedIn(true);
                setcurrUser(data.user.username);
            }
        })
        console.log('isLoggedIn : '+isLoggedIn);
    }

    checkLoggedIn();

    return(
        <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "8vh" }}>
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} currUser={currUser} cartCount={cartCount} setCartCount={setCartCount} />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/footwear" element={<CategoryPage category={'footwear'} />} />
                <Route path="/fashion" element={<CategoryPage category={'fashion'} />} />
                <Route path="/winterwear" element={<CategoryPage category={'winterwear'} />} />
                <Route path="/electronics" element={<CategoryPage category={'electronics'} />} />
                <Route path="/product/:id" element={<Product currUser={currUser} setCartCount={setCartCount} cartCount={cartCount} />} />
                <Route path="/myorders" element={<MyOrders currUser={currUser} />} />
                <Route path="/authpage" element={<AuthPage setisLoggedIn={setisLoggedIn} setcurrUser={setcurrUser} />} />
                <Route path="/cart" element={<Cart currUser={currUser} setCartCount={setCartCount} cartCount={cartCount} />} />
                <Route path="/profile" element={<Profile currUser={currUser} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </div>
    );
}

export default App;
