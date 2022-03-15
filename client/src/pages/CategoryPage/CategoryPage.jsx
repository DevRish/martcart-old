import ProductDeck from '../../components/ProductDeck/ProductDeck';
import { FootwearData } from '../../helpers/FootwearData';
import { FashionData } from '../../helpers/FashionData';
import { WinterwearData } from '../../helpers/WinterwearData';
import { ElectronicsData } from '../../helpers/ElectronicsData';
import './CategoryPage.css';

const CategoryPage = ({ category }) => {
    window.scroll({top: 0});
    var categoryData = [];
    var emoji = '';
    switch(category)
    {
        case "footwear": categoryData = FootwearData; emoji = '👟'; break;
        case "fashion": categoryData = FashionData; emoji = '👕'; break;
        case "winterwear": categoryData = WinterwearData; emoji = '❄️'; break;
        case "electronics": categoryData = ElectronicsData; emoji = '⚡'; break;
        default: break;
    }
    return (
        <div className="container">
            <h1 className='mainHeading'> {emoji} LATEST IN {category.toUpperCase()} {emoji} </h1>
            <ProductDeck categoryData={categoryData} />
        </div>
    )
}

export default CategoryPage;
