import {Link,NavLink, useNavigate} from 'react-router-dom'
import useAuth from '../../Hooks/useAuth';
const Header = () => {
    const navigate=useNavigate()
   const {logOut}=useAuth();
   const handleLogOut=()=>{
    logOut();
      navigate('/');
   }
    return (
        <div className="navbar px-8 bg-[#1D2A35] text-white">
        <div className="flex-1">
          {/* <Link to="/" className="btn btn-outline text-white btn-sm mr-1 normal-case text-xl">Notes</Link> */}
          <Link to="/" className="btn btn-outline text-white btn-xs normal-case ">Home</Link>
        </div>
        <div className="flex-none  gap-2">
     

        
            <NavLink
                to='/dashboard/addNote'
                aria-label='AddNote'
                title='AddNote'
                className={({ isActive }) => (isActive ? 'active btn btn-outline   btn-xs' : 'default btn  btn-outline btn-xs text-white')}
              >
                AddNote
              </NavLink>
            <NavLink
                to='/dashboard/Search'
                aria-label='AllNotes'
                title='AllNotes'
                className={({ isActive }) => (isActive ? 'active btn btn-outline btn-xs ' : 'default btn btn-xs  md:flex btn-outline  text-white')}
              >
                AllNotes
              </NavLink>
            {/* <Link to='/dashboard/allNotes' className='btn btn-sm btn-info'>All Notes</Link> */}
          <div className="form-control ">
            <input type="text" placeholder="Search" className="input ps-5 hidden  input-bordered w-24 md:w-96 " />
          </div>
          <div>
            <button onClick={handleLogOut} className='btn btn-xs '>LogOut</button>
           </div> 
        </div>
       
      </div>
    );
};

export default Header;