import {Link} from 'react-router-dom'
const Header = () => {

    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">Notes</Link>
        </div>
        <div className="flex-none  gap-2">
            <Link to='/dashboard/managenote' className='btn'>Add Notes</Link>
            <Link to='/dashboard/managenote' className='btn'>Manage Notes</Link>
          <div className="form-control ">
            <input type="text" placeholder="Search" className="input ps-5 hidden md:flex input-bordered w-24 md:w-96 " />
          </div>
          <div>
            <button className='btn'>LogOut</button>
           </div> 
        </div>
       
      </div>
    );
};

export default Header;