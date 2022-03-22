import { useState, useEffect } from 'react';
import Spinner from './../../components/Spinner/Spinner';
import { getOrderData } from '../../api/order';
import "./MyOrders.css";

const MyOrders = (props) => {
    const [orderdata, setOrderData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    useEffect(() => {
        fetchOrderData();
    }, [orderdata]);
    const fetchOrderData = async () => {
        if(props.currUser !== '')
        {
            const data = await getOrderData(props.currUser);
            setOrderData(data);
            setIsFetched(true);
        }
    }
    return (
        <>
        {
            (props.currUser !== '') ?
            <div className="container">
                { (!isFetched) && <Spinner /> }
                { (orderdata.length !== 0) && isFetched && <h1 className='mainHeading'>🛍️ Your Orders: 🛍️</h1> }
                {
                    ((orderdata.length !== 0) && isFetched) ?
                    orderdata.map((data, index) => {
                        return (
                            <div className="orderCard" key={index}>
                                <div className="orderImg" style={{
                                    backgroundImage: `url(${data.img})`
                                }}></div>
                                <div className="orderDesc">
                                    <h3 style={{ fontSize: "3rem" }}>{data.heading}</h3>
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
                    isFetched && <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>You have not ordered anything yet</h2>
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
