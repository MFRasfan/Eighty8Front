import React from 'react'
import { useNavigate } from 'react-router-dom'
import {imageURL} from '../../store/api'

const ProductCard = ({item}) => {
  const {details}= item
  const navigate= useNavigate()
  return (
    <div 
    onClick={()=>navigate(`/vehicle/${item._id}`)}
    className='w-72 h-74 m-2 bg-white hover:text-primary text-gray-700 duration-300 p-2 rounded-md flex-wrap'>
    <div style={{ backgroundImage: `url(${imageURL+item.images[0]})` }}  className={ ` w-[100%] p-4 h-44 rounded-md hover:scale-105 duration-300`}>

      <p className=' text-gray-100 '> {details.make}</p>


    </div>
      {/* <img src={imageURL+item.images[0]} className="w-72 h-44 rounded-md hover:scale-105 duration-300"/> */}
      <div className='px-5 py-5 flex flex-row  items-start ustify-between text-sm'>
      <p className=' w-[80%]  '>
        <span className='text-lg font-semibold'>{details.year} {details.make} {details.model}</span><br/> {details.trim} {details.style}</p>
<div className='mt-1'>
<p className=' text-gray-700    font-semibold'>{details.sellingPrice}$</p>
  </div>              

      </div>
    </div>
  )
}

export default ProductCard