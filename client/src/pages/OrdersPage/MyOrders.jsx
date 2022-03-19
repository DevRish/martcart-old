import { useState, useEffect } from 'react';
import { SERVER_URL } from './../../config/keys';
import { ProductData } from './../../helpers/ProductData';
import Spinner from './../../components/Spinner/Spinner';
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
            fetch(`/api/order/getorderdata`, {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ currUser: props.currUser })
            }).then(res=>res.json()).then(data=>{
                //console.log('data.cart in then: ');
                //console.log(data.cart);
                let dataArr = [];
                for(let x in data.orders)
                {
                    //console.log(data.cart[x]);
                    //setCartData(cartdata.concat(ProductData.find(obj => { return obj.id === data.cart[x]})));
                    let product = ProductData.find(obj => { return obj.id === data.orders[x].prodid});
                    //console.log(product);
                    let order = {...product, ...(data.orders[x])}
                    //console.log(order);
                    dataArr.push(order)
                }
                //console.log(dataArr);
                setOrderData(dataArr.reverse());
                setIsFetched(true);
            })
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
                            <div className="orderCard">
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
