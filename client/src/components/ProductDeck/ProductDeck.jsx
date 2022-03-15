import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductDeck.css'

const ProductDeck = ({ categoryData }) => {
  return (
    <div className="grid">
        {
            categoryData.map((data) => {
                return (
                    <ProductCard cardData={data} />
                )
            })
        }
    </div>
  )
}

export default ProductDeck