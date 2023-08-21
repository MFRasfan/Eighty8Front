import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../component/button'

const NotFound = () => {
    const navigate= useNavigate()
  return (
    <div className='bg-slate-50 flex flex-col space-y-10 h-[100vh] items-center justify-center'>
       <h1 className='text-4xl font-bold  text-gray-600'>404 - Not Found</h1>
      <p className='text-2xl  text-gray-500 font-semibold'>The page you are looking for does not exist.</p>
      <Button title={'Visit Home'} onClick={()=>navigate("/")}></Button>
    </div>
  )
}

export default NotFound