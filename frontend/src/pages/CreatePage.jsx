import React, { use } from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import api from '../components/lib/axios'

import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePage = () => {
  const [title, seTital] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()
      seTital('')
      setContent('')


      if(!title.trim() || !content.trim()){
        toast.error("All fields are required")   
        return
      }

      setLoading(true)
      try {
        await api.post('/notes', {
          title,
          content,
        })
        toast.success("Note created successfully")
        navigate('/')
      } catch (error) {
        console.log("Error creating Note",error);
        if(error.response.status === 429){
          toast.error("Bruh Hold a sec!", {
            duration: 4000,
            icon: ':skull:'
          })
        }
      } finally{
        setLoading(false)
      }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon />
            Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Notes</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered w-full' value={title} onChange={(e) => seTital(e.target.value)} />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea type="text" placeholder='Write your Note here...' className='input input-bordered w-full h-32 whitespace-pre-wrap' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-action justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage