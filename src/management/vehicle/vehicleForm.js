import React,{useState,useRef, useEffect} from 'react'
import { formStyle } from '../../style/adminStyle'
import { Zoom } from 'react-slideshow-image';
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import {AiOutlineEyeInvisible, AiOutlineEye, AiFillCloseCircle} from "react-icons/ai"
import {useNavigate} from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { uploadMedia } from '../../store/features/media/mediaService';
import { addVehicle } from '../../store/features/vehicle/vehicleService';
import BeatLoader from "react-spinners/BeatLoader";
import InputMask from "react-input-mask"
import { url } from '../../store/api';


const VehicleForm = ({toggleForm}) => {

  const dispatch= useDispatch()
  const navigation = useNavigate();
  const fileInputRef = useRef(null);
  // 1NXBR32E85Z505904
  const [input, setinput] = useState({vin:""});
  const [trimOptions, settrimOptions] = useState([])
  const [trimOptionCustomList, settrimOptionCustomList] = useState([])
  const [styleOptions, setstyleOptions] = useState([])
  // const [slideImages, setslideImages] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState([])
  const [justUploadedImages, setjustUploadedImages] = useState([]) 
  const [isLoading, setIsLoading] = useState(false);
  
  const slideImages = [
    // {
    //   url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    // },
    // {
    //   url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',

    // },
    // {
    //   url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      
    // },
  ];


  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };  
  
  const handleUpload =async(file) => {
    const formData = new FormData();

    formData.append('file', file);


   await  dispatch (uploadMedia(formData,( response) => {
      console.log(response.data);
      if(response.data && response.data.url){
      

        //  Remove the uploaded file from the selected files array after successful upload
        setselectedFiles((prevSelectedFiles) =>
          prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
        ); 

        let temp = justUploadedImages
        temp.push(response.data.url)
        console.log("temp-----------------",temp, response.data.url, justUploadedImages)
        setjustUploadedImages(temp)
      }else{
        toast.error('Network Error')
      }
    }))

  };

  const handleUploadAll = async () => {
  
    for (const file of selectedFiles) {
      await handleUpload(file);
    }

   submitData()
  };

  const submitData= async()=>{
    try {
      // make an object with all fields 
      let details= Object.assign({},input)
      delete details.vin;
      let cityMileageTemp=details.city_mileage&& details.city_mileage.split(" ")
      details.cityMileageMin= Number(cityMileageTemp[0])
      details.cityMileageMax= Number(cityMileageTemp[2])

      let highwayMileageTemp=details.highway_mileage&& details.highway_mileage.split(" ")
      details.highwayMileageMin= Number(highwayMileageTemp[0])
      details.highwayMileageMax= Number(highwayMileageTemp[2])
      
      details.sellingPrice= Number(details.sellingPrice)
    

      let obj={
        vin:input.vin,
        details: details,
        images:justUploadedImages
      }
      dispatch(addVehicle(obj, ()=>{
        setinput({
          "year": "",
          "make": "",
          "model": "",
          "trim": "",
          "style": "",
          "type": "",
          "size": "",
          "category": "",
          "made_in": "",
          "made_in_city": "",
          "doors": "",
          "fuel_type": "",
          "fuel_capacity": "",
          "city_mileage": "",
          "highway_mileage": "",
          "engine": "",
          "engine_size": "",
          "engine_cylinders": "",
          "transmission": "",
          "transmission_type": "",
          "transmission_speeds": "",
          "drivetrain": "",
          "anti_brake_system": "",
          "steering_type": "",
          "curb_weight": "",
          "gross_vehicle_weight_rating": "",
          "overall_height": "",
          "sellingPrice":"",
          "overall_length": "",
          "overall_width": "",
          "wheelbase_length": "",
          "standard_seating": "",
          "invoice_price": "",
          "delivery_charges": "",
          "manufacturer_suggested_retail_price": ""
        })
        setIsLoading(false)
        setselectedFiles([])
        setPreviewUrl([])
        setjustUploadedImages([])
      }))

      console.log(obj)
    
      // submit the data
      // clear the input files

      
    } catch (error) {
      toast.error('Metwork Error');
      console.log(error)
    }
  }


  const handleSubmit=async()=>{
    try {
      setIsLoading(true)
      
      // check if the user has upload any new image then upload it into db and get new url
      // if multiple image then loop it and upload it one by one
      
      let isValid=true
      if(!input.vin){
        throw 'Please Enter Vin Number'
      }
      if(Object.keys(input).length<34){
        console.log(input)
        throw 'Please enter all fields'
      }
      if(selectedFiles.length===0){
        throw 'Please upload atleast one image'
      }
      if(input.sellingPrice===0){
        throw 'Please select selling price'
      }

      if(isValid){
        if(selectedFiles.length>0){
          await handleUploadAll()
        }else{
          submitData()
        }

      }

      

    } catch (error) {
      toast.error(error||'Network Error');
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFetchDetails=async()=>{
    try {
      if(!input.vin){
        return  toast.error('Please enter vin number')
      }

      let uri = `${url.carAPI.fetchCarDetailsByVin}${input.vin}`
      const {data} = await axios.get(uri)
      setinput({...input, ...data.attributes})

    } catch (error) {
      console.log(error)
      return  toast.error('Network error')
    }
  }

  const handleFileChange = (event) => {
    // setslideImages(event.target.files[0]);
    console.log(event.target.files[0])
    const file = event.target.files[0];
    let temp= selectedFiles.slice(0)
    temp.push(file)
    setselectedFiles(temp);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result)
      let temp= previewUrl.slice(0)
      temp.push(fileReader.result)
      setPreviewUrl(temp);
    };
    fileReader.readAsDataURL(file);
  };
  const removeImageFromFileAndPreview=(item,index)=>{
    let fileTemp= selectedFiles.slice(0)
    console.log("b",fileTemp)
    fileTemp.splice(index,1)
    let previewUrlTemp= previewUrl.slice(0)
    previewUrlTemp.splice(index,1)
    console.log("a",fileTemp)
    setselectedFiles(fileTemp)
    setPreviewUrl(previewUrlTemp)
  
  }

  const handleSelectTrim=(item)=>{
      const {value}= item
      const selectedtrim= trimOptions.find(item=> item.name= value)
      console.log(selectedtrim)
      let temp= []
      for (const iterator of selectedtrim.styles) {
        temp.push(iterator.name)
      }
      setinput({...input, trim:value})
      setstyleOptions(temp)
  }


  const handleSelectStyle=(item)=>{
    const {value}= item
    setinput({...input, style:value})
  
}


