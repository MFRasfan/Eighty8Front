import React, { useState, useEffect } from 'react';
import { formStyle } from '../../style/adminStyle';
import { BiImageAdd } from 'react-icons/bi';
import { imageURL } from '../../store/api';

function Form1(props) {
  const { data = {}, idkey, setData, showMedia = true, showVideo = false, showDescription = true, setimageFile, handleSubmit } = props;
  const [input, setinput] = useState({ ...data });
  const [ImagePreview, setImagePreview] = useState(data.ImagePreview || '');

  useEffect(() => {
    setinput({ ...data });
    setImagePreview(data.ImagePreview || '');
  }, [data]);

  const onInputChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setimageFile(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setinput({ ...input, ImagePreview: fileReader.result });
      setData({ ...data, ImagePreview: fileReader.result });
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById(`${idkey}-image-input`).click();
  };

  return (
    <div>
      <div className="flex mb:space-x-10">
        <div className={`flex  w-[100%] ${!showVideo ? 'md:flex-row  md:space-x-6' : 'flex-col-reverse '} flex-col`}>
          {showMedia && (
            <div
              onClick={handleButtonClick}
              className={`"bg-slate-100 h-[41vw] md:h-[28vw] lg:h-[21vw] mb-4 md:mb-0  
            w-[100%] md:w-[24vw] rounded-lg overflow-hidden flex items-center 
            cursor-pointer hover:shadow-md justify-center ${showVideo && ' md:w-[60vw] md:h-[41vw] bg-slate-100'}`}
            >
              {showVideo ? (
                data.video ? (
                  <video id="video-preview" src={imageURL + data.video} className="w-[100%] h-[100%] bg-cover" width="800" controls></video>
                ) : data.ImagePreview ? (
                  <video id="video-preview" src={data.ImagePreview} className="w-[100%] h-[100%] bg-cover" width="800" controls></video>
                ) : (
                  <BiImageAdd size={125} />
                )
              ) : data.ImagePreview ? (
                <img src={data.ImagePreview} className="w-[100%] h-[100%] bg-cover" />

              ) : data.image ? (
                <img src={imageURL + data.image} className="w-[100%] h-[100%] bg-cover" />

              ) : (
                <BiImageAdd size={125} />
              )}
            </div>
          )}
          <div className={`${showVideo ? 'md-[60vw]' : 'md:w-[35vw]'}`}>
            <div className="md:w-[100%]">
              <label className={`${formStyle.label} font-bold`}>Title</label>
              <div className="mt-1 mb-1">
                <input name={'title'} className={`${formStyle.input}`} value={input.title || ''} onChange={onInputChange} />
              </div>
            </div>

            <input id={`${idkey}-image-input`} type="file" accept={showVideo ? 'video/*' : 'image/*'} style={{ display: 'none' }} onChange={handleImageUpload} />

            {showDescription && (
              <div className="md:w-[100%]">
                <label className={`${formStyle.label} font-semibold`}>Description</label>
                <div className="mt-1 mb-1">
                  <div>
                    <textarea
                      name={'description'}
                      rows={6}
                      className={`${formStyle.input} h-36 pt-4 `}
                      value={input.description || ''}
                      placeholder={'Does this car comes with...'}
                      multiple={true}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form1;
