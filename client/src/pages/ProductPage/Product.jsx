import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../config/queryClient';
import { addCartItem } from '../../api/cart';
import { checkLoggedIn } from '../../api/auth';
import { getAllProducts } from '../../api/product';
import Checkout from '../../components/CheckOut/Checkout';
import Spinner from './../../components/Spinner/Spinner'
import "./../OrdersPage/MyOrders.css"
import "./Product.css"

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
                    <Checkout 
                        isCart={false} 
                        item={product}
                        price={ parseInt((product.price)*( 1 - (product.discount_percent*0.01))) }
                    />
                }
            </div> :
            <Spinner />
        }
        </>
    )
}

export default Product
