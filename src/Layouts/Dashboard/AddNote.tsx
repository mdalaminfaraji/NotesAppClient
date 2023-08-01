

import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';

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
  ];
  type FormValues = {
    title: string;
    content: string;
    category: string;
    photoLink?: string;
  };

const AddNote = () => {
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
      console.log(formData);
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/create-form', formData);
          console.log('Form submitted successfully!', response.data);
        } catch (error) {
          console.error('Error submitting the form:', error);
        }
      };

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>Add your Notes</h1>
            <div className="divider">_</div>
         <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div className='border-4 ps-4 pt-2 '>
            <form onSubmit={handleSubmit}>
      <div>
        <label className='text-xl block font-semibold ms-2'>Note Title</label>
        <input type="text" className='p-2 m-1 text-black border-2 w-3/4 rounded-lg' placeholder='Enter your Note title' name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Content:</label>
        <textarea placeholder='Enter your Content ' className='border-2 w-3/4 rounded-lg text-black p-2 m-1' rows={5} cols={40} name="content" value={formData.content} onChange={handleChange} required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Category:</label>
        <select className='text-xl font-semibold ms-2 border-2 rounded-md p-1' name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Photo Link (optional):</label>
        <input className='p-2 m-1 text-black border-2 w-3/4 rounded-lg' type="text" name="photoLink" value={formData.photoLink} onChange={handleChange} />
      </div>

      <button className='btn btn-sm btn-info text-center my-1 ' type="submit">Submit</button>
    </form>
            </div>
            <div>
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