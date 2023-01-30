import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { Fragment } from "react";
import imgUpload from "../img/img-upload.png";
const ImgUpload = (props) => {
  const {
    images,
    setImages = () => {},
    onchange = () => {},
    name = "",
  } = props;

  const handleRemoveImg = (name) => {
    setImages("");
    // const storage = getStorage();
    // const imageRef = ref(storage, "images/" + name);
    // deleteObject(imageRef)
    //   .then(() => {
    //     console.log("Remove image successfully");
    //     setImages("");
    //   })
    //   .catch((error) => {
    //     console.log("handleDeleteImage ~ error", error);
    //     console.log("Can not delete image");
    //     setImages("");
    //   });
  };
  return (
    <Fragment>
      <div className="w-[350px] group h-[200px] relative border border-gray-200 rounded-lg bg-gray-200 ">
        {images ? (
          <>
            <div
              onClick={() => handleRemoveImg(images.name)}
              className="absolute z-2 top-1/2 left-1/2 opacity-0 group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2 text-red-400 w-14 h-14 rounded-full bg-white  flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <label htmlFor={name}>
              <img
                src={images.path}
                className="w-full h-full object-contain"
                alt=""
              />
            </label>
          </>
        ) : (
          <label htmlFor={name}>
            <img
              src={imgUpload}
              className="w-full h-full object-contain"
              alt=""
            />
          </label>
        )}
        <input
          type="file"
          id={name}
          disabled={images ? true : false}
          onChange={(e) => onchange(e)}
          className="w-full hidden px-4 py-3 border border-[#EDEDF2] outline-none focus:border-[#79B3FF] mb-5"
        />
      </div>
    </Fragment>
  );
};

export default ImgUpload;
