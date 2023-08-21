import React from 'react'

const AboutCard = ({data}) => {
  const {title, heading, description, image, imageLeft=true}= data
  return (
    <div className='px-32 my-[8%] flex  md:flex-row flex-col items-center justify-center'>
        {imageLeft &&  <div className='w-[80vw] md:w-[50%] h-[500px]'>
          <img src={image} className="h-[100%] z-10 w-[800px] rounded-lg" />
    
      </div>}
      <div className=' w-[80vw] md:w-[50%] h-[400px] pt-4 flex flex-col items-start justify-start  md:px-10'>
     
      <p className='text-gray-500 uppercase mt-5 md:mt-0   md:text-lg font-semibold'>{title}</p>
        <p className='text-4xl mdtext-5xl text-gray-700 font-bold my-5'>{heading}</p>
        <p className='text-lg md:text-xl text-gray-700'>{description}</p>
        {<img 
        src={require("../../assets/about/dots.jpg")}
        className="w-[60%] tablet:w-[100%] md:w-[100%] mt-16 md:mt-32 self-end "
        />}
      </div>
      {!imageLeft &&  <div className='w-[80vw] mt-32 md:mt-0 md:w-[50%] h-[500px]'>
          <img src={image} className="h-[100%] z-10 w-[800px] rounded-lg" />
    
      </div>}

    </div>
  )
}

export default AboutCard