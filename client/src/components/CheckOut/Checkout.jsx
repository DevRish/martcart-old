import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stateList, cityList } from '../../helpers/locationsList';
import Visa from './../../assets/visa.svg';
import MasterCard from './../../assets/mastercard.svg';
import Paypal from './../../assets/paypal.svg';

// Cart: 
// <Checkout currUser={currUser} items={cartdata} checkoutVis={checkoutVis} removeFromCart={removeFromCart} price={ totalFunc() } isCart={true}>
// Product: 
// <Checkout currUser={currUser} items={ [product] } checkoutVis={checkoutVis} removeFromCart={null} price={ product.priceNew } isCart={false}>

const Checkout = ({ currUser, items, checkoutVis, removeFromCart, price, isCart }) => {
    const [userData, setUserData] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [payChosen, setPayChosen] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        const data = await getUserData({
            currUser: currUser
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
            if(isCart) 
            {
                for(let x in items)
                {
                    let item = items[x];
                    addNewOrder({
                        prodid: item.id,
                        date: date,
                        time: time,
                        quantity: 1,
                        totalPrice: (item.priceNew), 
                        address: (address+', '+city+', '+state+' - '+pin),
                        currUser: currUser
                    })
                    removeFromCart(item.id);
                }
            }
            else 
            {
                addNewOrder({
                    prodid: items[0].id,
                    date: date,
                    time: time,
                    quantity: quantity,
                    totalPrice: (items[0].priceNew * quantity), 
                    address: (address+', '+city+', '+state+' - '+pin),
                    currUser: currUser
                });
            }
            navigate('/myorders');
        }
    }
    return(
        <div className={ (checkoutVis) ? "checkoutVis" : "" }>
            { (!isFetched) && <Spinner /> }
            {
                isFetched &&
                <>
                <div className="container checkout">
                    <h1>ORDER DETAILS: </h1>
                    <div className="checkout_field">
                        <label htmlFor="checkout_name">Name:</label>
                        <div id="checkout_name">{userData.firstname} {userData.lastname}</div>
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_phone">Phone:</label>
                        <div id="checkout_phone">{userData.phone}</div>
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_email">Email:</label>
                        <div id="checkout_email">{userData.email}</div>
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_address">Address:</label>
                        <input 
                            type="text" 
                            id="checkout_address"
                            placeholder='Enter Address'
                            onChange={(e) => setAddress(e.target.value)} 
                        />
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_city">City:</label>
                        <select id="checkout_city" onChange={(e) => setCity(e.target.value)}>
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
                    <div className='checkout_field'>
                        <label htmlFor="checkout_state">State:</label>
                        <select id="checkout_state" onChange={(e) => setState(e.target.value)}>
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
                    <div className='checkout_field'>
                        <label htmlFor="checkout_pin">Pin:</label>
                        <input 
                            type="text" 
                            id="checkout_pin" 
                            placeholder='Enter pin'
                            onChange={(e) => setPin(e.target.value)}
                        />
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_price">Price:</label>
                        <div id="checkout_price">{price}</div>
                    </div>
                    <div className='checkout_field'>
                        <label>Choose payment method:</label>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_cash" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_cash">Cash on delivery</label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_visa" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_visa"><img src={Visa} alt='Visa'/></label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_mastercard" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_mastercard"><img src={MasterCard} alt='MasterCard'/></label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_paypal" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_paypal"><img src={Paypal} alt='Paypal'/></label>
                        </div>
                    </div>
                    { isEmpty && <p>Please specify all fields</p> }
                    <button className='checkout_paybtn' onClick={addOrder}>Proceed</button>
                </div>
                </>
            }
        </div>
    )
}