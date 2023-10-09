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
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  uploadMedia,
  deleteImage,
} from "../../store/features/media/mediaService";
import {
  addAndUpdateHome,
  getHome,
} from "../../store/features/webcontent/webContentService";
import { AiFillCloseCircle } from "react-icons/ai";

function Home() {
  const [bannerDetails, setbannerDetails] = useState({});
  const [section2, setsection2] = useState([
    { title: "", description: "", image: "", imageFile: {}, ImagePreview: "" },
    { title: "", description: "", image: "", imageFile: {}, ImagePreview: "" },
    { title: "", description: "", image: "", imageFile: {}, ImagePreview: "" },
  ]);

  const [section3, setsection3] = useState({});
  const [section4, setsection4] = useState({});
  const [section5, setsection5] = useState({});
  const [deleteImages, setdeleteImages] = useState([]);

  const [ImagePreview, setImagePreview] = useState("");
  const [imageFile, setimageFile] = useState({});

  const [SC1_imageFile, setSC1_imageFile] = useState({});
  const [SC2_imageFile, setSC2_imageFile] = useState({});
  const [SC3_imageFile, setSC3_imageFile] = useState({});
  const [S3_imageFile, setS3_imageFile] = useState({});
  const [S4_videoFile, setS4_videoFile] = useState({});

  const fileInputRef = useRef(null);
  const [selectedFiles, setselectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [justUploadedImages, setjustUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [homeDetails, sethomeDetails] = useState({});
  const [fetchDetails, setfetchDetails] = useState(0)
  


  async function fetchDetailsHandler() {
      if(fetchDetails<1){
      dispatch(getHome((data) => {
        if (data && data.length > 0) {
          sethomeDetails(data[0]);
          if (data[0].section1_banner) {
            setbannerDetails(data[0].section1_banner);
          }
          if (data[0].section2 !== undefined) {
            setsection2(data[0].section2);
          }
          if (data[0].section3 !== undefined) {
            setsection3(data[0].section3);
          }
          if (data[0].section4 !== undefined) {
            setsection4(data[0].section4);
          }
          if (data[0].section5 !== undefined) {
            setsection5(data[0].section5);
          }
          let val=fetchDetails+1
          setfetchDetails(val);
        }
      }));
    };
    
  
  }
  useEffect(() => {
    if(fetchDetails<1){
      fetchDetailsHandler();
    }
  }, []);


  const handleDeleteDBImages = (item, index) => {
    //remove image from array but not update in database
    // instead save the file name in delete Images array
    // on save we will delete these images

    let temp = section5.image.slice(0);
    temp.splice(index, 1);
    setsection5({ image: temp });
    let temp2 = deleteImages.slice(0);
    temp2.push(item);
    setdeleteImages(temp);
  };

  const onInputChange = (e, type) => {
    if (type === "section1") {
      let value= { ...bannerDetails, [e.target.name]: e.target.value }
      setbannerDetails(value);
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

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = async (filename) => {
    await dispatch(
      deleteImage(filename, (response) => {
        if (response.message) {
          setdeleteImages((prev) => prev.filter((item) => item !== filename));
        } else {
          toast.error("Network Error");
        }
      })
    );
  };

  const handleDeleteAll = async () => {
    for (const file of deleteImages) {
      await handleDelete(file);
    }
  };
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
              ) : !!bannerDetails.image ? (
                <img
                  src={imageURL + bannerDetails.image}
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
                    value={bannerDetails.title}
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
                      value={
                        bannerDetails.description ||
                        homeDetails?.section1_banner?.description
                      }
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

  const submitBanner = () => {
    try {
      if (!bannerDetails.title) {
        throw "Please enter banner title";
      }
      // if (bannerDetails.title.length < 10) {
      //   throw "Banner title length should be min 10 characters long";
      // }

      // if (bannerDetails.title.length > 20) {
      //   throw "Banner title length should be max 20 characters long";
      // }
      if (!bannerDetails.description) {
        throw "Please enter banner caption";
      }
      // if (bannerDetails.description.length < 10) {
      //   throw "Banner caption length should be min 10 characters long";
      // }
      // if (bannerDetails.description.length > 54) {
      //   throw "Banner caption length should be max 54 characters long";
      // }
      if (!bannerDetails.image && !ImagePreview) {
        throw "Please select banner image";
      }

      if (ImagePreview) {
        const formData = new FormData();
        formData.append("file", imageFile);

        dispatch(
          uploadMedia(formData, (image) => {
            if (image.data && image.data.url) {
              const section1_banner = {};
              section1_banner.image = image.data.url;
              if (bannerDetails.title) {
                section1_banner.title = bannerDetails.title;
              }

              if (bannerDetails.description) {
                section1_banner.description = bannerDetails.description;
              }


              dispatch(
                addAndUpdateHome({ section1_banner }, (res) => {
                })
              );
            }
          })
        );
      } else {
        const section1_banner = {};
        if (bannerDetails.title) {
          section1_banner.title = bannerDetails.title;
        }

        if (bannerDetails.description) {
          section1_banner.description = bannerDetails.description;
        }
        section1_banner.image = bannerDetails.image
        dispatch(
          addAndUpdateHome({ section1_banner }, (res) => {
          })
        );
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const handleSection2Change = (val, index) => {
    let temp = section2.slice(0);
    temp[index] = val;
    setsection2(temp);
  };
  

  const handleUploadImage = (file, index, cb) => {
    if (file.name) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        uploadMedia(formData, (data) => {
          let temp = section2.slice(0);
          temp[index].image = data.data.url;
          setsection2(temp);
          cb();
        })
      );
    } else {
      cb();
    }
  };

  const uploadCar1Image = () => {
    handleUploadImage(SC1_imageFile, 0, uploadCar2Image);
  };

  const uploadCar2Image = () => {
    handleUploadImage(SC2_imageFile, 1, uploadCar3Image);
  };

  const uploadCar3Image = () => {
    handleUploadImage(SC3_imageFile, 2, submitSection2Final);
  };

  const submitSection2Final = () => {
    let arr = section2.map((item) => {
      let obj = Object.assign({}, item);
      delete obj.ImagePreview;
      delete obj.imageFile;
      return obj;
    });
    dispatch(addAndUpdateHome({ section2: arr }));
  };

  const submitSection2 = () => {
  
    try {
      if (!section2[0].title) {
        throw "Please enter card one title";
      }
      // if (section2[0].title.length < 10) {
      //   throw "card one title length should be min 10 characters long";
      // }

      // if (section2[0].title.length > 20) {
      //   throw "card one title length should be max 20 characters long";
      // }
      if (!section2[0].description) {
        throw "Please enter card one caption";
      }
      // if (section2[0].description.length < 10) {
      //   throw "card one caption length should be min 10 characters long";
      // }
      // if (section2[0].description.length > 70) {
      //   throw "card one caption length should be max 70 characters long";
      // }
      if (!section2[0].image && !section2[0].ImagePreview) {
        throw "Please select card one image";
      }

      //card 2 validation
      if (!section2[1].title) {
        throw "Please enter card two title";
      }
      // if (section2[1].title.length < 10) {
      //   throw "card two title length should be min 10 characters long";
      // }

      // if (section2[1].title.length > 20) {
      //   throw "card two title length should be max 20 characters long";
      // }
      if (!section2[1].description) {
        throw "Please enter card two caption";
      }
      // if (section2[1].description.length < 10) {
      //   throw "card two caption length should be min 10 characters long";
      // }
      // if (section2[1].description.length > 70) {
      //   throw "card two caption length should be max 70 characters long";
      // }
      if (!section2[1].image && !section2[1].ImagePreview) {
        throw "Please select card two image";
      }

      //card 3 validations

      if (!section2[2].title) {
        throw "Please enter card three title";
      }
      // if (section2[2].title.length < 10) {
      //   throw "card three title length should be min 10 characters long";
      // }

      // if (section2[2].title.length > 20) {
      //   throw "card three title length should be max 20 characters long";
      // }
      if (!section2[2].description) {
        throw "Please enter card three caption";
      }
      // if (section2[2].description.length < 10) {
      //   throw "card three caption length should be min 10 characters long";
      // }
      // if (section2[2].description.length > 70) {
      //   throw "card three caption length should be max 70 characters long";
      // }
      if (!section2[2].image && !section2[2].ImagePreview) {
        throw "Please select card three image";
      }

      if (section2[0].ImagePreview) {
        uploadCar1Image();
      } 
      else if (!section2[0].ImagePreview && section2[1].ImagePreview) {
        uploadCar2Image();
      }
      else if (!section2[0].ImagePreview && !section2[1].ImagePreview && section2[2].ImagePreview) {
        uploadCar3Image();
      }
      else if(!section2[0].ImagePreview && !section2[1].ImagePreview && !section2[2].ImagePreview){
        submitSection2Final()
      }
   
    
    } catch (error) {
      toast.error(error.message || error);
    }

  };

  const submitSection3 = () => {
    try {
      if (!section3.title) {
        throw "Please enter section 3 title";
      }
      // if (section3.title.length < 10) {
      //   throw "section three title length should be min 10 characters long";
      // }

      // if (section3.title.length > 25) {
      //   throw "section three title length should be max 25 characters long";
      // }
      if (!section3.description) {
        throw "Please enter section three caption";
      }
      // if (section3.description.length < 10) {
      //   throw "section three caption length should be min 10 characters long";
      // }
      // if (section3.description.length > 300) {
      //   throw "section three caption length should be max 300 characters long";
      // }
      if (!section3.image && !section3.ImagePreview) {
        throw "Please select section three image";
      }

      if (section3.ImagePreview) {
        const formData = new FormData();
        formData.append("file", S3_imageFile);

        dispatch(
          uploadMedia(formData, (image) => {
            if (image.data && image.data.url) {
              const obj = {};
              obj.image = image.data.url;
              if (section3.title) {
                obj.title = section3.title;
              }

              if (section3.description) {
                obj.description = section3.description;
              }

              dispatch(addAndUpdateHome({ section3: obj }, (res) => {}));
            }
          })
        );
      } else {
        const obj = {};
        if (section3.title) {
          obj.title = section3.title;
        }

        if (section3.description) {
          obj.description = section3.description;
        }
        dispatch(addAndUpdateHome({ section3: obj }, (res) => {}));
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const submitSection4 = () => {
    try {
      if (!section4.title) {
        throw "Please enter section 3 title";
      }
      // if (section4.title.length < 10) {
      //   throw "section three title length should be min 10 characters long";
      // }

      // if (section4.title.length > 25) {
      //   throw "section three title length should be max 25 characters long";
      // }

      if (!section4.video && !section4.ImagePreview) {
        throw "Please select section three video";
      }

      if (section4.ImagePreview) {
        const formData = new FormData();
        formData.append("file", S4_videoFile);

        dispatch(
          uploadMedia(formData, (image) => {
            if (image.data && image.data.url) {
              const obj = {};
              obj.video = image.data.url;
              if (section4.title) {
                obj.title = section4.title;
              }
              dispatch(addAndUpdateHome({ section4: obj }, (res) => {}));
            }
          })
        );
      } else {
        const obj = {};
        if (section4.title) {
          obj.title = section4.title;
        }

        dispatch(addAndUpdateHome({ section4: obj }, (res) => {}));
      }
    } catch (error) {
      toast.error(error.message || error);
    }
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

    submitSection5Images();
  };

  const handleFileChange = (event) => {
    // setslideImages(event.target.files[0]);
    const file = event.target.files[0];
    let temp = selectedFiles.slice(0);
    temp.push(file);
    setselectedFiles(temp);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let temp = previewUrl.slice(0);
      temp.push(fileReader.result);
      setPreviewUrl(temp);
    };
    fileReader.readAsDataURL(file);
  };
  const removeImageFromFileAndPreview = (item, index) => {
    let fileTemp = selectedFiles.slice(0);
    fileTemp.splice(index, 1);
    let previewUrlTemp = previewUrl.slice(0);
    previewUrlTemp.splice(index, 1);
    setselectedFiles(fileTemp);
    setPreviewUrl(previewUrlTemp);
  };
  const submitSection5 = async () => {
    try {
      setIsLoading(true);

      // check if the user has upload any new image then upload it into db and get new url
      // if multiple image then loop it and upload it one by one

      let isValid = true;

      if (selectedFiles.length === 0) {
        throw "Please upload atleast one image";
      }

      if (isValid) {
        if (selectedFiles.length > 0) {
          await handleUploadAll();
        } else {
          submitSection5Images();
        }
      }
    } catch (error) {
      toast.error(error || "Network Error");
      setIsLoading(false);
    }
  };

  const submitSection5Images = () => {
    dispatch(
      addAndUpdateHome({ section5: { image: justUploadedImages } }, (res) => {
        handleDeleteAll();
      })
    );
  };

  return (
    <div className="w-[64vw]">
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-5 ml-5 w-[55vw] flex items-center px-5 md:pr-0  justify-between">
                <p className="text-sm md:text-base">Section 1 - Banner</p>
                <button
                  onClick={() => submitBanner()}
                  className="bg-gray-700 text-xs  text-white px-4 py-1 rounded-md"
                >
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
                <p className="text-sm w-[50%] md:text-base">
                  Section 2 - How It works Section
                </p>
                <button
                  onClick={() => submitSection2()}
                  className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="font-semibold text-gray-800 mb-5">Card 1</p>
            <Form1
              data={section2[0]}
              setimageFile={setSC1_imageFile}
              setData={(val) => handleSection2Change(val, 0)}
              idkey={"card1"}
            />

            <p className="font-semibold text-gray-800 mb-5">Card 2</p>
            <Form1
              data={section2[1]}
              setimageFile={setSC2_imageFile}
              setData={(val) => handleSection2Change(val, 1)}
              idkey={"card2"}
            />

            <p className="font-semibold text-gray-800 mb-5">Card 3</p>
            <Form1
              data={section2[2]}
              setimageFile={setSC3_imageFile}
              setData={(val) => handleSection2Change(val, 2)}
              idkey={"card3"}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                <p>Section 3</p>
                <button
                  onClick={() => submitSection3()}
                  className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Form1
              data={section3}
              setimageFile={setS3_imageFile}
              setData={(val) => setsection3(val)}
              idkey={"section3"}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                <p>Section 4 - Videos</p>
                <button
                  onClick={() => submitSection4()}
                  className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Form1
              data={section4}
              showDescription={false}
              showVideo={true}
              setimageFile={setS4_videoFile}
              setData={(val) => setsection4(val)}
              idkey={"section4"}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                <p>Section 5 - Partners</p>
                <button
                  onClick={() => submitSection5()}
                  className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <input
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

            <div className="flex space-x-4 mb-10">
              {previewUrl.map((item, index) => (
                <div className="h-28  overflow-hidden  w-40">
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
              {!!section5.image &&
                section5.image.map((item, index) => (
                  <div className="h-28  overflow-hidden  w-40">
                    <button
                      className="text-black z-10 absolute m-[5px]"
                      onClick={() => handleDeleteDBImages(item, index)}
                    >
                      <AiFillCloseCircle size={20} />
                    </button>
                    <img
                      className="w-full  rounded-md"
                      src={imageURL + item}
                      key={index + item}
                    />
                  </div>
                ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Home;
