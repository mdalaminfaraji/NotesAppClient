import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../../Hooks/useAuth';
const Header = () => {
    const navigate=useNavigate()
   const {logOut}=useAuth();
   const handleLogOut=()=>{
    logOut();
      navigate('/');
   }
    return (
        <div className="navbar bg-[#1D2A35] text-white">
        <div className="flex-1">
          {/* <Link to="/" className="btn btn-outline text-white btn-sm mr-1 normal-case text-xl">Notes</Link> */}
          <Link to="/" className="btn btn-outline text-white btn-sm normal-case text-xl">Home</Link>
        </div>
        <div className="flex-none  gap-2">
     
            <Link to='/dashboard' className='btn btn-outline btn-sm text-white'>dashboard</Link>
            <Link to='/dashboard/addNote' className='btn btn-outline btn-sm text-white'>Add Notes</Link>
            <Link to='/dashboard/Search' className='btn btn-outline btn-sm text-white'>Search Notes</Link>
            
            <Link to='/dashboard/allNotes' className='btn btn-sm btn-info'>All Notes</Link>
          <div className="form-control ">
            <input type="text" placeholder="Search" className="input ps-5 hidden  input-bordered w-24 md:w-96 " />
          </div>
          <div>
            <button onClick={handleLogOut} className='btn btn-sm'>LogOut</button>
           </div> 
        </div>
       
      </div>
    );
};

export default Header;