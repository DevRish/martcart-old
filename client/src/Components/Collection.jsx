import React from 'react';
import { Link } from "react-router-dom";
import './../Styles/Collection.css';
import { ProductData } from "./../Helpers/ProductData";

const catData = [
    {
        item: "Footwear",
        link: "/footwear",
        prodids: [ "foot_1", "foot_2", "foot_3" ]
    },
    {
        item: "Garments",
        link: "/fashion",
        prodids: [ "fas_2", "fas_5", "fas_3" ]
    },
    {
        item: "Winterwear",
        link: "/winterwear",
        prodids: [ "wint_1", "wint_7", "wint_3" ]
    },
    {
        item: "Electronics",
        link: "/electronics",
        prodids: [ "elec_1", "elec_2", "elec_3" ]
    }
]

const Collection = () => {
    return (
        <div className="collection">
            {
                catData.map((cData, indx) => {
                    return (
                        <div className="categoryContainer" key={indx}>
                            <h1>Best offers on {cData.item}</h1>
                            <div className="category">
                                {
                                    cData.prodids.map((prodid, i) => {
                                        let data = ProductData.find(obj => { return obj.id === prodid});
                                        return (
                                            <Link to={"/product/"+data.id} className="categoryCard" style={{
                                                textDecoration: "none",
                                                color: "black"
                                            }} key={i}>
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
                                <div className="categoryCardLast"><Link to={cData.link}><i className="fas fa-arrow-right"></i></Link></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Collection;
