import React, { useState, useRef, useEffect } from 'react'
import { formStyle } from '../../style/adminStyle'
import { toast, ToastContainer } from 'react-toastify';
import { AiFillCloseCircle } from "react-icons/ai"
import axios from 'axios';
import { useDispatch } from 'react-redux'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { uploadMedia, deleteImage } from '../../store/features/media/mediaService';
import { updateVehicleDetails } from '../../store/features/vehicle/vehicleService';
import BeatLoader from "react-spinners/BeatLoader";
import { imageURL } from '../../store/api';
import ModalComponent from '../../component/ModalComponent';



const VehicleEditForm = ({ toggleForm, data }) => {

  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const [input, setinput] = useState({});
  const [trimOptions, settrimOptions] = useState([])
  const [trimOptionCustomList, settrimOptionCustomList] = useState([])
  const [styleOptions, setstyleOptions] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [justUploadedImages, setjustUploadedImages] = useState([])
  const [deleteImages, setdeleteImages] = useState([])
  const [addNewCustomFieldModal, setaddNewCustomFieldModal] = useState(false)
  const [addNewFields, setaddNewFields] = useState({})



  useEffect(() => {
    if (Object.keys(data).length > 0 && Object.keys(input).length <= 0) {
      let obj = {
        vin: data.vin,
        images: data.images,
        customFields:data.customFields||[],
        ...data.details
      }
      setinput(obj)
    }
  }, [Object.keys(data).length])


  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (file) => {
    const formData = new FormData();

    formData.append('file', file);


    await dispatch(uploadMedia(formData, (response) => {
      if (response.data && response.data.url) {


        //  Remove the uploaded file from the selected files array after successful upload
        setselectedFiles((prevSelectedFiles) =>
          prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
        );

        let temp = justUploadedImages
        temp.push(response.data.url)
        setjustUploadedImages(temp)
      } else {
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

  const handleDelete = async (filename) => {


    await dispatch(deleteImage(filename, (response) => {
      if (response.message) {
        setdeleteImages(prev => prev.filter(item => item !== filename))
      } else {
        toast.error('Network Error')
      }
    }))
  }

  const handleDeleteAll = async () => {

    for (const file of deleteImages) {
      await handleDelete(file)
    }
  }

  const handleOnChangeAddNewField=(e)=>{
    const {name,value}= e.target
    setaddNewFields({[name]:value})
  }
 
  const submitData = async () => {
    try {
      // make an object with all fields 
      let details = Object.assign({}, input)
      delete details.vin;



      let obj = {
        details: details,
        images: [...input.images, ...justUploadedImages]
      }
      console.log(data._id, obj, 1)
      dispatch(updateVehicleDetails(data._id, obj, () => {
        console.log(2)
        handleDeleteAll()
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
        toggleForm()


      }))

      // submit the data
      // clear the input files


    } catch (error) {
      toast.error('Network Error');
      console.log(error)
    }
  }


  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      // check if the user has upload any new image then upload it into db and get new url
      // if multiple image then loop it and upload it one by one

      if (selectedFiles.length > 0) {
        await handleUploadAll()
      } else {

        submitData()
      }



    } catch (error) {
      toast.error('Metwork Error');
      console.log(error)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click();
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let temp = selectedFiles.slice(0)
    temp.push(file)
    setselectedFiles(temp);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let temp = previewUrl.slice(0)
      temp.push(fileReader.result)
      setPreviewUrl(temp);
    };
    fileReader.readAsDataURL(file);
  };
  const removeImageFromFileAndPreview = (item, index) => {
    let fileTemp = selectedFiles.slice(0)
    fileTemp.splice(index, 1)
    let previewUrlTemp = previewUrl.slice(0)
    previewUrlTemp.splice(index, 1)
    setselectedFiles(fileTemp)
    setPreviewUrl(previewUrlTemp)

  }

  const handleSelectTrim = (item) => {
    const { value } = item
    const selectedtrim = trimOptions.find(item => item.name = value)
    let temp = []
    for (const iterator of selectedtrim.styles) {
      temp.push(iterator.name)
    }
    setinput({ ...input, trim: value })
    setstyleOptions(temp)
  }


  const handleSelectStyle = (item) => {
    const { value } = item
    setinput({ ...input, style: value })

  }

  const handleDeleteDBImages = (item, index) => {
    //remove image from array but not update in database
    // instead save the file name in delete Images array 
    // on save we will delete these images

    let temp = input.images.slice(0)
    temp.splice(index, 1)
    setinput({ ...input, images: temp })
    let temp2 = deleteImages.slice(0)
    temp2.push(item)
    setdeleteImages(temp)

  }

  const renderImageSection = () => {
    return (
      <div>


        <div className='flex space-x-4 mb-10'>
          {!!input.images && input.images.map((item, index) => (
            <div className='h-28  overflow-hidden  w-40'>
              <button
                className="text-black z-10 absolute m-[5px]"
                onClick={() => handleDeleteDBImages(item, index)}>
                <AiFillCloseCircle
                  size={20} />
              </button>
              <img className='w-full  rounded-md' src={imageURL + item} key={index + item} />
            </div>

          ))}
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

  const handleSubmitAddNewField=()=>{
    console.log(addNewFields)
    let temp = input.customFields.slice(0)
    temp.push({
      label:addNewFields.label,
      value:addNewFields.value

    })
   setinput({
    ...input,
    customFields:temp
  })
  setaddNewCustomFieldModal(false)
  setaddNewFields({})
  }

  const handleOnChangeEditNewField=(e)=>{
    const {name, value}= e.target
    console.log(name, value)
  }
  const renderButtonView = () => {
    return (
      <div className='flex items-center justify-between'>

        <div className='flex flex-col  md:w-[45%] -mt-6  space-x-4 md:flex-row'>
          <div >
            <label className={`${formStyle.label} font-bold`}>VIM Number</label>
            <div className="mt-1 mb-1">
              <input
                disabled={true}
                name={"vin"}
                className={`${formStyle.input} bg-slate-100`}
                value={input.vin}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className='md:w-[30%]'>
            {/* <button 
      onClick={()=>handleFetchDetails()}
      className={`rounded-md bg-secondary/60 hover:bg-primary mt-8 hover:shadow-lg  duration-300
      ease-in-out px-4 h-[40px] flex items-center justify-center`}
      >
          <p className="text-white font-semibold text-xs">Fetch Details</p>
    </button> */}

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
              <input
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

              <Dropdown options={trimOptionCustomList}
                value={input.trim}
                onChange={handleSelectTrim}
                placeholder="Select" />
            </div>
          </div>

          <div className='md:w-[35%]'>
            <label className={`${formStyle.label} font-bold`}>Style</label>
            <div className="mt-1 mb-1">

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
              <input
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
              <input
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
    console.log(input.customFields)
    return(
      <div>
        <div className='flex items-center justify-between'>
          <p className={`${formStyle.h1Dashboard} px-2 text-xl`}>Custom Attributes</p>
          
          <button
          onClick={() => isLoading ? {} : setaddNewCustomFieldModal(true)}
            className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
     hover:bg-secondary hover:text-white w-32 mb-10 hover:shadow-lg  duration-300
    ease-in-out px-4 h-[40px] flex items-center justify-center`}
          >
            <p className="font-semibold text-xs">Add New</p>
          </button>
        </div>

        {!!input.customFields&& input.customFields.map((item,key)=>(
          <div className='md:w-[40%]'>
            <label className={`${formStyle.label} font-bold`}>{item.label}</label>
            <div className="mt-1 mb-1">
              <input
                name={item.label}
                className={formStyle.input}
                value={item.value}
                onChange={handleOnChangeEditNewField}
              />
            </div>
          </div>
        ))}

        
      </div>
    )
  }

  const renderAddNewFieldModal=()=>{
    return(
      <ModalComponent showModal={addNewCustomFieldModal} toggleModal={()=>setaddNewCustomFieldModal(false)}>
        <div className='shadow-md px-10 py-5 rounded-md'>
        <p className={`${formStyle.h1Dashboard} text-xl px-2`}>Add New Custom Attribute</p>

         <div className='md:w-[100%]'>
            <label className={`${formStyle.label} font-bold`}>Label</label>
            <div className="mt-1 mb-1">
              <input
                name={"label"}
                className={formStyle.input}
                value={addNewFields.label}
                onChange={handleOnChangeAddNewField}
              />
            </div>
          </div>
          <div className='md:w-[100%]'>
            <label className={`${formStyle.label} font-bold`}>Value</label>
            <div className="mt-1 mb-1">
              <input
                name={"value"}
                className={formStyle.input}
                value={addNewFields.value}
                onChange={handleOnChangeAddNewField}
              />
            </div>
            <button
          onClick={() => isLoading ? {} :  handleSubmitAddNewField()}
            className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
    bg-secondary text-white w-32 mb-10 hover:shadow-lg  duration-300
    ease-in-out px-4 h-[40px] flex items-center justify-center`}
          >
            <p className="font-semibold text-xs">Submit</p>
          </button>
          </div>
          </div>
      </ModalComponent>
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
            {renderAddNewFieldModal()}

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

export default VehicleEditForm