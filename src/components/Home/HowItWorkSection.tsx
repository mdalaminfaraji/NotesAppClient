// HowItWorksSection.tsx
import './Home.css'
import 'react-modal-video/css/modal-video.min.css';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import thumbanil from '../../assets/vidoThumbanil.png'
const HowItWorksSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };

  return (
    <section className="how-it-works-section py-8 bg-color">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">How Note App Works</h2>
        <div className="divider text-white text-4xl font-bold">--------</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            {/* Video thumbnail or play button */}
            <div className="relative w-full px-5" onClick={handleVideoOpen}>
              <img
                src={thumbanil} 
                alt="Video Thumbnail"
                className="w-full rounded-2xl shadow-lg cursor-pointer"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
                </svg>
              </div>
            </div>
            
          </div>
          <div className=' p-5 text-justify'>
             <p className='text-3xl'> Follow some steps</p>
            <p className="text-xl mt-4">Step 1: Sign up or log in to your account.</p>
            <p className="text-xl mt-4">Step 2: Create a new note by clicking on the "Add Note" button.</p>
            <p className="text-xl mt-4">Step 3: After that then show allNotes section all recorded note</p>
            <p className="text-xl mt-4">Step 4: Letter One You can update your Note</p>
            <p className="text-xl mt-4">Step 5: After that if you want you can delete note </p>
            <p></p>
          </div>
         
        </div>
      </div>

      {/* Video Modal */}
      <ModalVideo
        channel='youtube'
        isOpen={isVideoOpen}
        videoId="GqpaS5xYgpY"  // Replace with your actual online video link
        onClose={handleVideoClose}
      />
    </section>
  );
};

export default HowItWorksSection;
