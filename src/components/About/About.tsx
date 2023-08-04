import { Helmet } from 'react-helmet-async';
import './About.css'
import { Player } from '@lottiefiles/react-lottie-player';
const About = () => {
  return (
    <div className="h-screen text-[#DDDDDD] mx-auto bg-color">
         <Helmet>
               <title>Notes | About</title>
       
         </Helmet>
      <h2 className="text-3xl font-bold mb-3 py-4 text-center">About Our Note Organization App</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
     <div className='border mx-5 p-5 rounded-md shadow'>
     <p className='text-xl text-justify'>
        Welcome to our note organization app! This app is designed to help you keep your notes organized and easily accessible.
        Whether you need to jot down quick ideas, create to-do lists, or save important information, our app has got you covered.
      </p>
      <p className='text-3xl py-3'>
        Features of our app include:
      </p>
      <ul className="list-disc ml-6">
        <li>Creating, editing, and deleting notes.</li>
        <li>Assigning categories to your notes for easy filtering.</li>
        <li>Attaching photos to your notes for better visualization.</li>
        <li>Secure user authentication to protect your notes.</li>
      </ul>
      <p>
        We hope you find our app useful in organizing your thoughts and tasks. If you have any feedback or suggestions, feel free to contact us.
      </p>
     </div>
     <div className='bg-color'>
     <Player
         src='https://lottie.host/27f1cc4d-4190-44cd-a3d4-67e460bd9d12/tH1Y2Tq7kj.json'
         className="player" 
         loop 
         autoplay
         style={{ height: '400px', width: '400px' }}
         speed={1}
        />
     </div>
     </div>
    </div>
  );
};

export default About;
