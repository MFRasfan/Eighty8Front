import React,{useEffect, useState} from 'react'
import AboutCard from '../../../component/cards/aboutCard'
import { imageURL } from '../../../store/api'

const WhoWeAre = ({data}) => {
  const [state, setstate] = useState({})
  useEffect(() => {

  if(data){
     
  let obj={
    title:"MAINTENANCE AND SERVICE",
    heading:data.title||"",
    description:data.description ||"",
    image: imageURL+data.image ||"",
    imageLeft:true
  } 
  setstate(obj)
  }
  }, [data && Object.keys(data).length])
 
 
  return (
    <div>
      <AboutCard data={state}/>
    </div>
  )
}

export default WhoWeAre