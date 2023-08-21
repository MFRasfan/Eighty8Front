import React, { useState, useRef, useEffect } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { formStyle } from "../../style/adminStyle";
import { BiImageAdd } from "react-icons/bi";
import { imageURL } from "../../store/api";
import Form1 from "./form1";
import {useDispatch} from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { uploadMedia,deleteImage } from "../../store/features/media/mediaService";
import {addAndUpdateAbout, getAbout, getHome} from "../../store/features/webcontent/webContentService"
import {AiFillCloseCircle} from "react-icons/ai"

function About() {
  const [section1, setsection1] = useState({});
  const [section2, setsection2] = useState([
    {title:"", description:"", image:"", imageFile:{}, ImagePreview:""},
    {title:"", description:"", image:"", imageFile:{}, ImagePreview:""},
    {title:"", description:"", image:"",imageFile:{}, ImagePreview:""},

  ])

  const [section3, setsection3] = useState([
    {title:"", description:""},
    {title:"", description:""},
    {title:"", description:""},

  ])

  const [deleteImages, setdeleteImages] = useState([])

  
  const [ImagePreview, setImagePreview] = useState("");
  const [imageFile, setimageFile] = useState({});

  const [SC1_imageFile, setSC1_imageFile] = useState({});
  const [SC2_imageFile, setSC2_imageFile] = useState({});
  const [SC3_imageFile, setSC3_imageFile] = useState({});

  const fileInputRef = useRef(null);
  const [selectedFiles, setselectedFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState([])
  const [justUploadedImages, setjustUploadedImages] = useState([]) 
  const [isLoading, setIsLoading] = useState(false);

  const dispatch= useDispatch()
  const [homeDetails, sethomeDetails] = useState({})
  

  useEffect(() => {
    dispatch(getAbout(data=>{
      if(data && data.length>0){
        console.log(data[0])
        sethomeDetails(data[0])
        if(data[0].section1){
          setsection1(data[0].section1)
        }
        console.log(data[0].section2)
        if(data[0].section2 !== undefined){
          setsection2(data[0].section2)
        }
        if(data[0].section3 !== undefined){
          setsection3(data[0].section3)
        }
        
      }
    }))

  }, [])


  const onInputChange = (e, type) => {
    if (type === "section1") {
      setsection1({ ...section1, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setimageFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById("image-input").click();
  };



  const handleDelete = async (filename) => {


    await dispatch(deleteImage(filename, (response) => {
    console.log("=========================",filename,response)
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
  const renderBannerSection = () => {
    return (
      <div>
           <div className="flex mb:space-x-10">
      <div className="flex w-[100%] md:flex-row flex-col md:space-x-6">
            <div
              onClick={handleButtonClick}
              className="bg-slate-100 h-[41vw] md:h-[28vw] lg:h-[21vw] mb-4 md:mb-0  w-[100%] 
              md:w-[24vw] rounded-lg overflow-hidden flex items-center cursor-pointer hover:shadow-md justify-center"
            >

               {!!ImagePreview ? (
                <img
                  src={ImagePreview}
                  className="w-[100%] h-[100%] bg-cover"
                />
              ) : !!section1.image ? (
                <img
                  src={imageURL + section1.image}
                  className="w-[100%] h-[100%] bg-cover"
                />
              ) : (
                <BiImageAdd size={125} />
              )}
            </div>
            <div className="md:w-[35vw] ">
          <div className="md:w-[100%]">
                <label className={`${formStyle.label} font-bold`}>Title</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"title"}
                    className={`${formStyle.input}`}
                    value={section1.title}
                    onChange={(e) => onInputChange(e, "section1")}
                  />
                </div>
              </div>

              <input
                id="image-input"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              <div className="md:w-[100%]">
                <label className={`${formStyle.label} font-semibold`}>
                  Description
                </label>
                <div className="mt-1 mb-1">
                  <div>
                    <textarea
                      name={"description"}
                      rows={6}
                      className={`${formStyle.input} h-36 pt-4 `}
                      value={section1.description||homeDetails?.section1_banner?.description}
                      placeholder={"Does this car comes with..."}
                      multiple={true}
                      onChange={(e) => onInputChange(e, "section1")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const submitSection1=()=>{
    try {
      if(!section1.title){
        throw "Please enter section one title"
      }
      if(section1.title.length<10){
        throw "Section one title length should be min 10 characters long"
      }
      
      if(section1.title.length>40){
        throw "Section one title length should be max 40 characters long"
      }
      if(!section1.description){
        throw "Please enter banner caption"
      }
      if(section1.description.length<10){
        throw "Section one description length should be min 10 characters long"
      }
      if(section1.description.length>250){
        throw "Section one description length should be max 250 characters long"
      }
      if(!section1.image && !ImagePreview){
        throw "Please select banner image"
      }

      console.log("aaaaaaaaaaaaaaa",imageFile)
      if(ImagePreview){
       
        const formData = new FormData()
        formData.append('file', imageFile)

        dispatch(uploadMedia(formData, image=>{
          if(image.data && image.data.url){
            const section1 = {}
           section1.image = image.data.url
            if(section1.title){
             section1.title= section1.title
            }
           
          
            if(section1.description ){
             section1.description = section1.description
            }

            console.log("1=========", {section1})
            
            dispatch(addAndUpdateAbout({section1}, res=>{
              console.log("res----------",res)
            } ))
          }
        }))
      }else{
        const section1 = {}
        if(section1.title){
          section1.title= section1.title
        }
       
        if(section1.description ){
          section1.description = section1.description
        }
        console.log("2=========", {section1})
        dispatch(addAndUpdateAbout({section1}, res=>{
          console.log("res----------",res)
        } ))
      }

    


    } catch (error) {
      toast.error(error.message|| error)
      
    }
   
  }

  const handleSection2Change=(val,index)=>{
    let temp = section2.slice(0)
    temp[index]=val
    setsection2(temp)
  }
  const handleSection3Change=(val,index)=>{
    let temp = section3.slice(0)
    temp[index]=val
    setsection3(temp)
  }



  const handleUploadImage=(file,index, cb)=>{
    console.log("file---------",file, file.name, typeof file)
      if(file.name){
        const formData= new FormData()
        formData.append('file', file)
        dispatch(uploadMedia(formData,(data)=>{
          let temp= section2.slice(0)
          temp[index].image= data.data.url
    console.log("url---------",data)
          
          setsection2(temp)
          cb()
        }))
      }else{
        cb()
      }
  }


  const uploadCar1Image=()=>{
    console.log({SC1_imageFile})
    handleUploadImage(SC1_imageFile, 0, uploadCar2Image)
  }

  const uploadCar2Image=()=>{
    console.log({SC2_imageFile})
    handleUploadImage(SC2_imageFile, 1, uploadCar3Image)
  }

  const uploadCar3Image=()=>{
    console.log({SC3_imageFile})
    handleUploadImage(SC3_imageFile, 2, submitSection2Final)
  }


  const submitSection2Final=()=>{
    let arr= section2.map(item=>{
      let obj= Object.assign({},item)
      delete obj.ImagePreview
      delete obj.imageFile
      return obj
    })
    dispatch(addAndUpdateAbout({section2:arr}))
  }
 
  const submitSection2=()=>{
    console.log("SC1_imageFile",SC1_imageFile, section2)
 
    try {

      if(!section2[0].title){
        throw "Please enter section 2.1 title"
      }
      if(section2[0].title.length<10){
        throw "Section 2.1 title length should be min 10 characters long"
      }
      
      if(section2[0].title.length>40){
        throw "Section 2.1 title length should be max 40 characters long"
      }
      if(!section2[0].description){
        throw "Please enter banner caption"
      }
      if(section2[0].description.length<10){
        throw "Section 2.1 description length should be min 10 characters long"
      }
      if(section2[0].description.length>250){
        throw "Section 2.1 description length should be max 250 characters long"
      }

      if(!section2[0].image && !section2[0].ImagePreview){
        throw "Please select section 2.1 image"
      }

      //section 2.1
      if(!section2[1].title){
        throw "Please enter section 2.2 title"
      }
      if(section2[1].title.length<10){
        throw "Section 2.2 title length should be min 10 characters long"
      }
      
      if(section2[1].title.length>40){
        throw "Section 2.2 title length should be max 40 characters long"
      }
      if(!section2[1].description){
        throw "Please enter banner caption"
      }
      if(section2[1].description.length<10){
        throw "Section 2.2 description length should be min 10 characters long"
      }
      if(section2[1].description.length>250){
        throw "Section 2.2 description length should be max 250 characters long"
      }

      if(!section2[1].image && !section2[1].ImagePreview){
        throw "Please select section 2.2 image"
      }

      //section 2.2
      if(!section2[2].title){
        throw "Please enter section 2.3 title"
      }
      if(section2[2].title.length<10){
        throw "Section 2.3 title length should be min 10 characters long"
      }
      
      if(section2[2].title.length>40){
        throw "Section 2.3 title length should be max 40 characters long"
      }
      if(!section2[2].description){
        throw "Please enter banner caption"
      }
      if(section2[2].description.length<10){
        throw "Section 2.3 description length should be min 10 characters long"
      }
      if(section2[2].description.length>250){
        throw "Section 2.3 description length should be max 250 characters long"
      }

      if(!section2[2].image && !section2[2].ImagePreview){
        throw "Please select section 2.3 image"
      }

      if(section2[0].ImagePreview){
        uploadCar1Image()
    }

    } catch (error) {
      toast.error(error.message|| error)
      
    }
    console.log(section2)
  }

  const submitSection3=()=>{
    try {
      if(!section3[0]){
        throw "Please enter fields of section 3 statistics"  
      }
      if(!section3[0].title){
        throw "Please enter section 3 title"
      }
      if(section3[0].title.length<3){
        throw "section 3.1 title length should be min 3 characters long"
      }
      
      if(section3[0].title.length>25){
        throw "section 3.1 title length should be max 25 characters long"
      }
      if(!section3[0].description){
        throw "Please enter section 3.1 caption"
      }
      if(section3[0].description.length<3){
        throw "section 3.1 caption length should be min 3 characters long"
      }
      if(section3[0].description.length>300){
        throw "section 3.1 caption length should be max 300 characters long"
      }

      //section 3.1
      if(!section3[1].title){
        throw "Please enter section 3.2 title"
      }
      if(section3[1].title.length<3){
        throw "section 3.2 title length should be min 3 characters long"
      }
      
      if(section3[1].title.length>25){
        throw "section 3.2 title length should be max 25 characters long"
      }
      if(!section3[1].description){
        throw "Please enter section 3.2 caption"
      }
      if(section3[1].description.length<10){
        throw "section 3.2 caption length should be min 10 characters long"
      }
      if(section3[1].description.length>300){
        throw "section 3.2 caption length should be max 300 characters long"
      }
    
  
      
      //section 3.2
      if(!section3[2].title){
        throw "Please enter section 3.3 title"
      }
      if(section3[2].title.length<3){
        throw "section 3.3 title length should be min 3 characters long"
      }
      
      if(section3[2].title.length>25){
        throw "section 3.3 title length should be max 25 characters long"
      }
      if(!section3[2].description){
        throw "Please enter section 3.3 caption"
      }
      if(section3[2].description.length<10){
        throw "section 3.3 caption length should be min 10 characters long"
      }
      if(section3[2].description.length>300){
        throw "section 3.3 caption length should be max 300 characters long"
      }
    
  
      
        
        dispatch(addAndUpdateAbout({section3:section3}, res=>{
        } ))
      

    


    } catch (error) {
      toast.error(error.message|| error)
      
    }

  }


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

   submitSection5Images()
  };

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
  const submitSection5=async()=>{
    try {
      setIsLoading(true)
      
      // check if the user has upload any new image then upload it into db and get new url
      // if multiple image then loop it and upload it one by one
      
      let isValid=true
   
      if(selectedFiles.length===0){
        throw 'Please upload atleast one image'
      }
    
      if(isValid){
        if(selectedFiles.length>0){
          await handleUploadAll()
        }else{
          submitSection5Images()
        }

      }

    } catch (error) {
      toast.error(error||'Network Error');
      console.log(error)
      setIsLoading(false)
    }
  }

  const submitSection5Images=()=>{
    dispatch(addAndUpdateAbout({section5:{image:justUploadedImages}},(res)=>{
      console.log("res========",res)
      handleDeleteAll()
    }))
    console.log(justUploadedImages)
  }
  return (
    <div className="w-[64vw]">
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-5 ml-5 w-[55vw] flex items-center px-5 md:pr-0  justify-between">
                <p className="text-sm md:text-base">Section 1- Main Section </p>
                <button onClick={()=>submitSection1()} className="bg-gray-700 text-xs  text-white px-4 py-1 rounded-md">
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{renderBannerSection()}</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                <p className="text-sm w-[50%] md:text-base">Section 2 - Stories </p>
                <button onClick={()=>submitSection2()} className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md">
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="font-semibold text-gray-800 mb-5">Section 2.1- Our Story</p>
            <Form1 data={section2[0]} setimageFile={setSC1_imageFile} setData={val=>handleSection2Change(val,0 )} idkey={"card2.1"} />

            <p className="font-semibold text-gray-800 mb-5">Section 2.2- Who Are We</p>
            <Form1 data={section2[1]} setimageFile={setSC2_imageFile}  setData={val=>handleSection2Change(val,1 )} idkey={"card2.2"} />

            <p className="font-semibold text-gray-800 mb-5">Section 2.3- What We Do</p>
            <Form1 data={section2[2]} setimageFile={setSC3_imageFile} setData={val=>handleSection2Change(val,2 )} idkey={"card2.3"} />

          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
            <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                  <p>Section 3 -  Statistics</p>
                <button onClick={()=>submitSection3()} className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md">
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
          <p className="font-semibold text-gray-800 mb-5">Section 3.1 </p>
            <Form1 data={section3[0]}  showMedia={false} setData={val=>handleSection3Change(val,0 )} idkey={"card3.1"} />

            <p className="font-semibold text-gray-800 mb-5">Section 3.2</p>
            <Form1 data={section3[1]} showMedia={false} setData={val=>handleSection3Change(val,1 )} idkey={"card3.2"} />

            <p className="font-semibold text-gray-800 mb-5">Section 3.3</p>
            <Form1 data={section3[2]} showMedia={false} setData={val=>handleSection3Change(val,2 )} idkey={"card3.3"} />

          </AccordionItemPanel>
        </AccordionItem>
    
      
      </Accordion>
    </div>
  );
}

export default About;
