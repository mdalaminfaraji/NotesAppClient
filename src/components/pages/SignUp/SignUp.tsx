
import { useForm, Resolver } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

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
    const {user,createUser, updateUserProfile}=useAuth();
  const { register, handleSubmit, formState: { errors } , reset} = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    const {Name, email, password}=data;
    console.log(data)
    createUser(email, password)
    .then((result:any)=>{
        const loggedUser=result.user;
        console.log(loggedUser);
        updateUserProfile(Name)
        .then((data:any)=>{
            console.log(data);
        })
    })
   reset();
});
console.log(user);
  return (
    <div className='bg-[#193D3D]  h-screen px-2 pt-20'>
        <h1 className='text-center text-white pb-5 text-3xl font-semibold'>Welcome to our SignUp page</h1>
        <h2 className='text-center text-white pb-5 text-3xl font-semibold'>{user.displayName}</h2>
   <form onSubmit={onSubmit} >
   <div className='text-center py-5 text-[#DDDDDD] border  md:w-1/3  mx-auto shadow-lg rounded-md '>
   <div className='px-10'>
            <label className='block text-start text-xl'>Name</label>
             <input className='block w-full p-1 text-black rounded-md' {...register("Name")} placeholder="Please Enter your Name" />
            {errors?.Name && <p>{errors.Name.message}</p>}
        </div>
     
      <div className='px-10'>
        <label className='block text-start text-xl'>Password</label>
        <input className='block w-full p-1 text-black rounded-md' {...register("password")} placeholder="Please Enter your Password" />
      </div>
      <div className='px-10'>
        <label className='block text-start text-xl'>Email</label>
        <input className='block w-full p-1 text-black rounded-md' type="email" {...register("email")} placeholder='please Enter your Email'/>
      </div>
      <input type="submit" className='btn btn-sm btn-success my-3'/>
   </div>
      
      
     
    </form>

    </div>
 
  );
}
