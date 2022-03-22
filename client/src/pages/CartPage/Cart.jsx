import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Spinner from './../../components/Spinner/Spinner';
import { getCart, removeCartItem } from './../../api/cart';
import { addNewOrder } from '../../api/order';
import { getUserData } from '../../api/user';
import { stateList, cityList } from '../../helpers/locationsList';

import "./Cart.css";
import "./../ProductPage/Product.css";
import Visa from './../../assets/visa.svg';
import MasterCard from './../../assets/mastercard.svg';
import Paypal from './../../assets/paypal.svg';

const CartCheckout = (props) => {
    const [userData, setUserData] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [payChosen, setPayChosen] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        const data = await getUserData({
            currUser: props.currUser
        });
        setUserData(data);
        setIsFetched(true);
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const addOrder = async () => {
        if((address === '')||(city === '')||(state === '')||(pin === '')||(!payChosen)) setIsEmpty(true);
        else
        {
            for(let x in props.cartdata)
            {
                let item = props.cartdata[x];
                addNewOrder({
                    prodid: item.id,
                    date: date,
                    time: time,
                    quantity: 1,
                    totalPrice: (item.priceNew), 
                    address: (address+', '+city+', '+state+' - '+pin),
                    currUser: props.currUser
                })
                props.removeFromCart(item.id);
            }
            navigate('/myorders');
        }
    }
    return(
        <div className={ (props.checkoutVis) ? "checkoutCard checkoutVis" : "checkoutCard" }>
            { (!isFetched) && <Spinner /> }
            {
                isFetched &&
                <>
                <h1 style={{ width: "100%", textAlign: "center", color: "black" }}>ORDER DETAILS: </h1>
                <div className='order_info_outer'>
                    <div className='order_info_container'>
                        <p><b>Name:</b> {userData.firstname} {userData.lastname}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Phone:</b> {userData.phone}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Email:</b> {userData.email}</p> 
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_address"><b>Address:</b> </label>
                        <input type="text" id="cart_order_address" onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_city"><b>City:</b> </label>
                        <select id="cart_order_city" onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select City</option>
                            {
                                cityList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_state"><b>State:</b> </label>
                        <select id="cart_order_state" onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            {
                                stateList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_pin"><b>Pin:</b>   </label>
                        <input type="text" id="cart_order_pin" onChange={(e) => setPin(e.target.value)} style={{ width: "50%" }} placeholder='Enter pin'/>
                    </div>
                    <div className='order_info_container'>
                        <p><b>Price:</b> Rs. {props.price}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Choose payment method:</b></p>
                        <input type="radio" name="pay_methods" id="cart_pay_cash" style={{ width: "fit-content" }} onChange={() => setPayChosen(true)}/>
                        <label htmlFor="cart_pay_cash"> Cash on delivery</label><br />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_visa" style={{ 
                                width: "fit-content", 
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_visa"> <img src={Visa} alt='Visa'/> </label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_mastercard" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_mastercard"> <img src={MasterCard} alt='MasterCard'/></label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_paypal" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_paypal"> <img src={Paypal} alt='Paypal'/></label><br />
                        </div>
                    </div>
                    { isEmpty && <p style={{ color: 'red', fontSize: '1.5rem', margin: '1rem 4rem' }}>*Please specify all fields</p> }
                    <button className='order_paybtn' onClick={addOrder} style={{ 
                        color: "white", 
                        backgroundColor: "#230033",
                        paddingTop: "1rem",
                        paddingBottom: "1rem"
                    }}>Proceed</button>
                </div>
                </>
            }
        </div>
    )
}

const Cart = (props) => {
    const [cartdata, setCartData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [checkoutVis, setCheckoutVis] = useState(false);
    useEffect(() => {
        fetchCartData();
    }, [cartdata]);
    const fetchCartData = async () => {
        if(props.currUser !== '')
        {
            const data = await getCart(props.currUser);
            setCartData(data);
            setIsFetched(true);
        }
    }
    const totalFunc = () => {
        var total = 0;
        for(let i=0; i<cartdata.length; i++) total += parseInt(cartdata[i].priceNew);
        return total;
    }
    const removeFromCart = (id) => {
        removeCartItem({
            prodid: id,
            currUser: props.currUser
        });
        props.setCartCount(props.cartCount - 1)
    }
    return (
        <>
        {
            (props.currUser !== '') ?
            <div className="cartContainer">
                { (!isFetched) && <Spinner /> }
                {
                    (cartdata.length !== 0) && isFetched && 
                    <span><h1>Total Price : Rs { totalFunc() }</h1><button onClick={() => setCheckoutVis(!checkoutVis)}>Buy Now</button></span>
                }
                {
                    (checkoutVis && (props.currUser !== '')) && 
                    <CartCheckout currUser={props.currUser} checkoutVis={checkoutVis} cartdata={cartdata} price={totalFunc()} removeFromCart={removeFromCart}/>
                }
                {
                    ((cartdata.length !== 0) && isFetched) ?
                    cartdata.map((data, index) => {
                        return (
                            <div className="cartCard" key={index}>
                                <div className="cartImg" style={{
                                    backgroundImage: `url(${data.img})`
                                }}></div>
                                <div className="cartDesc">
                                    <h4>{data.heading}</h4>
                                    <div style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                                        <p>
                                            <b> Rs {data.priceNew}  </b>
                                        </p>
                                        <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                                        <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                                    </div>
                                    <button onClick={() => removeFromCart(data.id)}>Remove From Cart</button>
                                </div>
                            </div>
                        )
                    }) :
                    isFetched && <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>No items to display in cart</h2>
                }
            </div> :
            <div className="cartContainer">
                <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>Please signin to view your cart</h2>
            </div>
        }
        </>
    )
}

export default Cart
