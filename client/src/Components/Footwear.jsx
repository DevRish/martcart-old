import React from 'react';
import './../Styles/Collection.css';
import { FootwearData } from '../Helpers/FootwearData';
import { Link } from 'react-router-dom';


const Footwear = () => {
    window.scroll({top: 0});
    return (
        <div className="categoryContainer">
            <h1> 👟 LATEST IN FOOTWEAR 👟 </h1>
            <div className="category">
                {
                    FootwearData.map((data, index) => {
                        return (
                            <Link to={"/product/"+data.id} className="categoryCard" style={{
                                textDecoration: "none",
                                color: "black"
                            }}>
                                <div className="catCardImg" style={{
                                    backgroundImage: `url(${data.img})`
                                }}></div>
                                <div className="catCardDesc">
                                    <h4>{data.heading}</h4>
                                    <p>
                                        <b> Rs {data.priceNew}  </b>
                                        <span style={{
                                            fontSize: `14px`,
                                            textDecoration: `line-through`
                                        }}>{data.priceOld}</span> 
                                        ({parseInt(((parseInt(data.priceOld)-parseInt(data.priceNew))/(parseInt(data.priceOld)))*100)}% off)
                                    </p>
                                    <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                                    <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Footwear;
