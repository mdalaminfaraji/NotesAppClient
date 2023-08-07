import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

type Note = {
  title: string;
  content: string;
  category: string;
  photoLink: string;
  email: string;
};

const useAllNotes = (): [Note[], () => void] => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  
  const { refetch, data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes'],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure(`/api/notes/${user.email}`);
        return res.data;
      }
      return [];
    },
  });

  return [notes, refetch];
};

export default useAllNotes;
