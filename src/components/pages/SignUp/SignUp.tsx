
import { useForm, Resolver } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
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


export default function SignUp() {
    const [length, setLength]=useState('')
    const {user,createUser, updateUserProfile}=useAuth();
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
// console.log(user);
  return (
    <div className='bg-[#193D3D]  h-screen px-2 pt-20'>
         <Helmet>
               <title>Notes |SignUp</title>
       
             </Helmet>
        <h1 className='text-center text-white pb-5 text-3xl font-semibold'>Welcome to our SignUp page</h1>
        <h1 className='text-center pb-5 text-xl text-red-500 font-semibold'>{length}</h1>

        <h2 className='text-center text-white pb-5 text-3xl font-semibold'>{user?.displayName}</h2>
   <form onSubmit={onSubmit} >
   <div className='text-center py-5 text-[#DDDDDD] border  md:w-1/3  mx-auto shadow-lg rounded-md '>
   <div className='px-10'>
            <label className='block text-start text-xl'>Name</label>
             <input className='block w-full p-1 text-black rounded-md' {...register("Name")} placeholder="Please Enter your Name" />
            {errors?.Name && <p>{errors.Name.message}</p>}
        </div>
     
      <div className='px-10'>
        <label className='block text-start text-xl'>Password</label>
        <input type='password' className='block w-full p-1 text-black rounded-md' {...register("password")} placeholder="Please Enter your Password" />
      </div>
      <div className='px-10'>
        <label className='block text-start text-xl'>Email</label>
        <input className='block w-full p-1 text-black rounded-md' type="email" {...register("email")} placeholder='please Enter your Email'/>
      </div>
      <input type="submit" className='btn btn-sm btn-success my-3'/>
      <p>Already have an account? <span className='text-red-400'><Link to='/signin'>Please Login</Link></span></p>
   </div>
      
      
     
    </form>

    </div>
 
  );
}