const renderImageSection = () => {
  return (
    <div>


      <div className='flex space-x-4 mb-10'>
        
        {previewUrl.map((item, index) => (
          <div className='h-28  overflow-hidden  w-40'>
            <button
              className="text-black z-10 absolute m-[5px]"
              onClick={() => removeImageFromFileAndPreview(item, index)}>
              <AiFillCloseCircle
                size={20} />
            </button>
            <img className='w-full  rounded-md' src={item} key={index + item} />
          </div>

        ))}
      </div>
    </div>

  )
}

const renderButtonView = () => {
  return (
    <div className='flex items-center justify-between'>

<div className='flex flex-col  md:w-[45%] -mt-6  space-x-4 md:flex-row'>
    <div >
      <label className={`${formStyle.label} font-bold`}>VIM Number</label>
        <div className="mt-1 mb-1">
          <input
            name={"vin"}
            className={formStyle.input}
            value={input.vin}
            onChange={onInputChange}
          />
        </div>
    </div>

    <div className='md:w-[30%]'>
    <button 
      onClick={()=>handleFetchDetails()}
      className={`rounded-md bg-secondary/60 hover:bg-primary mt-8 hover:shadow-lg  duration-300
      ease-in-out px-4 h-[40px] flex items-center justify-center`}
      >
          <p className="text-white font-semibold text-xs">Fetch Details</p>
    </button>

    </div>

  </div>

      <div className='flex items-center  space-x-4 pt-7'>
        <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
        <button

          onClick={() => isLoading ? {} : handleFileClick()}
          className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
   hover:bg-secondary hover:text-white w-32 mb-10 hover:shadow-lg  duration-300
  ease-in-out px-4 h-[40px] flex items-center justify-center`}
        >
          <p className="font-semibold text-xs">Upload Images</p>
        </button>
        <button

          onClick={() => isLoading ? {} : handleSubmit()}
          className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
     hover:bg-secondary hover:text-white w-32 mb-10 hover:shadow-lg  duration-300
    ease-in-out px-4 h-[40px] flex space-x-3 items-center justify-center`}
        >
          {isLoading && <BeatLoader
            color={'#ff464c'}
            loading={isLoading}
            size={5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />}
          <p className="font-semibold text-xs">Save</p>
        </button>
      </div>
    </div>
  )
}

