import  {  useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {  FaGoogle } from "react-icons/fa";
import useAuth from '../../../Hooks/useAuth';


const SignIn = () => {
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');
    const {signIn, googleSignIn}=useAuth();
    const navigate=useNavigate();
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
            navigate('/dashboard');
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
            navigate('/dashboard');
            console.log(loggedUser);
        })
        .catch((error:any)=>{
            console.log(error);
        })
    }

    return (
        <div className='bg-[#193D3D] h-screen'>
         <div className="text-center    pt-12 pb-4">
            <h1 className="text-5xl font-bold text-[#DDDDDD]">Please Login now!</h1>
            <p className='text-red-500 text-center font-bold text-xl'>{error}</p>
             <p className='text-blue-500 text-center font-bold text-xl'>{success}</p>
          </div>
        
        <div className='bg-[#193D3D] '>
             <div className="mx-auto w-1/2 ">
           
        <div className="hero-content flex-col grid grid-cols-1 md:grid-cols-2">
          
          <div className="card flex-shrink-0 max-w-sm w-full border pb-10  shadow-2xl bg-[#193D3D] ">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#DDDDDD] text-2xl">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#DDDDDD] text-2xl">Password</span>
                </label>
                <input type="password" placeholder="password" name='password' className="input input-bordered" required/>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='mb-4 ml-6'>
            <Link to="/signup" className="label-text-alt link link-hover text-[#DDDDDD]">
            Don't have an account? <span className='text-red-500'>Please SignUp</span>
            </Link>
            </p>
            
          </div>
          <div>
          <div>
            <button onClick={handleGoogleSignIn} className="btn btn-active btn-primary">
             <p className='inline-flex items-center'><FaGoogle className='text-black text-2xl mr-2'></FaGoogle> Google signIn</p>  </button>
            </div>
          </div>

        </div>
        </div>
        </div>
        </div>
       
    );
};

export default SignIn;