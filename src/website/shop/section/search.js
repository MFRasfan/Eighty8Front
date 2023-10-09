import React,{useState, useEffect} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchVehicles } from '../../../store/features/vehicle/vehicleService'


const Search = ({setsearchResultList , setshowSearch}) => {
  const [searchText, setsearchText] = useState("")
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if(location.search){
      // let query= location.search.replace(/[?%20]/g, " ").trim("");
      let query= decodeURIComponent(location.search.replace("?", ""))
      setshowSearch(true)
      setsearchText(query)
      dispatch(searchVehicles(query, data=>{
        if(data && data.length>0){
          setsearchResultList(data)
        }
      }))
    }
  }, [location.pathname])
  

  const handleSearch=()=>{
    try {
      setshowSearch(true)
      dispatch(searchVehicles(searchText, data=>{
        if(data && data.length>0){
          setsearchResultList(data)
        }
      }))
      
    } catch (error) {
      console.log(error)
    }
  }

  const onSearchChange=(e)=>{
    setshowSearch(true)
    setsearchText(e.target.value)
    setsearchResultList([])
    if(e.target.value ===""){
      setshowSearch(false)
    }
  }
  

  return (

    <div className='flex bg-white w-[64vw] md:w-[65vw] hover:shadow-md duration-300 rounded-md mb-5 mx-2 h-12 items-center px-2 '>

      <input 
      value={searchText} 
      onChange={onSearchChange}
      placeholder="Search here..."
      className='focus:outline-none w-[68vw]'
      />
      <div onClick={()=>handleSearch()} className='bg-primary cursor-pointer h-[80%] w-[60px] flex items-center justify-center rounded-md'>
      <AiOutlineSearch className='  text-white/70' size={24}/>
      </div>
    </div>
  )
}

export default Search