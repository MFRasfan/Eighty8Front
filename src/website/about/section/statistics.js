import React from 'react'
import { statistics } from '../../../data/statistics'

const Statistics = ({data}) => {
  return (
    <div className='grid grid-cols-1 py-5 md:grid-cols-3 gap-4 bg-slate-100'>
        {data.map((item,index)=>(
          <div className='text-center mb-4 md:my-10 text-gray-700 cursor-pointer hover:text-primary duration-300 ease-in-out'>
            <p className='xs:text-lg sm:text-xl md:text-2xl font-bold my-5 '>{item.title}</p>
            <p  className='xs:text-lg sm:text-xl md:text-2xl  my-5 '>{item.description}</p>

          </div>

        ))}
    </div>
  )
}

export default Statistics