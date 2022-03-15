import Carousel from './../../components/Carousel/Carousel'
import Collection from './../../components/Collection/Collection'
import {FootwearData} from './../../helpers/FootwearData'
import {FashionData} from './../../helpers/FashionData'
import {ElectronicsData} from './../../helpers/ElectronicsData'
import {WinterwearData} from './../../helpers/WinterwearData'

const Home = () => {
  return (
    <>
        <Carousel />
        <Collection category="Footwear" catData={FootwearData.slice(0,3)} catUrl="/footwear" />
        <Collection category="Fashion" catData={FashionData.slice(0,3)} catUrl="/fashion" />
        <Collection category="Winterwear" catData={WinterwearData.slice(0,3)} catUrl="/winterwear" />
        <Collection category="Electronics" catData={ElectronicsData.slice(0,3)} catUrl="/electronics" />
    </>
  )
}

export default Home