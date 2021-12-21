import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Collection from './Components/Collection';
import Footwear from './Components/Footwear';
import Fashion from './Components/Fashion';
import Winterwear from './Components/Winterwear';
import Electronics from './Components/Electronics';
import MyOrders from './Components/MyOrders';
import AuthPage from './Components/AuthPage';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import './App.css';
import Product from './Components/Product';
import Footer from './Components/Footer'

const App = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [currUser, setcurrUser] = useState('');
    const [cartCount, setCartCount] = useState(0);
    return(
        <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "8vh" }}>
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} currUser={currUser} cartCount={cartCount} setCartCount={setCartCount} />
            <Routes>
                <Route path="/" exact element={
                    <>
                        <Carousel />
                        <Collection />
                    </>
                } />
                <Route path="/footwear" element={<Footwear />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/winterwear" element={<Winterwear />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/product/:id" element={<Product currUser={currUser} setCartCount={setCartCount} cartCount={cartCount} />} />
                <Route path="/myorders" element={<MyOrders currUser={currUser} />} />
                <Route path="/authpage" element={<AuthPage setisLoggedIn={setisLoggedIn} setcurrUser={setcurrUser} />} />
                <Route path="/cart" element={<Cart currUser={currUser} setCartCount={setCartCount} cartCount={cartCount} />} />
                <Route path="/profile" element={<Profile currUser={currUser} setisLoggedIn={setisLoggedIn} setcurrUser={setcurrUser} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </div>
    );
}

export default App;