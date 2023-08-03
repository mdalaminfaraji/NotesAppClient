import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import AllNotes from "./AllNotes";
import axios from "axios";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import './Notes.css';
type Note = {
    title: string;
    content: string;
    category: string;
    photoLink: string;
    email: string;
  };

const GetAllNote = () => {
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const {user,loading, setLoading}=useAuth();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    if(loading){
        return <progress className="progress w-full"></progress>
     }
    console.log(allNotes);
    const handleSearch = async () => {
        
        try {
          const response = await axios.get(`http://localhost:5000/search?query=${query}`);
          const data = response.data;
          setSearchResults(data);
          
        } catch (error) {
          console.error('Error searching notes:', error);
        }
      };
      if(loading){
        return <progress className="progress w-full"></progress>
       }
      useEffect(()=>{
       
      
        const fetchData=async ()=>{
           const res=await fetch(`http://localhost:5000/getNote/${user?.email}`)
           const data=await res.json();
           setAllNotes(data);
          
        }
        fetchData();
       setLoading(false)
   }, [allNotes])
  
  

    return (
        <div className="mb-10    px-5 ">
            <div className=" p-3">
            <input
        type="text" className="border-2 w-1/2 mx-auto block rounded-lg p-2"
        placeholder="Search by title or category"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn mt-1 block mx-auto" onClick={handleSearch}>Search</button>
            </div>
            <AllNotes allNotes={query ? searchResults : allNotes}></AllNotes>
           
        </div>
    );
};

export default GetAllNote;