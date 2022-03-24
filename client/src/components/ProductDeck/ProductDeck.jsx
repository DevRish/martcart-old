import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductDeck.css'

const ProductDeck = ({ productData }) => {
  return (
    <div className="grid">
        {
            productData.map((data, index) => {
                return (
                    <ProductCard cardData={data} key={index} />
                )
            })
        }
    </div>
  )
}

export default ProductDeck