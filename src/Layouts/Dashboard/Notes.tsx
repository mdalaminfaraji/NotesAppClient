import { FaPlus } from "react-icons/fa";
import {Link} from "react-router-dom"
import './Notes.css'
import { Player } from '@lottiefiles/react-lottie-player';
import useAuth from "../../Hooks/useAuth";
const Notes = () => {
    const {user}=useAuth();
    return (
        <div className="bg-color text-white py-3 h-screen ">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl ps-10">Hey, {user?.displayName}</h1>
                <p className="pr-5">
                    <Link to='/dashboard/addNote' className="inline-flex items-center btn btn-sm btn-success"><FaPlus></FaPlus> New Note</Link>
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <div className=" ">
            <Player
         src='https://assets1.lottiefiles.com/packages/lf20_myejiggj.json'
         className="player" 
         loop 
         autoplay
         style={{ height: '500px', width: '400px' }}
         speed={1}
        />

         </div>
         <div>
            <h1 className="text-4xl font-bold">Okay........<br/>
            Let'st start with your first note!
            </h1>
            <Link to='/dashboard/addNote' className="underline text-3xl font-semibold">Create one!</Link>
         </div>

            </div>
           
       
        </div>
    );
};

export default Notes;