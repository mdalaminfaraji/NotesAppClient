import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import './pagination.css';
import axios from 'axios';
import { TrashIcon,  } from '@heroicons/react/24/solid'
import { FaEdit, FaUpload } from 'react-icons/fa';
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
      fetch(`https://notes-app-type-script.vercel.app/update/${Id}`, {
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
 
  const img_hosting_token=import.meta.env.VITE_Image_upload_token;

  const handleImageUpload = async (cardId:string) => {
 
    try {
      if (!selectedImage) return;

      const formData = new FormData();
      formData.append('image', selectedImage);

      // Step 5: Upload image to ImageBB
      const imageBBResponse = await axios.post<{ data: { url: string } }>(
        'https://api.imgbb.com/1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            key: `${img_hosting_token}`,
          },
        }
      );

      const imageUrl = imageBBResponse.data.data.url;
      console.log(imageUrl);

    //   Step 7: Send image URL to backend
      await axios.post('http://localhost:5000/cards/updateImage', {
        cardId,
        imageUrl,
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Image uploaded successfully`,
        showConfirmButton: false,
        timer: 2000
       })
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
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
            fetch(`https://notes-app-type-script.vercel.app/addNoteDelete/${id}`,{
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
// 
    return (
        <>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-5 ">
           {
           pagedData.map((notes:any)=><div key={notes._id} className="card bg-[#DDDDDD]  mx-5  text-black ">
             <figure><img src={notes?.photoLink} className='object-cover h-48 w-full' alt="Please upload your desired image" /></figure>
            
                
             
              
            <div >
              <div className='overflow-x-auto h-36 pe-2'>
              <h2 className="card-title  ps-3">{notes?.title}!</h2>
              <p className='ps-3 text-justify'>{notes?.content}</p>
            </div>
             <div className="h-10 w-[90%] mx-auto relative ">
             <div className="flex absolute bottom-0 gap-1 justify-center items-center py-3">
              <button title='update now' onClick={()=>handleUpdate(notes._id)} className="btn btn-outline  btn-xs"><FaEdit></FaEdit></button>
                <button title='Delete card' onClick={()=>handleDelete(notes._id)} className="btn btn-outline btn-xs  btn-secondary"><TrashIcon className=' h-4 w-4'></TrashIcon></button>
                <input type="file" title='Choose one image' accept="image/*"  onChange={handleImageChange} className="file-input file-input-bordered file-input-accent file-input-xs w-3/5  max-w-xs" />
                
        
               <button title='Upload image' onClick={()=>handleImageUpload(notes._id)} className='btn btn-outline btn-xs btn-danger'><FaUpload></FaUpload></button>
              </div>
             </div>
            </div>
          </div>)
         }
         
          
        </div>
        {showModal ? (
        <>
          <div className="flex bg-[#193D3D] bg-opacity-30 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto  mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 bg-[#193D3D]  border border-solid rounded-t-lg  border-gray-300  ">
                  <h3 className="text-3xl font-semibold text-white">Update your information</h3>
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
        <input type="text" className='p-2 w-full m-1 text-black border-2 rounded-lg' placeholder='Enter your Note title' name="title" defaultValue={title}  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Content:</label>
        <textarea defaultValue={content} placeholder='Enter your Content ' className='border-2 w-full rounded-lg text-black p-2 m-1' rows={5} cols={40} name="content"  required />
      </div>

      <div>
        <label className='text-xl block font-semibold ms-2'>Category:</label>
        <select className='text-xl text-black w-full font-semibold ms-2 border-2 rounded-md p-1' name="category" defaultValue={category} required>
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
        <input defaultValue={photoLink} placeholder='Enter photoUrl' className='p-2 m-1 w-full text-black border-2  rounded-lg' type="text" name="photoLink" />
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
        <div className='flex items-center justify-center py-5 '>
         <ReactPaginate
         className='flex gap-1 text-white bottom-0'
        previousLabel="Previous "
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination "
        activeClassName="active btn btn-sm btn-outline"
        previousClassName=" btn btn-sm btn-primary btn-outline"
        nextClassName=" btn btn-sm btn-primary btn-outline"
      />
         </div>


        </>
        

    );
};

export default AllNotes;