
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/notesbanner1.png'
import img2 from '../../assets/notesbanner2.png'
import img3 from '../../assets/notesbanner3.png'
import img4 from '../../assets/notesbanner4.png'
import React from "react";
const Banner:React.FC = () => {
    return (
        <Carousel 
        showStatus={false}
        showThumbs={false}
      centerMode={true} // Enable center mode
      centerSlidePercentage={100} // Adjust the center slide size (percentage of the container)
      infiniteLoop={true} // Loop through slides infinitely
      autoPlay={true} // Enable auto play
      interval={4000} 
        >
                <div className="carousel-item" >
                    <img src={img3}/>
                    
                </div>
                <div className="carousel-item">
                    <img src={img2} />
                   
                </div>
                <div  className="carousel-item">
                    <img src={img1} />
                   
                </div>
                <div className="carousel-item">
                    <img src={img4} />
                   
                </div>
           
            </Carousel>
    );
};

export default Banner;