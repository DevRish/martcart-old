import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDeck from '../../components/ProductDeck/ProductDeck';
import { getAllProducts } from '../../api/product';
import './CategoryPage.css';
import Spinner from '../../components/Spinner/Spinner';

const CategoryPage = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [searchText, setSearchText] = useState('');
    const { category } = useParams();
    const [productsData, setProductsData] = useState([]);
    const productsQuery = useQuery('product', getAllProducts, { initialData: { products: [] } } );

    const filterData = () => {
        // console.log(searchText);
        // if(productsQuery.isFetched)
        if(productsQuery.data.products.length !== 0)
        {
            if(searchText === '') 
            {
                if(category) setProductsData(productsQuery.data.products.filter((product) => product.tags.includes(category)) );
                else setProductsData(productsQuery.data.products);
            }
            else
            {
                setProductsData(productsQuery.data.products.filter((product) => product.prod_name.toLowerCase().includes(searchText.toLowerCase())) );
            }
        }
    }

    useEffect(() => {
        filterData();
    }, [searchText, productsQuery])

    return (
        <div className="container">
            <h1 className='mainHeading'> 🛍️ Our Products 🛍️ </h1>
            <input type="text" placeholder='Search Your Desire' 
                style={{
                    width: "100%",
                    marginBottom: "2rem",
                    fontSize: "2rem",
                    padding: "1rem 2rem",
                    borderRadius: "1rem"
                }}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {/* { console.log(productsData) } */}
            {/* { console.log(productsQuery.data.products) } */}
            {
                productsQuery.isFetched ? 
                productsData.length !== 0 ?
                <ProductDeck productData={productsData} /> :
                <h1>No results found for your search</h1>
                :
                <Spinner />
            }
        </div>
    )
}

export default CategoryPage;
