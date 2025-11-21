import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=> {
    const fetchNotes = async () => {
      try {
        // kalo make fetch API :
        // const res = await fetch("http://localhost:5001/api/notes");
        // const data = await res.json();
        // disini fungsinya axios :
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching notes")
        if (error.response?.status == 429){
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI/>}

      {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
      
      <div className='max-w-7l mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default HomePage