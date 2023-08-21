import React,{useEffect, useState} from 'react'
import AboutCard from '../../../component/cards/aboutCard'
import { imageURL } from '../../../store/api'

const WhatWedo = ({data}) => {
  const [state, setstate] = useState({})
  useEffect(() => {

  if(data){
     
  let obj={
    title:"WHAT WE DO",
    heading:data.title||"",
    description:data.description ||"",
    image: imageURL+data.image ||"",
    imageLeft:false
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

export default WhatWedo