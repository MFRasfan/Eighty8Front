import React from 'react'
import AboutCard from '../../../component/cards/aboutCard'
import { imageURL } from '../../../store/api'

const Banner = ({data}) => {
  
  let obj={
    title:"ABOUT",
    heading:data.title||"",
    description:data.description||"",
    image: imageURL+data.image||"",
    imageLeft:true
  }
  return (
    <div>
      <AboutCard data={obj}/>
    </div>
  )
}

export default Banner