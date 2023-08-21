import React from 'react'
import Image1 from '../../../assets/cartesting.png'
import Image2 from '../../../assets/banner2.jpeg'
import Button from '../../../component/button'


const PromotionSection = () => {
    
  return (
    <div className='hidden md:flex -mt-10 flex-col'>
        <div  style={{
      backgroundImage: `url(${Image2})`, 
    //  backgroundPosition: '',
      backgroundSize: 'cover',
      backgroundColor:'',
      backgroundRepeat: 'no-repeat'}}
      className="h-[60vh] mr-20 mb-5 rounded-md w-[18vw] overflow-hidden flex items-center">
         <div className='bg-primary/50 flex flex-col px-10 items-center justify-center w-[100%] h-[100%]'>
            <p className=' text-lg font-semibold -ml-10 text-white'>Amazing Deals</p>
            <p className='text-white mt-4 mb-10 '>Rev up your savings with our unbeatable car deals! </p>
            <Button title={'Get Deals'} className="w-[100px]"></Button>
         </div>
        </div>
        <div  style={{
      backgroundImage: `url(${Image1})`, 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor:'',
      backgroundRepeat: 'no-repeat'}}
      className="h-[90vh] mr-20 mb-5 rounded-md w-[18vw] overflow-hidden flex items-center">
         <div className='bg-primary/50 flex flex-col px-10 items-center justify-center w-[100%] h-[100%]'>
            <p className=' text-lg font-semibold -ml-10 text-white'>Amazing Deals</p>
            <p className='text-white mt-4 mb-10 '>Unlock incredible savings and drive home in style with our exclusive car deals that offer both affordability and quality! </p>
            <Button title={'Get Deals'} className="w-[100px]"></Button>
         </div>
        </div>
      
    </div>
  )
}

export default PromotionSection