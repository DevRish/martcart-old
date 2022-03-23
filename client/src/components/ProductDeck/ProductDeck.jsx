import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductDeck.css'

const ProductDeck = ({ categoryData }) => {
  return (
    <div className="grid">
        {
            categoryData.map((data, index) => {
                return (
                    <ProductCard cardData={data} key={index} />
                )
            })
        }
    </div>
  )
}

export default ProductDeck