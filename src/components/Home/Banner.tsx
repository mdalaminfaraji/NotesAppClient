
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/notesbanner1.png'
import img2 from '../../assets/notesbanner2.png'
import img3 from '../../assets/notesbanner3.png'
import img4 from '../../assets/notesbanner4.png'
import React from "react";
const Banner:React.FC = () => {
    return (
        <Carousel className="text-center">
                <div>
                    <img src={img3} />
                    
                </div>
                <div>
                    <img src={img2} />
                   
                </div>
                <div>
                    <img src={img1} />
                   
                </div>
                <div>
                    <img src={img4} />
                   
                </div>
           
            </Carousel>
    );
};

export default Banner;