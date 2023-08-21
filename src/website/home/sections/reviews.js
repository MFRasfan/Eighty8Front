import React from 'react';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs'
import ReactStars from "react-rating-stars-component";
import {reviewData} from '../../../data/reviews'
import GoogleSVG from "../../../assets/google.svg"
import moment from 'moment'
import Button from '../../../component/button';


const Reviews =()=> {
  const id ="review"
  const slideLeft = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const reviewCard=(item ,index)=>{
    return(
      <div  
      key={index}
      className='w-[330px] 
      scrollbar-hide m-2 my-6 text-black  inline-block cursor-pointer
       bg-white rounded-lg drop-shadow-md hover:scale-105 ease-in-out duration-300'>
       <img src={item.image} className="w-[100%] rounded-lg h-[300px]"/>
       <div className='flex text-left flex-wrap overflow-hidden whitespace-pre-wrap scrollbar-hide'>
      <div className='p-5'>
        <div className='flex items-center space-x-5 my-3'>
          <img src={GoogleSVG} className='w-[30px] h-[30px]'/>
         <ReactStars
            count={5}
            value={item.rating}
            edit={false}
            // onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
 
          />
        </div>
      <p className='mb-5'>{item.comment.slice(0,120)+"..."}</p>
       <p className=' text-gray-600 mb-3'>{item.name}</p>
       <p className='text-gray-400 mb-2'>{item.place}</p>
       <p className='text-gray-400 mb-2'>{moment(item.date).fromNow('')}</p>
      </div>
      </div>

      </div>
    )
  }
  return (
    <div className={'bg-[#F5F5F5] h-[700px] py-10 w-[100%] '}>

      <div 
      className='relative w-[100%]  space-x-10 flex justify-center items-center self-center '
      >

        <div
          id={id}
          className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
      
          { reviewData.map((item, index) => reviewCard(item, index))}
        </div>
       
      
      </div>
      <div className='flex w-full items-center justify-between mt-6 '>
     <div className='flex space-x-4 items-start'>
     <div 
       onClick={slideLeft}
       className='w-[35px] h-[35px] md:w-[50px] md:h-[50px] items-center justify-center flex  bg-primary cursor-pointer rounded-full  text-white ease-in-out duration-300 hover:drop-shadow-md '>
        <BsArrowLeft size={20} />

       </div>
       <div 
        onClick={slideRight} 
        className='w-[35px] h-[35px] md:w-[50px] md:h-[50px] items-center justify-center flex  bg-primary cursor-pointer rounded-full  text-white ease-in-out duration-300 hover:drop-shadow-md '>
        <BsArrowRight  size={20} />

       </div>
     </div>
     <div>
     <div className='flex items-center  space-x-5 my-3'>
          <img src={GoogleSVG} className='w-[35px] h-[35px] md:w-[50px] md:h-[50px]'/>
         <div>
         <ReactStars
            count={5}
            value={4.8}
            edit={false}
            // onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
 
          />
          <p className='text-sm md:text-base'><span className=' font-bold'>4.8</span> stars, 1000+ reviews</p>
         </div>
        </div>
     </div>
      </div>

      <div className=' bg-[#F5F5F5] flex items-center justify-center mt-4'>
      <Button title={"Read More Reviews"} style={"w-[250px]"} onClick={()=>{}}/>
      </div>
    </div>
  );
}

export default Reviews 