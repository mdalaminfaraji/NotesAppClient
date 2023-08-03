

// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// const useAllNotes = () => {
//     const {user, loading}=useAuth();
//     const [axiosSecure]=useAxiosSecure();
//     const {refetch, data:AllNotes=[]}=useQuery({
//         queryKey:['AllNotes'],
//         enabled:!loading,
//         queryFn: async ()=>{
//             const res=await axiosSecure(`/getNote/${user?.email}`);
//             console.log('axios',res);
//             return res.data;
//         },
//     })
//     return[AllNotes, refetch];
  
// };

// export default useAllNotes;