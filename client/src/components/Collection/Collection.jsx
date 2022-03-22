import React from 'react';
import { Link } from "react-router-dom";
import './Collection.css';
import ProductCard from '../ProductCard/ProductCard';

const Collection = ({ category, catData, catUrl }) => {
    return (
        <div className="container">
            <h1 className="mainHeading">Best offers on {category}</h1>
            <div className="grid">
                {
                    catData.map((product) => {
                        return (
                            <ProductCard cardData={product} key={product.id} />
                        )
                    })
                }
                <div className="categoryCardLast"><Link to={catUrl}><i className="fas fa-arrow-right"></i></Link></div>
            </div>
        </div>
    )
}

export default Collection;
