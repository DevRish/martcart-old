import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import Spinner from './../../components/Spinner/Spinner'
import "./../OrdersPage/MyOrders.css"
import "./Product.css"
import { stateList, cityList } from '../../helpers/locationsList';
import Visa from './../../assets/visa.svg';
import MasterCard from './../../assets/mastercard.svg';
import Paypal from './../../assets/paypal.svg';
import { queryClient } from '../../config/queryClient';
import { addCartItem } from '../../api/cart';
import { addNewOrder } from '../../api/order';
import { checkLoggedIn } from '../../api/auth';
import { getUserData } from '../../api/user';
import { getAllProducts } from '../../api/product';

const Checkout = (props) => {
    const [userData, setUserData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [payChosen, setPayChosen] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
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
    const addOrder = () => {
        if((address === '')||(city === '')||(state === '')||(pin === '')||(!payChosen)) setIsEmpty(true);
        else
        {
            addNewOrder({
                prodid: props.id,
                date: date,
                time: time,
                quantity: quantity,
                totalPrice: (props.price * quantity), 
                address: (address+', '+city+', '+state+' - '+pin),
                currUser: props.currUser
            });
            queryClient.invalidateQueries('order');
            navigate('/myorders');
        }
    }
    return(
        <div className={ (props.checkoutVis) ? "checkoutCard checkoutVis" : "checkoutCard" }>
            { (!isFetched) && <Spinner /> }
            {
                isFetched &&
                <>
                <h1 style={{ width: "100%", textAlign: "center" }}>ORDER DETAILS: </h1>
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
                        <label htmlFor="order_address"><b>Address:</b> </label>
                        <input type="text" id="order_address" onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address'/>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="order_city"><b>City:</b> </label>
                        <select id="order_city" onChange={(e) => setCity(e.target.value)}>
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
                        <label htmlFor="order_state"><b>State:</b> </label>
                        <select id="order_state" onChange={(e) => setState(e.target.value)}>
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
                        <label htmlFor="order_pin"><b>Pin:</b>   </label>
                        <input type="text" id="order_pin" onChange={(e) => setPin(e.target.value)} style={{ width: "50%" }} placeholder='Enter Pin'/>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="order_quantity"><b>Quantity:</b> </label>
                        <input type="number" id="order_quantity" onChange={(e) => setQuantity(e.target.value)} placeholder={quantity} autoFocus/>
                    </div>
                    <div className='order_info_container'>
                        <p><b>Price:</b> Rs. {props.price * quantity}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Choose payment method:</b></p>
                        <input type="radio" name="pay_methods" id="order_pay_cash" style={{ width: "fit-content" }} onChange={() => setPayChosen(true)}/>
                        <label htmlFor="order_pay_cash"> Cash on delivery</label><br />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="order_pay_visa" style={{ 
                                width: "fit-content", 
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="order_pay_visa"> <img src={Visa} alt='Visa'/> </label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="order_pay_mastercard" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="order_pay_mastercard"> <img src={MasterCard} alt='MasterCard'/></label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="order_pay_paypal" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="order_pay_paypal"> <img src={Paypal} alt='Paypal'/></label><br />
                        </div>
                    </div>
                    { isEmpty && <p style={{ color: 'red', fontSize: '1.5rem', margin: '1rem 4rem' }}>*Please specify all fields</p> }
                    <button className='order_paybtn' onClick={addOrder}>Proceed</button>
                </div>
                </>
            }
        </div>
    )
}

const Product = () => {
    const [checkoutVis, setCheckoutVis] = useState(false);
    const productsQuery = useQuery('product', getAllProducts, { initialData: { products: [] } } );
    let navigate = useNavigate();

    const { id } = useParams() ;
    var product = {};

    if(productsQuery.isFetched)
    {
        product = productsQuery.data.products.find(product => { return product._id === id});
        // console.log(product);
    }

    const authQuery = useQuery('auth', checkLoggedIn, { initialData: { username: '', isLoggedIn: false } } );

    const addToCart = () => {
        addCartItem({
            prodid: id,
            currUser: authQuery.data.username
        });
        queryClient.invalidateQueries('cart');
        navigate('/cart');
    }

    return (
        <>
        {
            productsQuery.isFetched ?
            <div className="container">
                <div className="orderCard">
                    <div className="orderImg" style={{
                        backgroundImage: `url(${product.img_url})`
                    }}></div>
                    <div className="orderDesc">
                        <h4>{product.prod_name}</h4>
                        <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                            <p>
                                <b> Rs {parseInt((product.price)*( 1 - (product.discount_percent*0.01)))}  </b>
                                <span style={{
                                    fontSize: `14px`,
                                    textDecoration: `line-through`
                                }}>{product.price}</span> 
                                ({product.discount_percent}% off)
                            </p>
                            <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                            <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                        </div>
                        {
                            (authQuery.data.isLoggedIn) ?
                            <div className='prodbtns'>
                                <button onClick={() => setCheckoutVis(!checkoutVis)} style={{ marginRight: "2rem" }}>Buy Now</button>
                                <button onClick={addToCart}>Add to cart</button>
                            </div> :
                            <p className='prodbtns' style={{ fontSize: "2rem" }}>
                                Please 
                                <Link to="/authpage" style={{
                                    textDecoration: "none",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    margin: "0 0.6rem",
                                    color: "#230033"
                                }}>SignIn</Link>
                                to buy this product
                            </p>

                        }
                    </div>
                </div>
                {
                    (checkoutVis && authQuery.data.isLoggedIn) && 
                    <Checkout currUser={authQuery.data.username} checkoutVis={checkoutVis} id={id} price={product.price}/>
                }
            </div> :
            <Spinner />
        }
        </>
    )
}

export default Product
