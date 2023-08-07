import { Player } from '@lottiefiles/react-lottie-player';

import './Home.css';

import Banner from './Banner';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import HowItWorksSection from './HowItWorkSection';
import { Helmet } from 'react-helmet-async';
import Testimonial from './Testimonial';
const Home:React.FC = () => {

    return (
        <div className='bg-color'>
             <Helmet>
               <title>Notes | Home</title>
       
             </Helmet>
            <Banner></Banner>

           <div className='bg-color h-screen pt-5 text-white'>
            <h1 style={{fontFamily:'Rencho'}}  className='text-center p-2 hidden md:flex md:text-4xl items-center justify-center '>The journey of a thousand notes begins with a single thought.</h1>
            <p style={{fontFamily:'Rencho'}} className='text-center p-3 text-3xl '>Organize your mind, organize your life.</p>
           
            <div className='rounded-lg'>
             <Player
            src='https://lottie.host/b6431916-5ff2-4f83-b7f8-ea1968f73a0f/apkp7EYVeT.json'
            className="player rounded-2xl " 
            loop 
            autoplay
            style={{ height: '400px', width: '400px' }}
            speed={.5}
            />
            </div>
            <FeaturesSection></FeaturesSection> 
            <HowItWorksSection></HowItWorksSection>
            <Testimonial></Testimonial>
            <Footer></Footer>
        </div> 
          
        </div>
       
    );
};

export default Home;