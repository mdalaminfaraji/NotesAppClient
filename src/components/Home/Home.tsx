import { Player } from '@lottiefiles/react-lottie-player';
import {Link} from 'react-router-dom';
import './Home.css';
const Home = () => {
    return (
        <div className='bg-color h-screen text-white'>
            <h1 className='text-center p-2 text-4xl'>The journey of a thousand notes begins with a single thought.</h1>
            <p className='text-center p-3 text-3xl'>Organize your mind, organize your life.</p>
            <div className='rounded-lg'>
             <Player
            src='https://lottie.host/b6431916-5ff2-4f83-b7f8-ea1968f73a0f/apkp7EYVeT.json'
            className="player rounded-2xl " 
            loop 
            autoplay
            style={{ height: '400px', width: '400px' }}
            speed={1}
            />
            </div>
            <div className=' text-center mt-5'>
                <Link to='/signup' className='btn  btn-danger'>Please Register </Link>
            </div>
        </div>
    );
};

export default Home;