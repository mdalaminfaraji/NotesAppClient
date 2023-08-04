 import { Helmet } from 'react-helmet-async';
import '../Home/Home.css';
 import { Player } from '@lottiefiles/react-lottie-player';
const Feature = () => {
    return (
        <div className="bg-color h-screen text-[#DDDDDD]">
             <Helmet>
               <title>Notes | Feature</title>
       
             </Helmet>
        <h2 className="text-3xl font-bold py-5 text-center">Features of Our App</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
            <div className='border mx-5 text-justify p-5'>
            <p className='text-2xl'>
        Our app comes with a variety of features to make your note organization a breeze. Here are some key highlights:
      </p>
      <ul className="list-disc ml-6 text-lg">
        <li>
          <strong>User Authentication:</strong> Securely sign up and log in to access your notes using Firebase authentication.
        </li>
        <li>
          <strong>Create, Edit, and Delete Notes:</strong> Easily create new notes, edit existing ones, and delete notes when needed.
        </li>
        <li>
          <strong>Note Categorization:</strong> Organize your notes into categories for better management and easy retrieval.
        </li>
        <li>
          <strong>Cloud Storage:</strong> Store your notes securely in Firebase Cloud Firestore for easy access across devices.
        </li>
        <li>
          <strong>Photo Attachments:</strong> Attach images or photos to your notes for enhanced content visualization.
        </li>
       
      </ul>
            </div>
            <div className='bg-color'>

            <Player
         src='https://lottie.host/0bee4e94-e29e-4f0e-8605-8e5871fce399/2ACU5Ptob7.json'
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

export default Feature;