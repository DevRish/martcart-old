import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { queryClient } from "../../config/queryClient";
import { stateList, cityList } from '../../helpers/locationsList';
import { getUserData } from "../../api/user";
import { addNewOrder } from "../../api/order";
import { checkLoggedIn } from "../../api/auth";
import { getCart } from "../../api/cart";
import { emptyCart } from "../../api/cart";
import Spinner from "../Spinner/Spinner";
import RazorPay from './../../assets/razorpay.svg';
import './Checkout.css';

const Checkout = ({ item, price, isCart }) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [payChosen, setPayChosen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    let navigate = useNavigate();

    const authQuery = useQuery('auth', checkLoggedIn, { initialData: { username: '', isLoggedIn: false } } );
    
    const userQuery = useQuery('user', async () => {
        const { isLoggedIn, username } = await checkLoggedIn();
        if(isLoggedIn)
        {
            const userdata = await getUserData({ currUser: username });
            return userdata;
        }
        else return {};
    }, { initialData: {} })

    const cartQuery = useQuery('cart', async () => {
        const { isLoggedIn, username } = await checkLoggedIn();
        if(isLoggedIn)
        {
            const cartdata = await getCart(username);
            return cartdata;
        }
        else return [];
    }, { initialData: [] } )

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const addOrder = async () => {
        if((address === '')||(city === '')||(state === '')||(pin === '')||(!payChosen)) setIsEmpty(true);
        else
        {
            if(isCart) 
            {
                // cart query keeps updating as we remove. Keeping it here is risky I guess.
                // Same for user, lets make things constant
                const cartFixed = cartQuery.data;
                const currUser = authQuery.data.username;
                for(let x in cartFixed)
                {
                    const item = cartFixed[x];
                    await addNewOrder({
                        prodid: item._id,
                        date: date,
                        time: time,
                        quantity: item.quantity,
                        totalPrice: (item.quantity * parseInt((item.price)*( 1 - (item.discount_percent*0.01)))), 
                        address: (address+', '+city+', '+state+' - '+pin),
                        currUser: currUser
                    })
                    
                    // console.log(item.prod_name+' has quantity '+item.quantity);
                    // for(let i=1; i<=item.quantity; i++) 
                    // {
                    //     removeFromCart(item._id, currUser);
                    //     console.log('Removed one '+item.prod_name);
                    // }
                }
                await emptyCart(currUser);
                queryClient.invalidateQueries('cart');
            }
            else 
            {
                addNewOrder({
                    prodid: item._id,
                    date: date,
                    time: time,
                    quantity: 1,
                    totalPrice: price, 
                    address: (address+', '+city+', '+state+' - '+pin),
                    currUser: authQuery.data.username
                });
            }
            navigate('/myorders');
        }
    }
    return(
        <>
            { (!userQuery.isFetched || !authQuery.isFetched || cartQuery.isFetching || cartQuery.isRefetching) && <Spinner /> }
            {
                (userQuery.isFetched && cartQuery.isFetched && !cartQuery.isRefetching && authQuery.isFetched) &&
                <>
                <div className="container checkout">
                    <h1>ORDER DETAILS: </h1>
                    <div className="checkout_field">
                        <label htmlFor="checkout_name">Name:</label>
                        <input id="checkout_name" readOnly value={userQuery.data.firstname + ' ' +userQuery.data.lastname} />
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_phone">Phone:</label>
                        <input id="checkout_phone" readOnly value={userQuery.data.phone} />
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_email">Email:</label>
                        <input id="checkout_email" readOnly value={userQuery.data.email} />
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
                        <label htmlFor="checkout_price">Price: </label>
                        <input id="checkout_price" readOnly value={String.fromCharCode(8377)+' '+price} />
                    </div>
                    <div className='checkout_field'>
                        <label>Choose payment method:</label>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_cash" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_cash">Cash on delivery</label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_razorpay" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_razorpay"><img src={RazorPay} alt='RazorPay'/></label>
                        </div>
                    </div>
                    { isEmpty && <p className="checkout_error">Please specify all fields</p> }
                    <button className='checkout_paybtn' onClick={addOrder}>Proceed</button>
                </div>
                </>
            }
        </>
    )
}

export default Checkout