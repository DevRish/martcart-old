import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ cardData }) => {
  return (
    <Link to={"/product/"+cardData.id} className="productCard" style={{
        textDecoration: "none",
        color: "black"
    }}>
        <div className="productCardImg" style={{
            backgroundImage: `url(${cardData.img})`
        }}></div>
        <div className="productCardDesc">
            <h4>{cardData.heading}</h4>
            <p>
                <b> Rs {cardData.priceNew}  </b>
                <span style={{
                    fontSize: `14px`,
                    textDecoration: `line-through`
                }}>{cardData.priceOld}</span> 
                ({parseInt(((parseInt(cardData.priceOld)-parseInt(cardData.priceNew))/(parseInt(cardData.priceOld)))*100)}% off)
            </p>
            <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
            <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
        </div>
    </Link>
  )
}

export default ProductCard