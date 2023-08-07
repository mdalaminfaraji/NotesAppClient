import React from 'react';
import image from '../../assets/notesbanner7.webp';
import men1 from '../../assets/men1 (1).png';
import men2 from '../../assets/men2 (1).png';
import men3 from '../../assets/men3 (1).png';
import men4 from '../../assets/men4 (1).png';
import './Home.css'
const Testimonial:React.FC = () => {
    return (
        <div className='bg-color overflow-hidden'>
        <h1 className='text-center  text-5xl font-semibold '>What They Say</h1>
        <h2 className='text-center text-2xl p-2'>USERS TESTIMONIALS</h2>
 <div   className="carousel w-1/2  h-80  my-5">
  <div id="slide1" className="carousel-item relative w-full ">
    <img src={image} className="w-full rounded-lg  opacity-50" />
    
    <div className="absolute p-1 rounded-xl flex items-center h-full left-0 right-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        <div className='text-white space-y-4  w-3/4 pl-12'>
            <img src={men1} className='w-full rounded-full' style={{width:'80px' }}/>
          <h2 className=''>Md. Ismail sheikh</h2>
          <p>The Users Service at this Notes App is exceptional . They Went above and beyond to help me find the perfect Notes. appreciate the focus on sustainable and eco-friendly Users .It's so important for our Life.</p>
        </div>
        </div>
      
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide4" className="btn btn-circle mr-5">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={image} className="w-full rounded-lg  opacity-50" />
    
    <div className="absolute rounded-xl flex items-center h-full left-0 right-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        <div className='text-white space-y-4  w-3/4 pl-12'>
        <img src={men2} className='w-20 rounded-full' style={{width:'80px' }}/>
          <h2 className=''>Md. Ahmadullah</h2>
          <p>The Users Service at this Notes App is exceptional . They Went above and beyond to help me find the perfect Notes. appreciate the focus on sustainable and eco-friendly Users .It's so important for our Life</p>
        </div>
        </div>
      
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide1" className="btn btn-circle mr-5">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={image} className=" w-full rounded-lg  opacity-50" />
    
    <div className="absolute rounded-xl flex items-center h-full left-0 right-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        <div className='text-white space-y-4  w-3/4 pl-12'>
        <img src={men3} className=' rounded-full ' style={{width:'80px' }}/>
          <h2 className=''>Md. Rohman Mulla </h2>
          <p>The Users Service at this Notes App is exceptional . They Went above and beyond to help me find the perfect Notes. appreciate the focus on sustainable and eco-friendly Users .It's so important for our Life</p>
        </div>
        </div>
      
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide2" className="btn btn-circle mr-5">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src={image} className="w-full rounded-lg  opacity-50" />
    
    <div className="absolute rounded-xl flex items-center h-full left-0 right-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        <div className='text-white space-y-4  w-3/4 pl-12'>
        <img src={men4} className='w-20 rounded-full' style={{width:'80px' }}/>
          <h2 className=''>MD. Shoib Molla</h2>
          <p>The Users Service at this Notes App is exceptional . They Went above and beyond to help me find the perfect Notes. appreciate the focus on sustainable and eco-friendly Users .It's so important for our Life</p>
         
        </div>
        </div>
      
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide3" className="btn btn-circle mr-5">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 

</div>
        </div>
    );
};

export default Testimonial;