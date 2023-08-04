import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import AllNotes from "./AllNotes";
import './Notes.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";

type Note = {
    title: string;
    content: string;
    category: string;
    photoLink: string;
    email: string;
  };
  const SearchNote:React.FC = () => {
    const [axiosSecure]=useAxiosSecure();
    const {user}=useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    useEffect(() => {
        // Fetch the user's notes on component mount
        fetchUserNotes();
      }, []);

      const fetchUserNotes = () => {
        axiosSecure.get(`/api/notes/${user?.email}`)
          .then((response:any) => {
            setNotes(response.data);
          })
          .catch((error:any) => {
            console.error('Error while fetching user notes:', error);
          });
      };
      const handleSearch = (event:any) => {
        const { value } = event.target;
        setSearchTerm(value);
        if (value.trim() === '') {
          setSearchResults([]);
        } else {
          // Make an API call to fetch search results based on title or category
          axiosSecure.get(`/api/search?userEmail=${user?.email}&term=${value}`)
            .then((response:any) => {
              setSearchResults(response.data);
            })
            .catch((error:any) => {
              console.error('Error while searching:', error);
            });
        }
      };
   
    return (
        <div className="bg-color h-screen ">
        <div className="p-4 ">
        <input
        className="border-2 w-1/2 mx-auto block rounded-lg p-2"
         type="text"
         value={searchTerm}
         onChange={handleSearch}
         placeholder="Search by title or category and content"
       />
        </div>
        <ul className="bg-color px-5">
            
          {searchResults.length === 0 ? (
            // Display user's notes by default
              <AllNotes allNotes={notes}></AllNotes>
          ) : (
            // Display search results if available
         <AllNotes allNotes={searchResults}></AllNotes>
          )}
        </ul>
      </div>
    );
  };
  
  export default SearchNote;
