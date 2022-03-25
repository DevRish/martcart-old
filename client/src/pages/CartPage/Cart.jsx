import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../config/queryClient';
import { checkLoggedIn } from '../../api/auth';
import Spinner from './../../components/Spinner/Spinner';
import { getCart, removeCartItem } from './../../api/cart';
import Checkout from '../../components/CheckOut/Checkout';
import "./Cart.css";
// import "./../ProductPage/Product.css";

const Cart = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [checkoutVis, setCheckoutVis] = useState(false);

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

    const totalFunc = () => {
        var total = 0;
        for(let i=0; i<cartQuery.data.length; i++) 
        {
            let priceNew = cartQuery.data[i].price*(1 - cartQuery.data[i].discount_percent*0.01);
            total += (cartQuery.data[i].quantity * parseInt(priceNew));
        }
        return total;
    }
    const removeFromCart = (id) => {
        removeCartItem({
            prodid: id,
            currUser: authQuery.data.username
        });
        queryClient.invalidateQueries('cart');
    }
    return (
        <>
        {
            (authQuery.isFetched && authQuery.data.isLoggedIn) ?
            <div className="cartContainer">
                { (cartQuery.isFetching || cartQuery.isRefetching) && <Spinner /> }
                {
                    (!cartQuery.isFetching && !cartQuery.isRefetching && cartQuery.data.length !== 0) && 
                    <span className='totalPrice'><h1>Total Price : Rs { totalFunc() }</h1><button onClick={() => setCheckoutVis(!checkoutVis)}>Buy Now</button></span>
                }
                {
                    (checkoutVis && authQuery.data.isLoggedIn) && 
                    <Checkout
                        isCart={true} 
                        items={null}
                        price={ totalFunc() }
                    />
                }
                {
                    (!cartQuery.isFetching && !cartQuery.isRefetching && cartQuery.data.length !== 0) ?
                    cartQuery.data.map((data, index) => {
                        return (
                            <div className="cartCard" key={index}>
                                <div className="cartImg" style={{
                                    backgroundImage: `url(${data.img_url})`
                                }}></div>
                                <div className="cartDesc">
                                    <h4>{data.prod_name}</h4>
                                    <div style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                                        <p>
                                            <b> Rs {data.quantity * parseInt((data.price)*( 1 - (data.discount_percent*0.01)))}  </b>
                                        </p>
                                        <p> <b>Quantity:</b> {data.quantity} </p>
                                        <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                                        <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                                    </div>
                                    <button onClick={() => removeFromCart(data._id)}>Remove From Cart</button>
                                </div>
                            </div>
                        )
                    }) :
                    !cartQuery.isFetching && !cartQuery.isRefetching && 
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>No items to display in cart</h2>
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
