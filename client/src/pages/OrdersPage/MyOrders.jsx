import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { checkLoggedIn } from '../../api/auth';
import Spinner from './../../components/Spinner/Spinner';
import { getOrderData } from '../../api/order';
import "./MyOrders.css";

const MyOrders = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const authQuery = useQuery('auth', checkLoggedIn, { initialData: { username: '', isLoggedIn: false } } );
    const orderQuery = useQuery('order', async () => {
        const { isLoggedIn, username } = await checkLoggedIn();
        if(isLoggedIn)
        {
            const orderdata = await getOrderData(username);
            return orderdata;
        }
        else return [];
    }, { initialData: [] } )

    return (
        <>
        {
            (authQuery.data.isLoggedIn) ?
            <div className="container">
                { (orderQuery.isFetching || orderQuery.isRefetching) && <Spinner /> }
                { 
                    (!orderQuery.isFetching && !orderQuery.isRefetching && orderQuery.data.length !== 0) && 
                    <h1 className='mainHeading'>🛍️ Your Orders: 🛍️</h1> 
                }
                {
                    ( !orderQuery.isFetching && !orderQuery.isRefetching && orderQuery.data.length !== 0) ?
                    orderQuery.data.map((data, index) => {
                        return (
                            <div className="orderCard" key={index}>
                                <div className="orderImg" style={{
                                    backgroundImage: `url(${data.img_url})`
                                }}></div>
                                <div className="orderDesc">
                                    <h3 style={{ fontSize: "3rem" }}>{data.prod_name}</h3>
                                    <p style={{ fontSize: "2rem" }}>
                                        <b>Quantity:</b> {data.quantity} <br />
                                        <b>Total:</b> Rs {data.totalPrice} <br /> 
                                        Ordered on <b>{data.date}</b> at <b>{data.time}</b> <br />
                                        <b>Delivered to address:</b> <br /> {data.address}
                                    </p>
                                </div>
                            </div>
                        )
                    }) : 
                    !orderQuery.isFetching && !orderQuery.isRefetching && 
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>You have not ordered anything yet</h2>
                }
            </div> :
            <div className="container">
                <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>Please signin to view your orders</h2>
            </div>
        }
        </>
    )
}

export default MyOrders;
