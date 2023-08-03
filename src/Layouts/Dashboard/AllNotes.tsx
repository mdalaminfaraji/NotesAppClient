import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

type Note = {
  title: string;
  content: string;
  _id?:any;
  category?: string;
  photoLink?: string;
};

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
  ];



const AllNotes: React.FC<{ allNotes: Note[] }>= ({allNotes}) => {
   
    const itemsPerPage = 6; // Set the number of items to display per page
  const pageCount = Math.ceil(allNotes.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagedData, setPagedData] = useState<Note[]>([]);
  const [updateData, setUpdateData]=useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [Id, setId]=useState('');
  
  const {user}=useAuth();

 console.log(AllNotes);


  

  const handleUpdate=(id:any)=>{
    setUpdateData([]);
     const  data:any=allNotes.find(note=>note._id==id);
       setUpdateData(data);
       setId(id);
       setShowModal(true);
}
console.log(updateData);

const handleSubmit = async (e:any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.elements.namedItem('title')?.value;
    const content = form.elements.namedItem('content')?.value;
    const category = form.elements.namedItem('category')?.value;
    const photoLink = form.elements.namedItem('photoLink')?.value;
     const updateValue={
        title, content, category, photoLink, email:user?.email
     }
      console.log(updateValue);
      fetch(`https://notes-app-server-ten.vercel.app/update/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateValue),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); 
          if(data.modifiedCount){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Updated successfully`,
                showConfirmButton: false,
                timer: 1500
               })
          }

       
        })
  
     
    setShowModal(false);
  };


  const handleDelete=(id:any)=>{

    Swal.fire({
        title: 'Are you sure?',
        text: "You Delete this Note!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      
           if(result.isConfirmed){
            fetch(`https://notes-app-server-ten.vercel.app/addNoteDelete/${id}`,{
                        method:'DELETE',
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        
                        if (data.deletedCount>0) {
                            Swal.fire(
                              'Deleted!',
                              'Your coffee has been deleted.',
                              'success'
                            )
                          }
                    });
                   
           }
 
        
      })
   

}


  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPagedData(allNotes.slice(startIndex, endIndex));
  }, [allNotes, currentPage]);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  const {title, content, category, photoLink}:any=updateData;
  console.log(title);
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
           {
           pagedData.map((notes:any)=><div key={notes._id} className="card  bg-primary text-primary-content mx-5 md:mx-0">

            <div className="card-body">
              <h2 className="card-title">{notes.title}!</h2>
              <p>{notes.content}</p>
              <div className="card-actions justify-end">
              <button onClick={()=>handleUpdate(notes._id)} className="btn ">Update</button>
                <button onClick={()=>handleDelete(notes._id)} className="btn btn-success">Delete</button>
               
              </div>
            </div>
          </div>)
         }
         
          
        </div>
        {showModal ? (
        <>
          <div className="flex bg-[#193D3D] bg-opacity-80 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font-semibold ">update your information</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-7 w-7 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto  container mx-auto py-8 border-4 px-16  bg-[#193D3D] bg-opacity-100  text-[#DDDDDD]">
                <form onSubmit={handleSubmit}>
      <div>
        <label className='text-xl block font-semibold ms-2'>Note Title</label>
        <input type="text" className='p-2 m-1 text-black border-2 w-3/4 rounded-lg' placeholder='Enter your Note title' name="title" defaultValue={title}  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Content:</label>
        <textarea defaultValue={content} placeholder='Enter your Content ' className='border-2 w-3/4 rounded-lg text-black p-2 m-1' rows={5} cols={40} name="content"  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Category:</label>
        <select className='text-xl text-black font-semibold ms-2 border-2 rounded-md p-1' name="category" defaultValue={category} required>
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
        <input defaultValue={photoLink} placeholder='Enter photoUrl' className='p-2 m-1 text-black border-2 w-3/4 rounded-lg' type="text" name="photoLink" />
      </div>

      <button className='btn btn-sm btn-info text-center my-1 ' type="submit">Submit</button>
    </form>
            
                </div>
                <div className="flex items-center bg-white justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
 
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        <div className='w-32 mx-auto p-5'>
         <ReactPaginate
         className='flex gap-1 '
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
         </div>


        </>
        

    );
};

export default AllNotes;