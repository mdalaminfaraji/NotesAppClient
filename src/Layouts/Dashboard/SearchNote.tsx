import React, {  useState } from "react";
import useAuth from "../../Hooks/useAuth";
import AllNotes from "./AllNotes";
import './Notes.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import useAllNotes from "../../Hooks/useAllNotes";
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
    const [notes, refetch]=useAllNotes();
   
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [showModal, setShowModal] = useState(false);
      const handleUpdate=()=>{
        setShowModal(true);
      }

     
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.elements.namedItem('title')?.value;
        const content = form.elements.namedItem('content')?.value;
        const category = form.elements.namedItem('category')?.value;
        const photoLink = form.elements.namedItem('photoLink')?.value;
         const AddNote={
            title, content, category, photoLink, email:user?.email
         }
         try {
          const response = await axiosSecure.post('/addNote', AddNote);
          console.log('Form submitted successfully!', response.data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Added successfully`,
            showConfirmButton: false,
            timer: 1500
           })
          
          refetch();

        } catch (error) {
          console.error('Error submitting the form:', error);
        }
      
         
        setShowModal(false);
      };
  
  
      const handleCategoryChange = (event:any) => {
        const { value } = event.target;
        setSelectedCategory(value);
        setSearchTerm('');
        if (value === '') {
          setSelectedCategory('');
            setSearchResults([]);
          } else {
            const filteredNotes = notes.filter((note) => note.category === value);
        
             if(filteredNotes.length===0){
               
             }
            setSearchResults(filteredNotes);
          }
      };
   


     
        const handleSearch = (event:any) => {
            const { value } = event.target;
            setSearchTerm(value);
           
            if (value.trim() === '') {
                setSelectedCategory('');
              setSearchResults([]);
            } else {
              axiosSecure.get(`/api/search?userEmail=${user?.email}&term=${value}`)
                .then((response:any) => {
                  setSearchResults(response.data);
                  setSelectedCategory('');
                  
                })
                .catch((error:any) => {
                  console.error('Error while searching:', error);
                });
            }
          };
  
      const uniqueCategories = new Set();
      notes.forEach(item => {
        uniqueCategories.add(item.category);
      });
      const uniqueCategoriesArray = Array.from(uniqueCategories);
    const SeeAllNotes=()=>{
        setSearchResults([]);
        setSelectedCategory('');
    }
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
         placeholder="Search by title and content"
        
       />
      <div className=" flex justify-between">
    <div>
    <select className="rounded-lg  mt-1 ms-3" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Filter by Categories</option>
        {uniqueCategoriesArray.map((category:any) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button title='Add now' onClick={handleUpdate} className="btn btn-outline mr-3 text-white ms-2  btn-xs"><FaPlus></FaPlus>AddNewNote</button>
    </div>
            <button onClick={SeeAllNotes} className="btn btn-xs hidden md:flex">
        SeeTotalNotes
        
        </button>
      </div>
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
        {showModal ? (
        <>
          <div className="flex bg-[#193D3D] bg-opacity-30 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto  mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 bg-[#193D3D]  border border-solid rounded-t-lg  border-gray-300  ">
                  <h3 className="text-3xl font-semibold text-white mx-auto">Add your Notes</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-500 w-8 pb-1 bg-opacity-30  text-xl block  bg-black  rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto  container mx-auto pt-5 border rounded-lg px-16  bg-[#193D3D] bg-opacity-100  text-[#DDDDDD]">
                <form onSubmit={handleSubmit}>
      <div>
        <label className='text-xl block font-semibold ms-2'>Note Title</label>
        <input type="text" className='p-2 w-full m-1 text-black border-2 rounded-lg' placeholder='Enter your Note title' name="title"  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Content:</label>
        <textarea  placeholder='Enter your Content ' className='border-2 w-full rounded-lg text-black p-2 m-1' rows={5} cols={40} name="content"  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Category:</label>
        <select className='text-xl text-black w-full font-semibold ms-2 border-2 rounded-md p-1' name="category"  required>
          <option   value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Photo Link (optional):</label>
        <input  placeholder='Enter photoUrl' className='p-2 m-1 w-full text-black border-2  rounded-lg' type="text" name="photoLink" />
      </div>

      <button className='btn btn-sm btn-info text-center my-1 block mx-auto' type="submit">Submit</button>
    </form>
            
                </div>
                {/* <div className="flex items-center bg-white justify-end py-2  border-solid border-blueGray-200 rounded-lg">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
 
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : null}
      </div>
    );
  };
  
  export default SearchNote;