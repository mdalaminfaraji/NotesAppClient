import './Home.css'
import logo1 from '../../../public/logoNotes.png'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { MapPinIcon } from '@heroicons/react/24/solid';


const Footer:React.FC = () => {
   
    return (
      <>
      <div className=' pt-10 grid grid-cols-1 md:grid-cols-2 bg-color ' >
                 
  <div className=' w-[49%] mx-auto'>
    <img className='w-14 h-14 rounded-full'  src={logo1}/>
    <p style={{fontFamily:'Rencho', fontSize:'40px',}}>Notes</p>
    <p style={{fontFamily:'Raleway'}} className='text-[18px] text-justify'>Always ready to be your friend. Come & Contact with us to share your memorable moments, to share  with your best companion.</p>
    <p className='inline-flex text-xl'>
        <FaFacebook className='m-1'></FaFacebook>
        <FaTwitter className='m-1'></FaTwitter>
        <FaInstagram className='m-1'></FaInstagram>
        <FaLinkedin className='m-1'></FaLinkedin>
    </p>
    <h1 style={{fontFamily:'Rencho', fontSize:'30px'}}>Get in Touch</h1>
    <p className='inline-flex items-center'><FaPhone className='mr-2'></FaPhone> +8801957246375</p><br/>
    <p className='inline-flex items-center'><FaEnvelope  className='mr-2'></FaEnvelope>alaminice@gmail.com</p><br/>
    <p className='inline-flex  items-center'><MapPinIcon className='w-6 h-8 mr-2'></MapPinIcon>65, Mohamad ali road , kushtia</p>
  </div> 
  <div>
   
    <div className=" w-[49%] mx-auto">
     <h1 className='' style={{fontFamily:'Rencho', fontSize:'35px'}}>Connect with us</h1>
     <form className='border p-3 rounded-lg'>
        <label></label>
        <input type="text" placeholder='Enter your Name' name="name" id="" className='text-black w-full p-3 border-2 mt-2 border-slate-500 rounded-lg' /><br/>
        <input type="email" placeholder='Enter your Email' name="email" id="" className='text-black p-3 w-full border-2 mt-2 border-slate-500 rounded-lg'/><br/>
        <textarea name="textarea" id="" cols={30} rows={5} placeholder='textarea.....' className='p-3 w-full mt-2 border-2 border-slate-500 rounded-lg text-black'></textarea>
        <input type="submit" value="Send Message" className='btn-primary btn-sm block mx-auto btn'/>
     </form>
    </div>
  </div>
        </div>
      
      <h1 className='text-center bg-color py-5'>@Don't Copy Right</h1>
      </>
        
  

    );
};

export default Footer;