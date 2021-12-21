import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Navbar.css';

const Navbar = (props) => {
    const [showMenu, setshowMenu] = useState(false);
    useEffect(() => {
        fetchCartCount();
    }, [props.cartCount, props.currUser]);
    const fetchCartCount = async () => {
        if(props.currUser !== '')
        {
            fetch('/getcartdata', {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ currUser: props.currUser })
            }).then(res=>res.json()).then(data=>{ props.setCartCount(data.cart.length) })
        }
        else props.setCartCount(0)
    }
    return (
        <nav>
            <div className="container">
                <h1><i className="fas fa-shopping-cart"></i>  MartCart</h1>
                <ul className={showMenu ? "show" : "hide"}>
                    <li><button className="closeMenu" onClick={() => setshowMenu(false)}><i className="fas fa-arrow-right"></i></button></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/myorders">My Orders</Link></li>
                    <li>
                        {
                            (props.isLoggedIn === false) ? 
                            <Link to="/authpage">SignIn</Link> :
                            <Link to="/profile">Profile</Link>
                        } 
                    </li>
                    <li style={{ border: "none"}}>
                        <Link to="/cart" className="cartlogo">
                            <div style={{
                                position: "absolute",
                                top: "-1rem",
                                right: "-1rem",
                                backgroundColor: "#E27856",
                                color: "white",
                                borderRadius: "50%",
                                height: "2.5rem",
                                width: "2.5rem",
                                display: "grid",
                                placeItems:"center"
                            }}><p style={{ fontSize: "1.5rem" }}>{props.cartCount}</p></div>
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>
                <button className="burger" onClick={() => setshowMenu(true)}><i className="fas fa-bars"></i></button>
            </div>
        </nav>
    )
};

export default Navbar;
