import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/HomePage/Home'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import Product from './pages/ProductPage/Product'
import MyOrders from './pages/OrdersPage/MyOrders'
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/ProfilePage/Profile'
import Cart from './pages/CartPage/Cart'
import Footer from './components/Footer/Footer'
import { queryClient } from './config/queryClient';

import './App.css'

const App = () => {
    return(
        <QueryClientProvider client={queryClient}>
        <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "8vh" }}>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/search/" element={<CategoryPage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/authpage" element={<AuthPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </div>
        </QueryClientProvider>
    );
}

export default App;
