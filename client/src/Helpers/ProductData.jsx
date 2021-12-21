import { FootwearData } from "./FootwearData";
import { FashionData } from "./FashionData";
import { WinterwearData } from "./WinterwearData";
import { ElectronicsData } from "./ElectronicsData";

export const ProductData = FootwearData.concat(FashionData, WinterwearData, ElectronicsData);