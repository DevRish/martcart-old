import { useQuery } from 'react-query'
import { getAllProducts } from '../../api/product'
import Spinner from '../../components/Spinner/Spinner'
import Carousel from './../../components/Carousel/Carousel'
import Collection from './../../components/Collection/Collection'

const Home = () => {
  const productsQuery = useQuery('product', getAllProducts, { initialData: { products: [] } } );
  var FootwearData = [];
  var FashionData = [];
  var WinterwearData = [];
  var ElectronicsData = [];
  if(productsQuery.isFetched)
  {
    // console.log(productsQuery.data);
    FootwearData = productsQuery.data.products.filter((product) => product.tags.includes("shoe"));
    FashionData = productsQuery.data.products.filter((product) => product.tags.includes("fashion"));
    WinterwearData = productsQuery.data.products.filter((product) => product.tags.includes("winterwear"));
    ElectronicsData = productsQuery.data.products.filter((product) => product.tags.includes("technology"));
  }
  return (
    <>
    <Carousel />
    {
      productsQuery.isFetched ?
      <>
      <Collection category="Shoes" catData={FootwearData.slice(0,3)} catUrl="/search" />
      <Collection category="Fashion" catData={FashionData.slice(0,3)} catUrl="/search" />
      <Collection category="Winterwear" catData={WinterwearData.slice(0,3)} catUrl="/search" />
      <Collection category="Technology" catData={ElectronicsData.slice(0,3)} catUrl="/search" />
      </> :
      <Spinner />
    }
    </>
  )
}

export default Home
