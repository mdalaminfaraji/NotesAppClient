import  {  useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';

import {  FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';


const SignIn = () => {
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');
    const {signIn, googleSignIn}=useAuth();
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const location=useLocation();
    // const from=location.state?.from?.pathname|| '/';

    const handleLogin=(event:any)=>{
          event.preventDefault();
          setError('');
          setSuccess('');
          const form=event.target;
          const email=form.email.value;
          const password=form.password.value;
          console.log(email, password);
          if(password.length<6){
            setError('Please Enter valid password and Email');
            return;
          }

          signIn(email, password)
          .then((result:any)=>{
            const loggedUser=result.user;
            navigate('/dashboard/addNote');
            console.log(loggedUser);
            setSuccess('User login successful');
            setError('');
            form.reset();

          })
          .catch((error:any)=>{
            setError(error.message);
          })
    }

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then((result:any)=>{
            const loggedUser=result.user;
            navigate('/dashboard/addNote');
            console.log(loggedUser);
        })
        .catch((error:any)=>{
            console.log(error);
        })
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div className='bg-[#193D3D] h-screen'>
             <Helmet>
               <title>Notes | SignIn</title>
       
             </Helmet>
         <div className="text-center  pt-5 pb-4">
            <h1 className="text-5xl font-bold text-[#DDDDDD]">Please SignIn now!</h1>
            <p className='text-red-500 text-center font-bold text-xl'>{error}</p>
             <p className='text-blue-500 text-center font-bold text-xl'>{success}</p>
          </div>
        
        <div className='bg-[#193D3D] '>
             <div className="mx-auto w-1/2 ">
           
        <div className="hero-content flex-col ">
          
          <div className="card flex-shrink-0 max-w-sm w-full border shadow-2xl bg-[#193D3D] ">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text  text-[#DDDDDD] text-2xl">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input  input-bordered" required/>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text  text-[#DDDDDD] text-2xl">Password</span>
                </label>
                <input type={showPassword ? 'text' : 'password'}  placeholder="password" name='password' className="input input-bordered" required/>
                <p  className=' absolute text-black cursor-pointer right-5 top-16' onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              )}
            </p>
              </div>
              <div className="form-control mt-5">
                <button className="btn btn-primary ">Login</button>
              </div>
            </form>
            <div className="text-center text-white">----OR----</div>
            <div className='mx-auto '>
            <button onClick={handleGoogleSignIn} className="btn btn-primary  md:px-20  inline-flex items-center ">
            <FaGoogle className='text-black md:text-2xl   md:mr-2'></FaGoogle> Google signIn </button>
            </div>
           
            <p className='my-3 '>
            <Link to="/signup" className="label-text-alt text-center block link link-hover text-[#DDDDDD]">
            Don't have an account? <span className='text-red-500'>Please SignUp</span>
            </Link>
            
            </p>
            
          </div>
          <div>
          
          </div>

        </div>
        </div>
        </div>
        </div>
       
    );
};

export default SignIn;