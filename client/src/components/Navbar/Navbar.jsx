import { useState } from 'react';
import { useQuery } from 'react-query';
import { checkLoggedIn } from '../../api/auth';
import { getCart } from '../../api/cart';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const authQuery = useQuery('auth', checkLoggedIn, { initialData: { username: '', isLoggedIn: false } } );
    const cartQuery = useQuery('cart', async () => {
        const { isLoggedIn, username } = await checkLoggedIn();
        if(isLoggedIn)
        {
            const cartdata = await getCart(username);
            return cartdata;
        }
        else return [];
    }, { initialData: [] } )

    const [showMenu, setshowMenu] = useState(false);

    const calcCartCount = () => {
        if(cartQuery.data.length === 0) return 0;
        else
        {
            let total = 0;
            cartQuery.data.forEach((item) => { total += item.quantity });
            return total;
        }
    }

    return (
        <nav>
            <div className="navContainer">
                <h1><i className="fas fa-shopping-cart"></i>  MartCart</h1>
                <ul className={showMenu ? "show" : "hide"}>
                    <li><button className="closeMenu" onClick={() => setshowMenu(false)}><i className="fas fa-arrow-right"></i></button></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/myorders">My Orders</Link></li>
                    <li>
                        {
                            (authQuery.data.isLoggedIn) ? 
                            <Link to="/profile">Profile</Link> :
                            <Link to="/authpage">SignIn</Link>
                        } 
                    </li>
                    <li><Link to="/search">Search <i className="fa-solid fa-magnifying-glass"></i></Link></li>
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
                        }}>
                            {/* {console.log(cartQuery)} */}
                            <p style={{ fontSize: "1.5rem" }}>{calcCartCount()}</p></div>
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
