import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Carousel.css';
import { caroData } from '../Helpers/CarouselData';

const Carousel = () => {
    const [currCaroEle, setcurrCaroEle] = useState(0);
    //const caroAnim = () => { 
    //    (currCaroEle < caroData.length - 1) ? setcurrCaroEle(currCaroEle + 1) : setcurrCaroEle(0); 
    //};
    //var caroTimer = setInterval(caroAnim, 5000); // start timer
    return (
        <div className="carousel">
            <button className="caro-left-btn" 
                onClick={() => { 
                    //clearInterval(caroTimer);
                    (currCaroEle > 0) ? setcurrCaroEle(currCaroEle - 1) : setcurrCaroEle(caroData.length - 1); 
                    //setTimeout(() => { caroTimer = setInterval(caroAnim, 5000); }, 10000); // restart timer
                }}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <div className="carotrackcontainer">
                <div className="carotrack" style={{ left: `${currCaroEle*-100}%` }}>
                    {
                        caroData.map((data, index) => {
                            return(
                                <div className="carocard" 
                                    style={{  
                                        backgroundImage: `radial-gradient(${data.color_light}, ${data.color_dark})`,
                                        top: `0`, 
                                        left: `${index*100}%` }} key={index}>
                                    <img src={data.img} style={{ order: (index%2===0) ? 2 : 0 }} alt="caroimage" />
                                    <div className="carodesc">
                                        <p>{data.desc}</p>
                                        <Link to={data.link} style={{
                                            border: `${data.btn_color}`,
                                            backgroundColor: `${data.btn_color}`
                                        }}>Shop Now</Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <button className="caro-right-btn" 
                onClick={() => { 
                    //clearInterval(caroTimer);
                    (currCaroEle < caroData.length - 1) ? setcurrCaroEle(currCaroEle + 1) : setcurrCaroEle(0);
                    //setTimeout(() => { caroTimer = setInterval(caroAnim, 5000); }, 10000); // restart timer
                }}>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    )
};

export default Carousel;
