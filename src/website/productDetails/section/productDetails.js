import React ,{useState, useEffect} from 'react'
import 'react-tabs/style/react-tabs.css';


const ProductDescription = ({details, goToInquiry}) => {

    const [activeTab, setactiveTab] = useState("Overview")
    const [total, settotal] = useState("")

    const style={
        activeTab:`border-b-2 text-gray-700 border-b-primary font-bold`,
        tab:'text-gray-500 text-base md:text-lg  duration-300 pb-1 tracking-wide ',

    }

   useEffect(() => {
    if(details.sellingPrice && details.invoice_price && details.delivery_charges){
        let totalTemp = Number(Number(details.sellingPrice)
        - Number(details.invoice_price.replace(/[\$,]/g, '')) + Number(details.delivery_charges.replace(/[\$,]/g, '')))
        let amount = "$" + totalTemp.toLocaleString(undefined, {minimumFractionDigits: 0});
        settotal(amount)
    }
   }, [details])
   

    const renderTabs=()=>{
     return (  
     <div className='flex space-x-3  md:space-x-7 border-b-[1px] border-b-slate-200 mt-6'>
            <button className={`${style.tab}  ${activeTab==="Overview" && style.activeTab}`} onClick={()=>setactiveTab("Overview")}>
                <p>Overview</p>
            </button>
            {/* <button className={`${style.tab} ${activeTab==="Pricing" && style.activeTab}`} onClick={()=>setactiveTab("Pricing")}>
                <p>Pricing</p>
            </button> */}
            <button className={`${style.tab} ${activeTab==="Features" && style.activeTab}`} onClick={()=>setactiveTab("Features")}>
                <p>Features</p>
            </button>
            <button className={`${style.tab} ${activeTab==="Specs" && style.activeTab}`} onClick={()=>setactiveTab("Specs")}>
                <p>Specs</p>
            </button>
            <button className={`${style.tab} ${activeTab==="Disclosure" && style.activeTab}`} onClick={()=>setactiveTab("Disclosure")}>
                <p>Disclosure</p>
            </button>
           <div className='w-12'/>
        </div>
        )
    }

    const renderOverview=()=>{
       return( <div>
           
           <div className='flex flex-col md:flex-row justify-between'>

            <div className='flex space-x-3  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Seats</p>
                <p> {details.standard_seating}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Doors</p>
                <p> {details.doors}</p>
             </div>

           </div>
        
           <div className='flex flex-col md:flex-row  justify-between'>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Engine</p>
                <p> {details.engine}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Engine Size</p>
                <p> {details.engine_size}</p>
             </div>
            </div>

            <div className='flex flex-col md:flex-row  justify-between'>
            
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Engine Cylinder</p>
                <p> {details.engine_cylinders}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
             <p className='font-bold'>Drivetrain</p>
                <p> {details.drivetrain}</p>
             </div>
            </div>
            <div className='flex flex-col md:flex-row  justify-between'>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                
                <p className='font-bold'>Transmission</p>
                <p> {details.transmission}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                
                <p className='font-bold'>Color</p>
                <p> {details.color}</p>
             </div>
             </div>
        </div>)
    }

    const renderPrice=()=>{
        return(
            <div className='py-5 flex text-gray-600 flex-col space-y-5'>
                <div className='flex justify-between items-center'>
                    <p className='font-bold'>Price</p>
                    <p>{details.invoice_price}</p>
                </div>
                <div className='flex justify-between items-center'>
                <p className='font-bold'>delivery Charges</p>
                    <p>{details.delivery_charges}</p>
                </div>
                <div className='flex justify-between items-center'>
                <p className='font-bold'>Licensing Fee</p>
                    <p>{total}</p>
                </div>
                <div className='flex border-t-[1px] pt-3 border-t-slate-300 justify-between items-center'>
                <p className='font-bold'>Total</p>
                    <p>{details.sellingPrice}</p>
                </div>
            </div>
        )
    }

//     94,736 km
// 4 seats
// 10.6 city7.2 highway
// Automatic AWD · I4 Cylinders
// 1 key
// 0 accidents
// View CarFax
// Get extended warranty with Clutch

// This vehicle's manufacturer warranty has expired.
// Price$25,590
// OMVIC Fee (estimated)$10
// Licensing Fee (estimated)$59
// HST (13%)$3,328
// Total price$28,987

    const renderSpecs=()=>{
        return(
            <div className='py-5 text-sm'>
                <div className='flex flex-col md:flex-row  justify-between'>
                <div className='flex space-x-3  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>City Mileage</p>
                <p> {details.city_mileage}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Highway Mileage</p>
                <p> {details.highway_mileage}</p>
             </div>
                </div>
                <div className='flex flex-col md:flex-row  justify-between'>
                <div className='flex space-x-3  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Fuel Capacity</p>
                <p> {details.fuel_capacity}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Curb Weight</p>
                <p> {details.curb_weight}</p>
             </div>
                </div>
                <div className='flex flex-col md:flex-row  justify-between'>
                <div className='flex space-x-3  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Overall height</p>
                <p> {details.overall_height}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Overall length</p>
                <p> {details.overall_length}</p>
             </div>
                </div>
                <div className='flex flex-col md:flex-row  justify-between'>
                <div className='flex space-x-3  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Overall width</p>
                <p> {details.overall_width}</p>
             </div>
             <div className='flex space-x-3 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Wheelbase Length</p>
                <p> {details.wheelbase_length}</p>
             </div>
            
                </div>
          
            
            
          
            </div> 
        )
    }



    const renderFeature=()=>{
        return(
            <div className='py-5 text-sm'>
            <div className='flex space-x-6  justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Anti-lock Brake System</p>
                <p> {details.anti_brake_system}</p>
             </div>
             <div className='flex space-x-6 justify-between py-3  text-gray-600 items-center'>
                <p className='font-bold'>Steering Type</p>
                <p> {details.steering_type}</p>
             </div>
            </div> 
        )
    }

    const renderDisclosure=()=>{
        return(
            <div className='text-gray-600 py-5'> Previously registered in {details.made_in_city}</div>
        )
    }

 

  return (
    <div className='px-0 md:px-10'>
        <p className='bg-green-100/60 w-32 text-green-800 text-center mb-6 font-bold px-5 py-2 rounded-full'>Available</p>
        <p className='leading-10 text-gray-700 text-2xl'><span className='font-bold'>{details.year} {details.make} {details.model}</span> {details.trim} {details.style}</p>
        <p className='leading-10 text-gray-700 text-2xl font-bold'>${details.sellingPrice ? details.sellingPrice.toLocaleString(undefined , {userGrouping: true}) : null}</p>
        {/* <p className='text-gray-600 mb-6 text-sm '>{details.delivery_charges} delivery to <span className='text-green-800/60 px-1  cursor-pointer'>{details.made_in}, {details.made_in_city}</span></p> */}

        <button    
        onClick={()=>goToInquiry()}
        className={'w-[150px] font-semibold bg-primary text-white hover:shadow-md rounded-md px-4 py-2 text-sm h-10'}
        >
        <p>Start Purchase</p>
        </button>

        {renderTabs()}
        <div className='text-sm'>
        {activeTab==="Disclosure"? renderDisclosure():
        activeTab==="Features"? renderFeature():
        activeTab==="Specs"?renderSpecs():
        activeTab==="Pricing"?renderPrice():
        renderOverview()}

        </div>

   
        </div>
  )
}

export default ProductDescription