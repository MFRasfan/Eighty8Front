import React,{useState, useEffect} from 'react'
import ImageGallery from 'react-image-gallery';
import {HiOutlineChevronLeft,HiOutlineChevronRight }from 'react-icons/hi'
import { imageURL } from '../../../store/api';
import {GoScreenFull} from 'react-icons/go'

const ProductSlider = ({images}) => {
  const [imageList, setimageList] = useState([])
  useEffect(() => {
   let temp=[]
   for (const iterator of images) {
    temp.push({
      original:imageURL+iterator,
      thumbnail:imageURL+iterator
    })
   }
   setimageList(temp)
  }, [images.length])
  

  return (
    <div className=' w-[80vw] mb-10 md:mb-0 md:w-[45vw]'>
       <ImageGallery 
       items={imageList} 
       showPlayButton={false}
      
       renderLeftNav={ (onClick, disabled) => (
        <HiOutlineChevronLeft 
        className='absolute top-[35%] w-8 h-8   md:w-10 md:h-10  z-10  hover:shadow-md p-1 ml-4 bg-slate-50/20 hover:bg-slate-50 rounded-full'
         onClick={onClick} disabled={disabled} />
      )
       }
       renderRightNav={ (onClick, disabled) => (
        <HiOutlineChevronRight
        className='absolute top-[35%] w-8 h-8   md:w-10 md:h-10 right-4 z-10  hover:shadow-md p-1 ml-4 bg-slate-50/20 hover:bg-slate-50 rounded-full'
         onClick={onClick} disabled={disabled} />
      )
       }
       renderFullscreenButton={(onClick, isFullscreen) => (
        <GoScreenFull 
        className='absolute bottom-5 w-8 h-8   md:w-10 md:h-10 right-4 z-10  hover:shadow-md p-1 ml-4 bg-slate-50/20 hover:bg-slate-50 rounded-full'
        
        onClick={onClick} isFullscreen={isFullscreen} />
      )}/>
     
      </div>
  )
}

export default ProductSlider