import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import WebsiteLayout from '../../component/websiteLayout'
import CategoryModal from './section/categoryModal'
import {getAllFilteredVehicles, getAllVehicles} from '../../store/features/vehicle/vehicleService'
import ProductCard from '../../component/cards/productCard'
import Search from './section/search'
import {BiSliderAlt} from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import MobileCategoryModal from './section/mobileCategoryModal'
import PromotionSection from './section/promotionSection'
// import {IoCarSportOutline, IoCarSport} from "react-icons/io"
import {FaCarAlt} from 'react-icons/fa'
import axios from 'axios'

const Shop = () => {
  
  const dispatch=useDispatch()
  const location = useLocation()
  const [vehicleList, setvehicleList] = useState([])
  const [filterList, setfilterList] = useState({})
  const [resetFilter, setresetFilter] = useState(false)
  const [showMobCategoryModal, setshowMobCategoryModal] = useState(false);
  const [searchResultList, setsearchResultList] = useState([])
  const [showSearch, setshowSearch] = useState(false)
  const [filterResults, setfilterResults] = useState([])
  useEffect(() => {
    dispatch(getAllVehicles(data=>setvehicleList(data)))
    
  }, [])

  const handleReset=async()=>{
    setresetFilter(true)
    setfilterList({})
    setfilterResults([])
   
  }

  const getMakes=async()=>{
    const options = {
      method: 'GET',
      url: 'https://car-data.p.rapidapi.com/cars/makes',
      headers: {
        'X-RapidAPI-Key': '4d7220a64fmsh3f43a7736b0db75p10b525jsnf31edcafabe5',
        'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log("makeeeeeeeeeeeeeeeeee",response.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("filterList==========",filterList)


  const handleFilter=()=>{
    try {
      setshowSearch(false)
      let obj={}
    
    console.log("filterList.priceRange , filterList.priceRange>0",filterList.priceRange , filterList.priceRange>0)
    if(filterList.priceRange && filterList.priceRange.length>0){
      obj["priceRange"]= [Number(filterList.priceRange[0]),Number(filterList.priceRange[1])]
    }
   
    if(filterList.year && filterList.year.length>0){
      obj["year"]= [String(filterList.year[0]),String(filterList.year[1])]
    }
    if(filterList.brands && filterList.brands.length>0){
      obj["brands"]= filterList.brands
    }
    if(filterList.colors && filterList.colors.length>0){
      obj["colors"]= filterList.colors
    }

    if(filterList.transmission && filterList.transmission.length>0){
      obj["transmission"]= filterList.transmission
    }

    if(filterList.seats && filterList.seats.length>0){
      obj["seats"]= filterList.seats.map(item=> item.replace(" seats",""))
    }

    if(filterList.mileage && filterList.mileage.length>0){
      obj["mileage"]= [Number(filterList.mileage[0]),Number(filterList.mileage[1])]
    }
    if(filterList.cylinders && filterList.cylinders.length>0){
      obj["cylinders"]= filterList.cylinders
    }
     
    if(filterList.bodyType && filterList.bodyType.length>0){
      obj["bodyType"]= filterList.bodyType
    }

console.log(filterList.driveTrain && filterList.driveTrain.length>0, filterList)
    if(filterList.driveTrain && filterList.driveTrain.length>0){
      obj["drivetrain"]= filterList.driveTrain
    }
    if(filterList.style && filterList.style.length>0){
      obj["style"]= filterList.style
    }
      dispatch(getAllFilteredVehicles(obj, data=>{
        console.log("data.records 123123123132============",filterList, data.records)
        setfilterResults(data.records)}))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <WebsiteLayout>
      <div className='flex flex-col p-10 bg-slate-50'>
        
        <div  className='flex'>
        <p className='text-3xl text-gray-700 font-bold mb-5 mx-3'>{ location.search?`Search Results for: ${decodeURIComponent(location.search.replace("?", ""))}` :'Get Your Dream'} </p>
       {!location.search && <FaCarAlt onClick={()=>getMakes()} size={40} className="text-gray-700" />}

        </div>

        <div className='flex'>
      
        <MobileCategoryModal  
        closeModal={() => setshowMobCategoryModal(false)}
        className={`top-0 right-0 w-full  bg-white md:w-[25%] p-10  drop-shadow-md 
         bottom-0 fixed z-40  ease-in-out duration-300 ${
          showMobCategoryModal ? "translate-x-0 " : "translate-x-full"
        }`} filterList={filterList}
         reset={resetFilter}
          setfilterList={setfilterList}
          applyFilter={handleFilter}
          />
        <div>
          <div className='flex  justify-between items-center'>
            <div className='w-[65%]'>
              <Search setshowSearch={val=>{
                setshowSearch(val)
                setfilterList([])
                }} setsearchResultList={setsearchResultList}/>
            </div>
            
        <div 
        onClick={() => setshowMobCategoryModal(!showMobCategoryModal)}
        className=' hover:shadow-md
         text-secondary/80 py-1 ml-2 mr-4 mb-5 hover:text-primary 
         duration-200 px-2  w-[50px] rounded-md flex border-secondary/60'>
        <BiSliderAlt size={32} />
       
          </div>

          </div>
        {/* {filterList.map(item=><p className="bg-primary text-white">{JSON.stringify(item)}</p>)} */}

        <div className='flex flex-row flex-wrap space-x-2 w-[65vw]'>
        {Object.entries(filterList).map(([key, values]) => (
         key==="priceRange"?
        <div className= {`${values.length>0&&'bg-primary'}  mb-2  rounded-full  px-2 py-1 `} key={key}>
        <p className='text-white text-xs' key={values}>{ `price > ${values[0]}$ & <${values[1]}$ `}</p>
        </div>
        :
        key==="year"?
        <div className= {`${values.length>0&&'bg-primary'}  mb-2  rounded-full  px-2 py-1 `} key={key}>
            <p className='text-white text-xs' key={values}>{`year > ${values[0]} & <${values[1]} `}</p>
        </div>
        :

        key==="mileage"?
        <div className= {`${values.length>0&&'bg-primary'}  mb-2  rounded-full  px-2 py-1 `} key={key}>
        <p className='text-white text-xs' key={values}>{`mileage > ${values[0]}km & <${values[1]}km `}</p>
        </div>
        :
            values.length>0?values.map((value) => (
            <div className= {`${values.length>0&&'bg-primary'}  mb-2  rounded-full  px-2 py-1 `} key={key}>
              <p className='text-white text-xs' key={value}>{value}</p>
              </div>
            )):null 

      ))}
          {Object.entries(filterList).length>0 &&  <div className='text-primary border-[2px] px-3 w-24 h-6 cursor-pointer flex items-center justify-center rounded-full text-xs' onClick={()=>handleReset()}>
            <p className='font-semiBold'> Clear Filter</p>
            </div>}
        </div>

        <div className='ml-5 md:ml-0 flex flex-wrap'>
          
          { Object.keys(filterList).length>0 &&( 
            filterResults.length>0?
             filterResults.map((item,index)=><ProductCard item={item} key={index}/>):
              <div className='flex items-center justify-center'>
              <p className='text-gray-300  font-bold text-3xl '>No Result Found</p>
              </div>)  }

          {showSearch&&( searchResultList.length>0 ?
           searchResultList.map((item,index)=><ProductCard item={item} key={index}/>):
          <div className='flex items-center justify-center'>
          <p className='text-gray-300  font-bold text-3xl '>No Result Found</p>
          </div>)
          }
          {!showSearch && Object.keys(filterList).length===0&& vehicleList.map((item,index)=><ProductCard item={item} key={index}/>)}
        </div>

        </div>
        <PromotionSection/>
  {/* <CategoryModal filterList={filterList} reset={resetFilter} setfilterList={setfilterList}/> */}
        </div>
      </div>

   
    

    </WebsiteLayout>
  )
}

export default Shop