const renderVehicleAttributes = () => {
  return (
    <>

      <p className={`${formStyle.h1Dashboard} px-2 text-xl`}>Vehicle Attributes</p>
      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Year</label>
          <div className="mt-1 mb-1">
            <InputMask
            type="numeric"
            mask="9999"
              name={"year"}
              className={formStyle.input}
              value={input.year}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Make</label>
          <div className="mt-1 mb-1">
            <input
              name={"make"}
              className={formStyle.input}
              value={input.make}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Model</label>
          <div className="mt-1 mb-1">
            <input
              name={"model"}
              className={formStyle.input}
              value={input.model}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Trim</label>
          <div className="mt-1 mb-1">
              {/* <input
                  name={"trim"}
                  className={formStyle.input}
                  value={input.trim}
                  onChange={onInputChange}
                /> */}
            <Dropdown options={trimOptionCustomList}
              value={input.trim}
              onChange={handleSelectTrim}
              placeholder="Select" />
          </div>
        </div>

        <div className='md:w-[35%]'>
          <label className={`${formStyle.label} font-bold`}>Style</label>
          <div className="mt-1 mb-1">

              {/* <input
                  name={"style"}
                  className={formStyle.input}
                  value={input.style}
                  onChange={onInputChange}
                /> */}
            <Dropdown options={styleOptions}
              value={input.style}
              onChange={handleSelectStyle}
              placeholder="Select" />
          </div>
        </div>

      </div>

      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Type</label>
          <div className="mt-1 mb-1">
            <input
              name={"type"}
              className={formStyle.input}
              value={input.type}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Size</label>
          <div className="mt-1 mb-1">
            <input
              name={"size"}
              className={formStyle.input}
              value={input.size}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Category</label>
          <div className="mt-1 mb-1">
            <input
              name={"category"}
              className={formStyle.input}
              value={input.category}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Made In</label>
          <div className="mt-1 mb-1">
            <input
              name={"made_in"}
              className={formStyle.input}
              value={input.made_in}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Made In City</label>
          <div className="mt-1 mb-1">
            <input
              name={"made_in_city"}
              className={formStyle.input}
              value={input.made_in_city}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>

      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Doors</label>
          <div className="mt-1 mb-1">
            <InputMask
            mask={"9 - doors"}
              name={"doors"}
              className={formStyle.input}
              value={input.doors}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Fuel Type</label>
          <div className="mt-1 mb-1">
            <input
            type="numeric"
              name={"fuel_type"}
              className={formStyle.input}
              value={input.fuel_type}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Fuel Capaciy</label>
          <div className="mt-1 mb-1">
            <InputMask
           
              name={"fuel_capacity"}
              className={formStyle.input}
              value={input.fuel_capacity}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>City Mileage</label>
          <div className="mt-1 mb-1">
            <input
              name={"city_mileage"}
              className={formStyle.input}
              value={input.city_mileage}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Highway Mileage</label>
          <div className="mt-1 mb-1">
            <input
              name={"highway_mileage"}
              className={formStyle.input}
              value={input.highway_mileage}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>
      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Engine</label>
          <div className="mt-1 mb-1">
            <input
              name={"engine"}
              className={formStyle.input}
              value={input.engine}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Engine Size</label>
          <div className="mt-1 mb-1">
            <input
              name={"engine_size"}
              className={formStyle.input}
              value={input.engine_size}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Engine Cylinders</label>
          <div className="mt-1 mb-1">
            <input
              name={"engine_cylinders"}
              className={formStyle.input}
              value={input.engine_cylinders}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Transmission</label>
          <div className="mt-1 mb-1">
            <input
              name={"transmission"}
              className={formStyle.input}
              value={input.transmission}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Transmission Type</label>
          <div className="mt-1 mb-1">
            <input
              name={"transmission_type"}
              className={formStyle.input}
              value={input.transmission_type}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>
      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Transimission Speed</label>
          <div className="mt-1 mb-1">
            <input
              name={"transmission_speeds"}
              className={formStyle.input}
              value={input.transmission_speeds}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Drivetrain</label>
          <div className="mt-1 mb-1">
            <input
              name={"drivetraine"}
              className={formStyle.input}
              value={input.drivetrain}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Anti brake system</label>
          <div className="mt-1 mb-1">
            <input
              name={"anti_brake_system"}
              className={formStyle.input}
              value={input.anti_brake_system}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Steering type</label>
          <div className="mt-1 mb-1">
            <input
              name={"steering_type"}
              className={formStyle.input}
              value={input.steering_type}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Curb Weight</label>
          <div className="mt-1 mb-1">
            <input
              name={"curb_weight"}
              className={formStyle.input}
              value={input.curb_weight}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>
      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[40%]'>
          <label className={`${formStyle.label} font-bold`}>Gross vehicle weight rating</label>
          <div className="mt-1 mb-1">
            <input
              name={"gross_vehicle_weight_rating"}
              className={formStyle.input}
              value={input.gross_vehicle_weight_rating === "" ? 'N/A' : input.gross_vehicle_weight_rating}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Overall height</label>
          <div className="mt-1 mb-1">
            <input
              name={"overall_height"}
              className={formStyle.input}
              value={input.overall_height}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Overall length</label>
          <div className="mt-1 mb-1">
            <input
              name={"overall_length"}
              className={formStyle.input}
              value={input.overall_length}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Overall width</label>
          <div className="mt-1 mb-1">
            <input
              name={"overall_width"}
              className={formStyle.input}
              value={input.overall_width}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Wheelbase length</label>
          <div className="mt-1 mb-1">
            <input
              name={"style"}
              className={formStyle.input}
              value={input.wheelbase_length}
              onChange={onInputChange}
            />
          </div>
        </div>

      </div>
      <div className='flex flex-col space-x-4 md:flex-row'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Standard seating</label>
          <div className="mt-1 mb-1">
            <input
              name={"standard_seating"}
              className={formStyle.input}
              value={input.standard_seating}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Invoice price</label>
          <div className="mt-1 mb-1">
            <input
              name={"invoice_price"}
              className={formStyle.input}
              value={input.invoice_price}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Delivery charges</label>
          <div className="mt-1 mb-1">
            <input
              name={"delivery_charges"}
              className={formStyle.input}
              value={input.delivery_charges}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[40%]'>
          <label className={`${formStyle.label} font-bold`}>Manufacturer suggested retail price</label>
          <div className="mt-1 mb-1">
            <input
              name={"manufacturer_suggested_retail_price"}
              className={formStyle.input}
              value={input.manufacturer_suggested_retail_price}
              onChange={onInputChange}
            />
          </div>
        </div>



      </div>
    </>
  )
}

