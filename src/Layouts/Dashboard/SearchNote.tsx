import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import AllNotes from "./AllNotes";
import './Notes.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
const categories = [
    'Personal',
    'Work',
    'Study',
    'Shopping',
    'Travel',
    'Health',
    'Recipes',
    'Ideas',
    'Finance',
    'Quotes',
    'Others'
  ];

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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [character, setCharacter]=useState('');
    useEffect(() => {
        // Fetch the user's notes on component mount
      fetchUserNotes();
       
      }, [notes]);
      const handleCategoryChange = (event:any) => {
        const { value } = event.target;
        setSelectedCategory(value);
        setSearchTerm('');
        if (value === '') {
           setCharacter('');
            setSearchResults([]);
          } else {
            const filteredNotes = notes.filter((note) => note.category === value);
            setCharacter('');
             if(filteredNotes.length===0){
                setCharacter(`${value} category may be absent`);
             }
            setSearchResults(filteredNotes);
          }
      };
   

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
             <Helmet>
               <title>Notes | AllNotes</title>
       
             </Helmet>
        <div className="p-4 ">
        <input
        className="border-2 w-1/2 mx-auto block rounded-lg p-2"
         type="text"
         value={searchTerm}
         onChange={handleSearch}
         placeholder="Search by title or category and content"
        
       />
       <select className="rounded-lg mt-1 ms-3" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Filter by Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
        <span className="text-red-400 ms-2">{character}</span>
        </div>
        <ul className="bg-color  ">
            
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
