import React from 'react'

const AboutCard = ({data,imageContainerStyle, imageStyle}) => {
  const {title, heading, description, image, imageLeft=true}= data
  return (
    <div className=' my-[6%] flex  md:flex-row flex-col xs:items-center md:items-start justify-center'>
        {imageLeft &&  <div className={`w-[80vw] md:mt-16  md:w-[30%] sm:h-[400px] md:h-[300px] ${imageContainerStyle}`}>
          <img src={image} className={`h-[100%] z-10 w-[800px] rounded-lg`} />
    
      </div>}
      <div className={`${imageLeft && 'md:ml-[5%]'} ${!imageLeft && 'md:mr-[5%]'} w-[80vw]  md:w-[55%]  pt-4 flex flex-col items-start justify-start  `}>
     
      <p className='text-gray-500 uppercase mt-5 md:mt-0   md:text-lg font-semibold'>{title}</p>
        <p className='xs:text-2xl md:text-4xl text-gray-700 font-bold my-5'>{heading}</p>
        <p className='xs:text-sm   md:text-base text-gray-700'>{description}</p>
        {/* {<img 
        src={require("../../assets/about/dots.jpg")}
        className="w-[60%] tablet:w-[100%] md:w-[100%] mt-16 md:mt-32 self-end "
        />} */}
      </div>
      {!imageLeft &&  <div className={` w-[80vw] mt-16  md:w-[30%]  sm:h-[400px] md:h-[300px] ${imageContainerStyle}`}>
          <img src={image} className={`h-[100%] z-10 w-[800px] rounded-lg ${imageStyle}`} />
    
      </div>}

    </div>
  )
}

export default AboutCard