const renderCustomAttributesView=()=>{
  return(
    <div>
      <div >
        <p className={`${formStyle.h1Dashboard} px-2 text-xl`}>Custom Attributes</p>
        <div className='flex space-x-4'>
        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Selling Price</label>
          <div className="mt-1 mb-1">
            <input
              name={"sellingPrice"}
              className={formStyle.input}
              value={input.sellingPrice}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className='md:w-[30%]'>
          <label className={`${formStyle.label} font-bold`}>Color</label>
          <div className="mt-1 mb-1">
            <input
              name={"color"}
              className={formStyle.input}
              value={input.color}
              onChange={onInputChange}
            />
          </div>
        </div>


        </div>


      </div>

      
    </div>
  )
}
const renderDefaultView = () => {
  return (
    <div>
      <p
        onClick={() => toggleForm()}
        className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}>Back</p>

        <p className={`${formStyle.h1Dashboard} px-2`}>Add New Vehicle</p>


        <div className='flex md:flex-row flex-col space-x-6'>

        <div className="p-2 md:w-[70vw]">
          {renderButtonView()}
          {renderImageSection()}
          {renderVehicleAttributes()}
          {renderCustomAttributesView()}

        </div>
      </div>
      <ToastContainer />

    </div>
  )
}


  return (
    renderDefaultView()
  )
}

export default VehicleForm