
import { useForm, Resolver } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, } from 'react-icons/fa';
type FormValues = {
 Name: string;
  email: string;
  password: any;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.Name ? values : {},
    errors: !values.Name
      ? {
         Name: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};


  const SignUp=()=> {
    const [length, setLength]=useState('')
    const {user,createUser, updateUserProfile,  googleSignIn}=useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate=useNavigate();
   const [axiosSecure]=useAxiosSecure();
   
  

  const { register, handleSubmit, formState: { errors } , reset} = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    const {Name, email, password}=data;
    console.log(data)
    if(password.length<6){
        setLength('Enter at least 6 digit password');
        return;
    }
    createUser(email, password)
    .then((result:any)=>{
        const loggedUser=result.user;
        console.log(loggedUser);
        setLength('');
        updateUserProfile(Name)
        .then(()=>{
            const SaveUserOnDatabase={Name, email, password};
            axiosSecure.post('/users',SaveUserOnDatabase)
            .then((data:any)=>{
                console.log('database', data);
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User created successfully',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard');
                }
            })
        })
    })
    .catch((error:any)=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Already exist please signIn',
            footer: `${error.message}`
          })
      })
   reset();
});

const handleGoogleSignIn=()=>{
    googleSignIn()
    .then((result:any)=>{
        const loggedUser=result.user;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User created successfully',
            showConfirmButton: false,
            timer: 1500
          });
        navigate('/dashboard');
        console.log(loggedUser);
    })
    .catch((error:any)=>{
        console.log(error);
    })
}
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
// console.log(user);
  return (
    <div className='bg-[#193D3D]  h-screen px-2 pt-5'>
         <Helmet>
               <title>Notes |SignUp</title>
       
             </Helmet>
        <h1 className='text-center text-white  text-3xl font-semibold'>Welcome to our SignUp page</h1>
        <h1 className='text-center pb-5 text-xl text-red-500 font-semibold'>{length}</h1>

        <h2 className='text-center text-white pb-5 text-3xl font-semibold'>{user?.displayName}</h2>
   <form onSubmit={onSubmit} >
   <div className='text-center py-5 text-[#DDDDDD] border  md:w-1/4  mx-auto shadow-lg rounded-md '>
   <div className='px-10'>
            <label className='block text-start text-xl'>Name</label>
             <input className='block w-full p-2 text-black rounded-md' {...register("Name")} placeholder="Please Enter your Name" />
            {errors?.Name && <p>{errors.Name.message}</p>}
        </div>
      <div className='px-10'>
        <label className='block text-start text-xl'>Email</label>
        <input className='block w-full p-2 text-black rounded-md' type="email" {...register("email")} placeholder='please Enter your Email'/>
      </div>
     
      <div className='px-10 form-group relative'>
        <label className='block text-start text-xl'>Password</label>
       <div>
       <input  type={showPassword ? 'text' : 'password'} className=' w-full p-2 text-black rounded-md' {...register("password", {required:true})} placeholder="Please Enter your Password" />
        <p  className=' absolute text-black cursor-pointer right-12 top-10' onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              )}
            </p>
       </div>
      </div>
     
      <div className='px-10'>
      <input type="submit" value='SignUp' className='btn  w-full  btn-success my-3'/>
      </div>
      <div className="text-center text-white">----OR----</div>
            <div className='mx-auto '>
            <button onClick={handleGoogleSignIn} className="btn btn-primary  px-12  inline-flex items-center ">
            <FaGoogle className='text-black md:text-2xl   md:mr-2'></FaGoogle> Google signIn </button>
            </div>
      <p>Already have an account? <span className='text-red-400'><Link to='/signin'>Please SignIn</Link></span></p>
   </div>
      
      
     
    </form>

    </div>
 
  );
}
export default SignUp