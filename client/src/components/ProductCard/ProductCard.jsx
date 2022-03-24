import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ cardData }) => {
  return (
    <Link to={"/product/"+cardData._id} className="productCard" style={{
        textDecoration: "none",
        color: "black"
    }}>
        <div className="productCardImg" style={{
            backgroundImage: `url(${cardData.img_url})`
        }}></div>
        <div className="productCardDesc">
            <h4>{cardData.prod_name}</h4>
            <p>
                <b> Rs {parseInt((cardData.price)*( 1 - (cardData.discount_percent*0.01)))}  </b>
                <span style={{
                    fontSize: `14px`,
                    textDecoration: `line-through`
                }}>{cardData.price}</span> 
                ({cardData.discount_percent}% off)
            </p>
            <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
            <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
        </div>
    </Link>
  )
}

export default ProductCard