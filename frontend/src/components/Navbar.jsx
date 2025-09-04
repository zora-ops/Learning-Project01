import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

export const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                    Thinkboard</h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className='h-5 w-5'/>
                    <span>New Note</span>
                    </Link> 
                </div>
            </div>
        </div>
    </header>
  )
}
