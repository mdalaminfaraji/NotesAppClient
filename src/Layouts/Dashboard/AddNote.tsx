
import './Notes.css';
import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import {useNavigate} from 'react-router-dom'
const categories = [
    'Personal',
    'Work',
    'Study',
    'Shopping',
    'Travel',
    'Health',
    'Recipes',
    'Ideas',
    'Finance',
    'Quotes',
    'Others'
  ];
  type FormValues = {
    title: string;
    content: string;
    category: string;
    photoLink?: string;
  };

const AddNote = () => {
    const navigate=useNavigate();
    const [axiosSecure]=useAxiosSecure();
    const {user}=useAuth();
    const [formData, setFormData] = useState<FormValues>({
        title: '',
        content: '',
        category: '',
        photoLink: '',
        
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
     const {title, content, category, photoLink}=formData;
     const AddNote={
        title, content, category, photoLink, email:user?.email
     }
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await axiosSecure.post('/addNote', AddNote);
          console.log('Form submitted successfully!', response.data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Added successfully`,
            showConfirmButton: false,
            timer: 1500
           })
           resetFormData();
           navigate('/dashboard/search');

        } catch (error) {
          console.error('Error submitting the form:', error);
        }
      };
      const resetFormData = () => {
        setFormData({
          title: '',
          content: '',
          category: '',
          photoLink: '',
        });
      };

    return (
        <div className='bg-color h-screen text-white'>
             <Helmet>
               <title>Notes | AddNote</title>
       
             </Helmet>
            <h1 className='text-center text-3xl font-bold py-5'>Add your Notes</h1>
           
         <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='border-2 rounded-lg ps-8 py-4 mx-5  mb-0 md:mb-4 '>
            <form onSubmit={handleSubmit}>
      <div>
        <label className='text-xl block font-semibold ms-2'>Note Title</label>
        <input type="text" className='p-2 m-1 text-black border-2 w-11/12 rounded-lg' placeholder='Enter your Note title' name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Content:</label>
        <textarea placeholder='Enter your Content ' className='border-2 w-11/12 rounded-lg text-black p-2 m-1' rows={5} cols={40} name="content" value={formData.content} onChange={handleChange} required />
      </div>

      <div>
        <label className='text-xl block font-semibold pb-2 ms-2'>Category:</label>
        <select className='text-xl text-black font-semibold ms-2 border-2 rounded-md p-1 w-11/12' name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='text-xl block font-semibold py-1 ms-2'>Photo Link (optional):</label>
        <input placeholder='Enter photoUrl' className='p-2 w-11/12 m-1 text-black border-2 rounded-lg' type="text" name="photoLink" value={formData.photoLink} onChange={handleChange} />
      </div>

      <button className='btn btn-sm btn-info  my-1  block mx-auto ' type="submit">Submit</button>
    </form>
            </div>
            <div className='bg-color'>
            <Player
         src='https://lottie.host/3cf157d2-202d-4b7b-9280-3468ebc1a367/RxNU2eYvE2.json'
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

export default AddNote;