import React ,{useState, useRef, useEffect}from 'react'
import { useDispatch } from 'react-redux'
import WebsiteLayout from '../../component/websiteLayout'
import { getVehicleDetailsById } from '../../store/features/vehicle/vehicleService'
import InquiryForm from './section/InquiryForm'
import InspectionPoints from './section/inspectionPoints'
import ProductSlider from './section/productSlider'
import RecommendedProducts from './section/recommendedProducts'
import { useParams } from 'react-router-dom';
import ProductDescription from './section/productDetails'


const ProductDetails = () => {
  const sectionRef= useRef(null)
  const dispatch = useDispatch()
  const { slug } = useParams();
  const [vehicleDetails, setvehicleDetails] = useState({})
  useEffect(() => {
   
    dispatch(getVehicleDetailsById(slug, data=>setvehicleDetails(data)))
  }, [])
  
  const handleClick = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <WebsiteLayout>
     <div>
     <div className='flex md:flex-row flex-col p-5 md:p-10'>
       <ProductSlider images={vehicleDetails.images||[]}  />
       <ProductDescription goToInquiry={handleClick} details={vehicleDetails.details||{}}/>
       </div>

        <InquiryForm id="inquiryform" reference={sectionRef} vehicleid={vehicleDetails._id}/>
     </div>
    </WebsiteLayout>
  )
}

export default ProductDetails