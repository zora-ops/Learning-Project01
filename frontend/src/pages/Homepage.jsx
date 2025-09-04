import React from 'react'
import { Navbar } from '../components/Navbar'
import { useState, useEffect } from 'react'
import api from '../components/lib/axios'
import { toast } from 'react-hot-toast'
import RateLimited from '../components/RateLimited'
import NotesNotFound from '../components/NotesNotFound'

import NoteCard from '../components/NoteCard'


const Homepage = () => {
    const [israteLimited, setRateLimited] = useState(false);  
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      const fetchNotes = async () => {
        try {
          const res = await api.get("/notes")
          setNotes(res.data);
          setRateLimited(false);
          console.log(res.data);
        } catch (error) {
          console.log(error)
          if(error.response?.status === 429) {
            setRateLimited(true);
          }else{
            toast.error("An error occurred while fetching notes.");
          }
        } finally{
             setLoading(false); 
          }
      }

      fetchNotes();
    },[])

  return (
    <div>
      <Navbar/>

      {israteLimited && <RateLimited/>}

      {notes.length === 0 && !israteLimited && <NotesNotFound/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'> Loading...</div>}

        {notes.length > 0 && !israteLimited  &&(
          <div className='grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note=> <NoteCard key={note._id} note={note} setNotes={setNotes}/>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage