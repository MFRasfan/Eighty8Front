import React, { useState, useRef, useEffect } from "react";
import { formStyle } from "../../style/adminStyle";
import { Zoom } from "react-slideshow-image";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { uploadMedia, deleteImage } from "../../store/features/media/mediaService";
import { addVehicle, updateVehicleDetails, getVehicleDetailsById } from "../../store/features/vehicle/vehicleService";
import BeatLoader from "react-spinners/BeatLoader";
import InputMask from "react-input-mask";
import { imageURL, url } from "../../store/api";
import "react-tabs/style/react-tabs.css";

import { BsTrashFill } from "react-icons/bs";

const VehicleForm = ({ toggleForm, edit=false, editData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const fileInputRef = useRef(null);
  // 1NXBR32E85Z505904
  const [input, setinput] = useState({ vin: "" });
  const [trimOptions, settrimOptions] = useState([]);
  const [trimOptionCustomList, settrimOptionCustomList] = useState([]);
  const [styleOptions, setstyleOptions] = useState([]);
  // const [slideImages, setslideImages] = useState([])
  const [selectedFiles, setselectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [justUploadedImages, setjustUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vimNumber, setVimNumber] = useState(null);
  const [activeTab, setactiveTab] = useState("Info");
  const [deleteImages, setdeleteImages] = useState([])
  const [expenseItems, setExpenseItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState(13);

  const handleAddExpense = () => {
    const newExpense = {
      item: "",
      amount: "",
      taxPercentage: 13,
      taxAmount: 0,
    };
    setExpenseItems([...expenseItems, newExpense]);
  };

  useEffect(() => {
    
    if(Object.keys(input).length<=1){
      dispatch(getVehicleDetailsById(editData._id, response=>{
        setinput({
          vin:response.vin,
        ...response.details,
          images:response.images
        })
        setExpenseItems(response?.expenses?.expenseItems ||[])
        setPurchases(response?.purchases?.purchaseItems||[])
        setSales(response?.sales?.salesItems||[])
        console.log(response)
      }))
    }
   
  }, [editData._id])


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
  const handleExpenseInputChange = (index, field, value) => {
    const updatedExpenses = [...expenseItems];
    updatedExpenses[index][field] = value;

    if (field === "amount") {
      const tax = (value * taxPercentage) / 100;
      updatedExpenses[index].taxAmount = tax;
    } else if (field === "taxPercentage") {
      const tax = (updatedExpenses[index].amount * value) / 100;
      updatedExpenses[index].taxAmount = tax;
      updatedExpenses[index].taxPercentage = value;
    }
    setExpenseItems(updatedExpenses);
  };



  const [purchases, setPurchases] = React.useState([]);

  const handleAddPurchase = () => {
    const newPurchase = {
      item: "",
      amount: "",
      taxPercentage: 13,
      taxAmount: 0,
      toBeDeleted: false, // New field to track whether the row should be deleted
    };
    setPurchases([...purchases, newPurchase]);
  };


  const handleInputChange = (index, field, value) => {
    const updatedPurchases = [...purchases];
    const updatedPurchase = { ...updatedPurchases[index] };
    updatedPurchase[field] = value;

    if (field === "amount") {
      const tax = (value * updatedPurchase.taxPercentage) / 100;
      updatedPurchase.taxAmount = tax;
    } else if (field === "taxPercentage") {
      const tax = (updatedPurchase.amount * value) / 100;
      updatedPurchase.taxAmount = tax;
      updatedPurchase.taxPercentage = value;
    }

    updatedPurchases[index] = updatedPurchase;
    setPurchases(updatedPurchases);
  };

  const handleDeletePurchase = (index) => {
    let updatedPurchases = [...purchases];

    updatedPurchases.splice(index,1)
    setPurchases(updatedPurchases);
  };

  const handleDeleteSales = (index) => {
    const updatedSales = [...sales];
    updatedSales.splice(index,1)
    setSales(updatedSales);
  };
  const handleDeleteExpenses = (index) => {
    const updatedExpenses = [...expenseItems];
    updatedExpenses[index].toBeDeleted = true;
    updatedExpenses.splice(index,1)
    setExpenseItems(updatedExpenses);
  };

  const thead = [
    "Description",
    "Amount",
    "HST %",
    "HST Amount",
    "Total",
    "Action",
  ];


  

  const [sales, setSales] = React.useState([]);

  const handleAddSale = () => {
    const newSale = {
      item: "",
      amount: "",
      taxPercentage: 13,
      taxAmount: 0,
      cost: "",
    };
    setSales([...sales, newSale]);
  };

  const handleSaveSale = () => {
    console.log("Saved sales:", sales);
  };

  const handleSalesInputChange = (index, field, value) => {
    const updatedSales = [...sales];
    updatedSales[index][field] = value;

    if (field === "amount") {
      const tax = (value * taxPercentage) / 100;
      updatedSales[index].taxAmount = tax;
    } else if (field === "taxPercentage") {
      const tax = (updatedSales[index].amount * value) / 100;
      updatedSales[index].taxAmount = tax;
      updatedSales[index].taxPercentage = value;
    }
    setSales(updatedSales);
  };

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

  const handleUpload = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    await dispatch(
      uploadMedia(formData, (response) => {
        if (response.data && response.data.url) {
          //  Remove the uploaded file from the selected files array after successful upload
          setselectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
          );

          let temp = justUploadedImages;
          temp.push(response.data.url);
       
          setjustUploadedImages(temp);
        } else {
          toast.error("Network Error");
        }
      })
    );
  };

  const handleUploadAll = async () => {
    for (const file of selectedFiles) {
      await handleUpload(file);
    }

    submitData();
  };
  const submitEditData = async () => {
    try {
      // make an object with all fields 
      let inputData = Object.assign({}, input)
      delete inputData.vin;
  
    
      let obj = {
        // vin: input.vin,
        details: inputData.details,
        images: [...input.images, ...justUploadedImages],
        sales:{
        salesItems:sales,
          hstTotal: String( sales.reduce((total, obj) => total + obj.taxAmount, 0)),
          costTotal:sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.cost)), 0) ||0,
          grandTotal:sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) +  parseFloat(obj2.cost)+ parseFloat(obj2.taxAmount)), 0) ||0
        },
        expenses:{
          expenseItems,
          hstTotal:String( expenseItems.reduce((total, obj) => total + obj.taxAmount, 0)),
          grandTotal:expenseItems.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0
        },
        purchases:{
          purchaseItems:purchases,
          hstTotal:String( purchases.reduce((total, obj) => total + obj.taxAmount, 0)),
          grandTotal: purchases.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0
        },
       
      };
      dispatch(updateVehicleDetails(editData._id, obj, () => {
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
          // "invoice_price": "",
          // "delivery_charges": "",
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
  const submitData = async () => {
    try {
      // make an object with all fields
      let details = Object.assign({}, input);
      delete details.vin;
      let cityMileageTemp =
        details.city_mileage && details.city_mileage.split(" ");
      details.cityMileageMin = Number(cityMileageTemp[0]);
      details.cityMileageMax = Number(cityMileageTemp[2]);

      let highwayMileageTemp =
        details.highway_mileage && details.highway_mileage.split(" ");
      details.highwayMileageMin = Number(highwayMileageTemp[0]);
      details.highwayMileageMax = Number(highwayMileageTemp[2]);

      details.sellingPrice = Number(details.sellingPrice);

      let obj = {
        vin: input.vin,
        details: details,
        images: justUploadedImages,
        sales:{
        salesItems:sales,
          hstTotal: String( sales.reduce((total, obj) => total + obj.taxAmount, 0)),
          costTotal:sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.cost)), 0) ||0,
          grandTotal:sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) +  parseFloat(obj2.cost)+ parseFloat(obj2.taxAmount)), 0) ||0
        },
        expenses:{
          expenseItems,
          hstTotal:String( expenseItems.reduce((total, obj) => total + obj.taxAmount, 0)),
          grandTotal:expenseItems.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0
        },
        purchases:{
          purchaseItems:purchases,
          hstTotal:String( purchases.reduce((total, obj) => total + obj.taxAmount, 0)),
          grandTotal: purchases.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0
        },
       
      };

      console.log(obj)
      dispatch(
        addVehicle(obj, () => {
          setinput({
            year: "",
            make: "",
            model: "",
            trim: "",
            style: "",
            type: "",
            size: "",
            category: "",
            made_in: "",
            made_in_city: "",
            doors: "",
            fuel_type: "",
            fuel_capacity: "",
            city_mileage: "",
            highway_mileage: "",
            engine: "",
            engine_size: "",
            engine_cylinders: "",
            transmission: "",
            transmission_type: "",
            transmission_speeds: "",
            drivetrain: "",
            anti_brake_system: "",
            steering_type: "",
            curb_weight: "",
            gross_vehicle_weight_rating: "",
            overall_height: "",
            sellingPrice: "",
            overall_length: "",
            overall_width: "",
            wheelbase_length: "",
            standard_seating: "",
            // invoice_price: "",
            // delivery_charges: "",
            manufacturer_suggested_retail_price: "",
          });
          setIsLoading(false);
          setselectedFiles([]);
          setPreviewUrl([]);
          setExpenseItems([]);
          setPurchases([]);
          setSales([]);
          setjustUploadedImages([]);
        })
      );

    

      // submit the data
      // clear the input files
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // setIsLoading(true);

      // check if the user has upload any new image then upload it into db and get new url
      // if multiple image then loop it and upload it one by one

      let isValid = true;
      if (!input.vin) {
        throw "Please Enter Vin Number";
      }
      if (Object.keys(input).length < 34) {
        throw "Please enter all fields";
      }
      if (selectedFiles.length === 0 && !edit) {
        throw "Please upload atleast one image";
      }
      if (input.sellingPrice === 0) {
        throw "Please select selling price";
      }

      if (isValid) {
        if (selectedFiles.length > 0) {
          await handleUploadAll();
        } else {
           edit? submitEditData(): submitData();
        }
      }
    } catch (error) {
      toast.error(error || "Network Error");
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFetchDetails = async (vin) => {
    try {
      if (!input.vin||!vin) {
        return toast.error("Please enter vin number");
      }

      let uri = `${url.carAPI.fetchCarDetailsByVin}${input.vin}`;
      const { data } = await axios.get(uri);
      setinput({ ...input, ...data.attributes });
    } catch (error) {
      console.log(error);
      return toast.error("Network error");
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    let temp = [...selectedFiles];
    let tempPreUrl = [...previewUrl];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      temp.push(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        tempPreUrl.push(fileReader.result);
        if (i === files.length - 1) {
          setselectedFiles(temp);
          setPreviewUrl(tempPreUrl);
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  const removeImageFromFileAndPreview = (item, index) => {
    let fileTemp = selectedFiles.slice(0);
    fileTemp.splice(index, 1);
    let previewUrlTemp = previewUrl.slice(0);
    previewUrlTemp.splice(index, 1);
    setselectedFiles(fileTemp);
    setPreviewUrl(previewUrlTemp);
  };

  const handleSelectTrim = (item) => {
    const { value } = item;
    const selectedtrim = trimOptions.find((item) => (item.name = value));
    let temp = [];
    for (const iterator of selectedtrim.styles) {
      temp.push(iterator.name);
    }
    setinput({ ...input, trim: value });
    setstyleOptions(temp);
  };

  const handleSelectStyle = (item) => {
    const { value } = item;
    setinput({ ...input, style: value });
  };
  const style = {
    activeTab: `border-b-2 text-gray-700 tracking-wide border-b-primary font-bold`,
    tab: "text-gray-500 text-base md:text-lg  duration-300 pb-1 tracking-wide ",
  };

  const renderTabs = () => {
    return (
      <div className="flex justify-between items-start">
      <div className="flex space-x-3 w-[70%]  md:space-x-7 border-b-[1px] border-b-slate-200 mt-2 mb-6">
        <button
          className={`${style.tab}  ${activeTab === "Info" &&  style.activeTab} `}
          onClick={() => setactiveTab("Info")}
        >
          <p>Vehicle Information</p>
        </button>
        {/* <button className={`${style.tab} ${activeTab==="Pricing" && style.activeTab}`} onClick={()=>setactiveTab("Pricing")}>
               <p>Pricing</p>
           </button> */}
        <button
          className={`${style.tab} ${
            activeTab === "Purchase" && style.activeTab
          }`}
          onClick={() => setactiveTab("Purchase")}
        >
          <p>Purchase</p>
        </button>
        <button
          className={`${style.tab} ${
            activeTab === "Expenses" && style.activeTab
          }`}
          onClick={() => setactiveTab("Expenses")}
        >
          <p>Expenses</p>
        </button>
        <button
          className={`${style.tab} ${activeTab === "Sales" && style.activeTab}`}
          onClick={() => setactiveTab("Sales")}
        >
          <p>Sales</p>
        </button>
      </div>
        <div className=" flex pb-5 justify-end">
        <button
            onClick={() => (isLoading ? {} : handleSubmit())}
            className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
     hover:bg-secondary hover:text-white w-32 hover:shadow-lg  duration-300
    ease-in-out px-4 h-[40px] flex space-x-3 items-center justify-center`}
          >
            {isLoading && (
              <BeatLoader
                color={"#ff464c"}
                loading={isLoading}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            <p className="font-semibold text-xs">Save</p>
          </button>
          </div>
          </div>
    );
  };

  
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
        <div className="flex space-x-4 mb-10">
        {!!input.images && input.images.map((item, index) => (
            <div key={item._id} className='h-28  overflow-hidden  w-40'>
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
            // {selectedFiles.map((item, index) => (
            <div  key={item._id}  className="h-28  overflow-hidden  w-40">
              <button
                className="text-black z-10 absolute m-[5px]"
                onClick={() => removeImageFromFileAndPreview(item, index)}
              >
                <AiFillCloseCircle size={20} />
              </button>
              <img
                className="w-full  rounded-md"
                src={item}
                key={index + item}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderButtonView = () => {
    return (
      <div className="flex items-center justify-between mt-4">
      {edit?
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
        :  
          <div className="flex flex-col  md:w-[45%] -mt-6  space-x-4 md:flex-row">
          <div>
            <label className={`${formStyle.label} font-bold`}>VIM Number</label>
            <div className="mt-1 mb-1">
              <input
                name={"vin"}
                className={formStyle.input}
                value={input.vin}
                onChange={(e) => {
                  setVimNumber(e.target.value);
                  onInputChange(e);
                }}
              />
            </div>
          </div>
          <div className="md:w-[30%]">
            <button
              onClick={() => handleFetchDetails()}
              className={`rounded-md bg-secondary/60 hover:bg-primary mt-8 hover:shadow-lg  duration-300
      ease-in-out px-4 h-[40px] flex items-center justify-center`}
            >
              <p className="text-white font-semibold text-xs">Fetch Details</p>
            </button>
          </div>
        </div>}

        <div className="flex items-center  space-x-4 pt-7">
          <input
            multiple
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <button
            onClick={() => (isLoading ? {} : handleFileClick())}
            className={`rounded-md border-[1px] border-secondary/60 text-secondary/60 
   hover:bg-secondary hover:text-white w-32 mb-10 hover:shadow-lg  duration-300
  ease-in-out px-4 h-[40px] flex items-center justify-center`}
          >
            <p className="font-semibold text-xs">Upload Images</p>
          </button>
        
        </div>
      </div>
    );
  };

  const renderVehicleAttributes = () => {
    return (
      <>
        <p className={`${formStyle.h1Dashboard} px-2 text-xl`}>
          Vehicle Attributes
        </p>
        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>Trim</label>
            <div className="mt-1 mb-1">
              {/* <input
                  name={"trim"}
                  className={formStyle.input}
                  value={input.trim}
                  onChange={onInputChange}
                /> */}
              <Dropdown
                options={trimOptionCustomList}
                value={input.trim}
                onChange={handleSelectTrim}
                placeholder="Select"
              />
            </div>
          </div>

          <div className="md:w-[35%]">
            <label className={`${formStyle.label} font-bold`}>Style</label>
            <div className="mt-1 mb-1">
              {/* <input
                  name={"style"}
                  className={formStyle.input}
                  value={input.style}
                  onChange={onInputChange}
                /> */}
              <Dropdown
                options={styleOptions}
                value={input.style}
                onChange={handleSelectStyle}
                placeholder="Select"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Made In City
            </label>
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

        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Fuel Capaciy
            </label>
            <div className="mt-1 mb-1">
              <InputMask
                name={"fuel_capacity"}
                className={formStyle.input}
                value={input.fuel_capacity}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              City Mileage
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"city_mileage"}
                className={formStyle.input}
                value={input.city_mileage}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Highway Mileage
            </label>
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
        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Engine Size
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"engine_size"}
                className={formStyle.input}
                value={input.engine_size}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Engine Cylinders
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"engine_cylinders"}
                className={formStyle.input}
                value={input.engine_cylinders}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Transmission
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"transmission"}
                className={formStyle.input}
                value={input.transmission}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Transmission Type
            </label>
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
        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Transimission Speed
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"transmission_speeds"}
                className={formStyle.input}
                value={input.transmission_speeds}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
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

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Anti brake system
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"anti_brake_system"}
                className={formStyle.input}
                value={input.anti_brake_system}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Steering type
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"steering_type"}
                className={formStyle.input}
                value={input.steering_type}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Curb Weight
            </label>
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
        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[40%]">
            <label className={`${formStyle.label} font-bold`}>
              Gross vehicle weight rating
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"gross_vehicle_weight_rating"}
                className={formStyle.input}
                value={
                  input.gross_vehicle_weight_rating === ""
                    ? "N/A"
                    : input.gross_vehicle_weight_rating
                }
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Overall height
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"overall_height"}
                className={formStyle.input}
                value={input.overall_height}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Overall length
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"overall_length"}
                className={formStyle.input}
                value={input.overall_length}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Overall width
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"overall_width"}
                className={formStyle.input}
                value={input.overall_width}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Wheelbase length
            </label>
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
        <div className="flex flex-col space-x-4 md:flex-row">
          <div className="md:w-[25%]">
            <label className={`${formStyle.label} font-bold`}>
              Standard seating
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"standard_seating"}
                className={formStyle.input}
                value={input.standard_seating}
                onChange={onInputChange}
              />
            </div>
          </div>

          {/* <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Invoice price
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"invoice_price"}
                className={formStyle.input}
                value={input.invoice_price}
                onChange={onInputChange}
              />
            </div>
          </div> */}

          {/* <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Delivery charges
            </label>
            <div className="mt-1 mb-1">
              <input
                name={"delivery_charges"}
                className={formStyle.input}
                value={input.delivery_charges}
                onChange={onInputChange}
              />
            </div>
          </div> */}

          <div className="md:w-[30%]">
            <label className={`${formStyle.label} font-bold`}>
              Manufacturer suggested retail price
            </label>
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
    );
  };

  const renderCustomAttributesView = () => {
    return (
      <div>
        <div>
          <p className={`${formStyle.h1Dashboard} px-2 text-xl`}>
            Custom Attributes
          </p>
          <div className="flex space-x-4">
            <div className="md:w-[30%]">
              <label className={`${formStyle.label} font-bold`}>
                Selling Price
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"sellingPrice"}
                  className={formStyle.input}
                  value={input.sellingPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="md:w-[30%]">
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

            <div className="md:w-[30%]">
              <label className={`${formStyle.label} font-bold`}>Stock #</label>
              <div className="mt-1 mb-1">
                <input
                  name={"color"}
                  disabled
                  className={formStyle.input}
                  value={
                    vimNumber
                      ? vimNumber.length > 0
                        ? `EEA-${vimNumber.slice(-6)}`
                        : `EEA-`
                      : `EEA-`
                  }
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const purchaseView = () => {
    return (
      <>
        <div className="flex mt-4 items-center justify-end">
          <div>
            <div className="flex space-x-4 text-xs text-white">
              {/* {purchases.length > 0 ? (
                <div
                  onClick={handleSavePurchase}
                  className="bg-secondary w-32  px-4 h-[35px] flex space-x-3  rounded-md items-center justify-center
                cursor-pointer hover:bg-primary duration-300 ease-in-out"
                >
                  Save Purchase
                </div>
              ) : null} */}
              <div
                // onClick={()=>setaddNewModal(true)}
                onClick={handleAddPurchase}
                className="bg-secondary w-32  px-4 h-[35px] flex space-x-3  rounded-md items-center justify-center
                cursor-pointer hover:bg-primary duration-300 ease-in-out"
              >
                Add Purchase
              </div>
            </div>
          </div>
        </div>

        <div className=" overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full w-[70vw] divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {thead.map((item, index) => (
                      <th
                        key={Math.random() + index}
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchases
                    .filter((purchase) => !purchase.toBeDeleted)
                    .map((purchase, index) => (
                      <tr
                        className="hover:bg-gray-50 duration-300 ease-in-out "
                        key={index}
                      >
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          <input
                            type="text"
                            placeholder="Enter Description"
                            className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                            value={purchase.item}
                            onChange={(e) =>
                              handleInputChange(index, "item", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          <input
                            type="number"
                            placeholder="Enter Amount"
                            className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                            value={purchase.amount}
                            onChange={(e) =>
                              handleInputChange(index, "amount", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          <input
                            type="number"
                            placeholder="Enter Tax %"
                            className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                            value={purchase.taxPercentage}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "taxPercentage",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          <input
                            type="text"
                            value={purchase.taxAmount}
                            disabled
                            className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          />
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          <input
                            type="text"
                            disabled
                            value={
                              parseFloat(purchase.amount) + parseFloat(purchase.taxAmount || 0)
                            }
                            className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          />
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                        >
                          <button
                            style={{
                              textAlign: "center",
                              borderRadius: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                            className="text-white w-50 p-3 mt-3  hover:text-white bg-primary "
                            onClick={() => handleDeletePurchase(index)}
                          >
                            <BsTrashFill />
                          </button>
                        </td>
                      </tr>
                    ))}
                 {purchases.length>0 &&   <tr
                        className="hover:bg-gray-50 duration-300 ease-in-out "
                       
                      >
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        HST Total:  {String( purchases.reduce((total, obj) => total + obj.taxAmount, 0))}
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                       Grand Total: {  purchases.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0}
                         
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                        >
                       
                        </td>
                      </tr>}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Expenses = () => {
    return (
      <>
        <div className="flex mt-4 items-center justify-end">
          <div>
            <div className="flex space-x-4 text-xs text-white">
              {/* {expenseItems.length > 0 ? (
                <div
                  onClick={handleSaveExpenses}
                  className="bg-secondary w-32 px-4 h-[35px] flex space-x-3 rounded-md items-center justify-center
                  cursor-pointer hover:bg-primary duration-300 ease-in-out"
                >
                  Save Expenses
                </div>
              ) : null} */}
              <div
                onClick={handleAddExpense}
                className="bg-secondary w-32 px-4 h-[35px] flex space-x-3 rounded-md items-center justify-center
                  cursor-pointer hover:bg-primary duration-300 ease-in-out"
              >
                Add Expense
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full w-[70vw] divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {thead.map((item, index) => (
                      <th
                        key={Math.random() + index}
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenseItems
                  .map((expense, index) => (
                    <tr
                      className="hover:bg-gray-50 duration-300 ease-in-out "
                      key={index}
                    >
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enter Description"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={expense.item}
                          onChange={(e) =>
                            handleExpenseInputChange(
                              index,
                              "item",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enter Amount"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={expense.amount}
                          onChange={(e) =>
                            handleExpenseInputChange(
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="number"
                          placeholder="Enter Tax %"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={expense.taxPercentage}
                          onChange={(e) =>
                            handleExpenseInputChange(
                              index,
                              "taxPercentage",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          value={expense.taxAmount}
                          disabled
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          disabled
                          value={
                            parseFloat(expense.amount) + expense.taxAmount || 0
                          }
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                        />
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                      >
                        <button
                          style={{
                            textAlign: "center",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="text-white w-50 p-3 mt-3  hover:text-white bg-primary"
                          onClick={() => handleDeleteExpenses(index)}
                        >
                          <BsTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {expenseItems.length>0 &&   <tr
                        className="hover:bg-gray-50 duration-300 ease-in-out "
                       
                      >
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        HST Total:  {String( expenseItems.reduce((total, obj) => total + obj.taxAmount, 0))}
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                       Grand Total: {  expenseItems.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) + parseFloat(obj2.taxAmount)), 0) ||0}
                         
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                        >
                       
                        </td>
                      </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
      </>
    );
  };
  const Sales = () => {
    const thead = [
      "Description",
      "Amount",
      "HST %",
      "HST Amount",
      "Cost",
      "Total",
      "Action",
    ];

    return (
      <>
        <div className="flex mt-4 items-center justify-end">
          <div>
            <div className="flex space-x-4 text-xs text-white">
              {/* {sales.length > 0 ? (
                <div
                  onClick={handleSaveSale}
                  className="bg-secondary w-32 px-4 h-[35px] flex space-x-3 rounded-md items-center justify-center cursor-pointer hover:bg-primary duration-300 ease-in-out"
                >
                  Save Sale
                </div>
              ) : null} */}
              <div
                onClick={handleAddSale}
                className="bg-secondary w-32 px-4 h-[35px] flex space-x-3 rounded-md items-center justify-center cursor-pointer hover:bg-primary duration-300 ease-in-out"
              >
                Add Sale
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full w-[70vw] divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {thead.map((item, index) => (
                      <th
                        key={Math.random() + index}
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sales.map((sale, index) => (
                    <tr
                      className="hover:bg-gray-50 duration-300 ease-in-out "
                      key={sale.id}
                    >
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enter Description"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={sale.item}
                          onChange={(e) =>
                            handleSalesInputChange(
                              index,
                              "item",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enter Amount"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={sale.amount}
                          onChange={(e) =>
                            handleSalesInputChange(
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="number"
                          placeholder="Enter Tax %"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={sale.taxPercentage}
                          onChange={(e) =>
                            handleSalesInputChange(
                              index,
                              "taxPercentage",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          value={sale.taxAmount}
                          disabled
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enter Cost"
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                          value={sale.cost}
                          onChange={(e) =>
                            handleSalesInputChange(
                              index,
                              "cost",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        <input
                          type="text"
                          disabled
                          value={
                            parseFloat(sale.amount) +
                              sale.taxAmount +
                              parseFloat(sale.cost) || 0
                          }
                          className="rounded-md p-2 my-2 focus:border-secondary/60 focus:outline-none h-12 w-full border-2 border-gray-100"
                        />
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                      >
                        <button
                          style={{
                            textAlign: "center",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="text-white w-50 p-3 mt-3  hover:text-white bg-primary "
                          onClick={() => handleDeleteSales(index)}
                        >
                          <BsTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {sales.length>0 &&   <tr
                        className="hover:bg-gray-50 duration-300 ease-in-out "
                       
                      >
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                          
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        HST Total:  {String( sales.reduce((total, obj) => total + obj.taxAmount, 0))}
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                        Cost Total: {  sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.cost)), 0) ||0}
                         
                        </td>
                        <td className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap">
                       Grand Total: {  sales.reduce((total2, obj2) => parseFloat( total2 + parseFloat(obj2.amount) +  parseFloat(obj2.cost)+ parseFloat(obj2.taxAmount)), 0) ||0}
                         
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="p-0 px-1 text-sm font-medium text-right whitespace-nowrap d-flex justify-center"
                        >
                       
                        </td>
                      </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDefaultView = () => {
    return (
      <div>
        <p
          onClick={() => toggleForm()}
          className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}
        >
          Back
        </p>

        <p className={`${formStyle.h1Dashboard} px-2`}>Add New Vehicle</p>

        <div className="flex md:flex-row flex-col space-x-6">
          <div className="p-2 md:w-full">
            {renderTabs()}
            {activeTab === "Info" && (
              <>
                {renderButtonView()}
                {renderImageSection()}
                {renderVehicleAttributes()}
                {renderCustomAttributesView()}
              </>
            )}
            {activeTab === "Purchase" && <>{purchaseView()}</>}
            {activeTab === "Expenses" && <>{Expenses()}</>}
            {activeTab === "Sales" && <>{Sales()}</>}

            {/* {renderButtonView()}
            {renderImageSection()}
            {renderVehicleAttributes()}
            {renderCustomAttributesView()} */}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  };

  return renderDefaultView();
};

export default VehicleForm;
