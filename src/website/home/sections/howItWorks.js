import React,{useState, useEffect} from 'react'
import { imageURL } from '../../../store/api'
const defaultData=[
  {
    image:require('../../../assets/browseonline.jpg'),
    title:'Browse online',
    description:'Hundred of cars for every style and budget'
  },
  {
    image:require('../../../assets/cardeliver.jpg'),
    title:'Get it delivered',
    description:'We bring it to your door in a matter of days.'
  },
  {
    image:require('../../../assets/tryit.jpg'),
    title:'Try it for 10 days',
    description:"If you don't like it, we'll come pick it up. No questions asked."
  },
]


const HowItWorks = ({data=[]}) => {
  const [list, setlist] = useState([])
  
  const card=(item,index)=>{
    return(
      <div 
      className='w-[90%] md:w-[40%] ml-6 md:ml-0 hover:shadow-lg p-6 duration-300 ease-in-out rounded-lg pb-8'
       key={index+item.title}>
        <img className='rounded-2xl mb-5' src={`${data&& data.length>0&&imageURL}${item.image}`}/>
        <p className='font-bold text-secondary text-2xl mb-3 text-center'>{item.title}</p>
        <p className='text-center text-gray-600 text-lg'>{item.description}</p>
      </div>
    )
  }
  useEffect(() => {
   if(data.length>0){
    setlist(data)
   }else{
    setlist(defaultData)
   }
  }, [data.length])
  

  return (
    <div>
      <p className='text-4xl md:text-5xl text-gray-700 text-center pt-20 pb-10 font-bold'>As Featured</p>
      <div className='md:flex md:px-10 items-center justify-evenly'>
        {list.map((item,index)=>card(item,index))}
      </div>
    </div>
  )
}

export default HowItWorks