import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../../Hooks/useAuth';
const Header = () => {
    const navigate=useNavigate()
   const {logOut}=useAuth();
   const handleLogOut=()=>{
    logOut();
      navigate('/signin');
   }
    return (
        <div className="navbar bg-[#1D2A35] text-white">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">Notes</Link>
        </div>
        <div className="flex-none  gap-2">
            <Link to='/dashboard/addNote' className='btn btn-outline text-white'>Add Notes</Link>
            
            <Link to='/dashboard/allNotes' className='btn btn-info'>All Notes</Link>
          <div className="form-control ">
            <input type="text" placeholder="Search" className="input ps-5 hidden  input-bordered w-24 md:w-96 " />
          </div>
          <div>
            <button onClick={handleLogOut} className='btn'>LogOut</button>
           </div> 
        </div>
       
      </div>
    );
};

export default Header;