import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDeck from '../../components/ProductDeck/ProductDeck';
import { getAllProducts } from '../../api/product';
import './CategoryPage.css';
import Spinner from '../../components/Spinner/Spinner';

const CategoryPage = () => {
    window.scroll({top: 0});
    const { category } = useParams();
    var productsData = [];
    const productsQuery = useQuery('product', getAllProducts, { initialData: { products: [] } } );
    if(productsQuery.isFetched)
    {
        if(category) productsData = productsQuery.data.products.filter((product) => product.tags.includes(category));
        else productsData = productsQuery.data.products;
    }
    return (
        <div className="container">
            <h1 className='mainHeading'> 🛍️ Our Products 🛍️ </h1>
            {
                productsQuery.isFetched ? 
                <ProductDeck productData={productsData} /> :
                <Spinner />
            }
        </div>
    )
}

export default CategoryPage;
