import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ImgUpload from "../../component/ImgUpload";
import Input from "../../component/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { URLS } from "../../utils";
import axios from "axios";
import Select from "react-select";
import categoryApi from "../../api/categoryApi";
import productAPi from "../../api/productAPi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import imageApi from "../../api/imageApi";

const colourOptions = [
  { value: "đen", label: "đen" },
  { value: "xanh lá", label: "xanh lá" },
  { value: " tím", label: " tím" },
  { value: "đỏ", label: "đỏ" },
  { value: "cam", label: "cam" },
  { value: "vàng", label: "vàng" },
  { value: "trắng", label: "trắng" },
  { value: "hồng", label: "hồng" },
  { value: " nâu", label: " nâu" },
  { value: "xám", label: "xám" },
  { value: "xanh da trời", label: "xanh da trời" },
];
const sizeOptions = [
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
];
const schema = yup.object({
  name: yup.string().required("bạn chưa nhập trường này"),
  price: yup
    .number("bạn nhập sai giá tiền")
    .integer("nhập giá tiền")
    .required("bạn chưa nhập trường này"),
});

const EditProduct = () => {
  const params = useParams();
  // const { id } = params;

  const { setValue, reset, control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
  });
  const [productImg, setProductImg] = useState(null);
  const [imgDesc, setImgDesc] = useState(null);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    async function getProductId() {
      if (!params.id) return;
      await productAPi
        .getId(params.id)
        .then((res) => {
          console.log(res);
          reset({
            name: res?.data?.product.name,
            price: res?.data?.product.price,
            categoryName: res?.data?.product.categoryName,
          });
          // setDesc(res?.data?.product.description);
          setValue("description", res?.data?.product.description);
          setImage(res?.data?.product.avatar);

          setProductImg(res?.data?.img);

          // set color
          setColor(
            res?.data?.color.map((item, index) => {
              return {
                value: item.value,
                label: item.value,
              };
            })
          );
          // set size
          setSize(
            res?.data?.size?.map((item, index) => {
              return {
                value: item.value,
                label: item.value,
              };
            })
          );
        })
        .catch((error) => console.log(error));
    }
    getProductId();
  }, [params.id]);
  useEffect(() => {
    const getCategory = async () => {
      const listCateogry = await categoryApi.getAll();
      setCategory(
        listCateogry?.data.map((x) => ({
          value: x.name,
          label: x.name,
        }))
      );
    };
    getCategory();
  }, []);

  const handleColor = (value) => {
    setColor(value);
  };
  const handleSize = (value) => {
    console.log(value);

    setSize(value);
  };
  const onchangeUpload = (e) => {
    const file = e.target.files;
    setImgDesc(file);
  };
  const handleRemoveImg = async (id) => {
    await imageApi
      .removeProductImg(id)
      .then((res) => {
        console.log(res);
        setProductImg(productImg.filter((x) => x.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const module = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("file", file);
          const response = await axios({
            method: "post",
            url: "http://103.82.27.248/api/img/upload",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return URLS + response?.data.file_path;
        },
      },
    }),
    []
  );

  const handleUpdateProduct = async (value) => {
    value.size = size.map((item, index) => item.value);
    value.color = color.map((item, index) => item.value);
    if (image && typeof image != "string") {
      const data = new FormData();

      data.append("file", image);

      const img = await axios.post("http://103.82.27.248/api/img/upload", data);
      console.log(img);
      value.avatar = img?.data.file_path;
      // setValue("avatarOne", img?.data.file_path);
    }

    if (imgDesc) {
      const data = new FormData();

      Array.from(imgDesc).forEach((img) => {
        data.append("file[]", img);
      });

      const imgDes = await axios({
        method: "post",
        url: "http://103.82.27.248/api/img/uploads",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log(imgDes.data);
      value.img = imgDes?.data.map((item, index) => {
        return item.file_path;
      });
    }
    await productAPi
      .update(params.id, value)
      .then((res) => {
        console.log(res);
        toast.success("sửa sản phẩm thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("sưa sản phẩm không thành công");
      });
    console.log(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateProduct)} className="w-full">
        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              name
            </label>
            <Input
              control={control}
              name="name"
              placeholder="nhâp tên danh mục..."
            ></Input>
          </div>
          <div className="field flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              price
            </label>
            <Input
              control={control}
              name="price"
              placeholder="nhâp giá sản phẩm"
            ></Input>
          </div>
        </div>
        <div className="field flex flex-col w-full">
          <label htmlFor="" className="font-semibold text-lg mb-5">
            description
          </label>
          <ReactQuill
            theme="snow"
            modules={module}
            value={getValues("description")}
            onChange={(value) => setValue("description", value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full">
            <h3 className="font-semibold text-lg mb-5">avatar one</h3>
            <ImgUpload
              images={image}
              name="ImageOne"
              setImages={setImage}
              onchange={onImgChange}
            ></ImgUpload>
          </div>

          <div className="field flex flex-col w-full">
            <h3 className="font-semibold text-lg mb-5">avatar two</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              màu sắc sản phẩm
            </label>

            <Select
              onChange={handleColor}
              placeholder="nhập màu sản phẩm"
              value={color}
              closeMenuOnSelect={false}
              isMulti
              options={colourOptions}
            />
          </div>

          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              size sản phẩm
            </label>

            <Select
              onChange={handleSize}
              placeholder="nhập size sản phẩm"
              value={size}
              closeMenuOnSelect={false}
              isMulti
              options={sizeOptions}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              danh mục
            </label>
            {getValues("categoryName") && (
              <Select
                onChange={(x) => setValue("categoryName", x.value)}
                className="mt-5"
                closeMenuOnSelect={false}
                placeholder="nhà sản xuất"
                defaultValue={{
                  value: getValues("categoryName"),
                  label: getValues("categoryName"),
                }}
                options={category}
              />
            )}
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              ảnh mô tả sản phẩm
            </label>
            <input type="file" onChange={onchangeUpload} multiple />

            <div className="grid grid-cols-3 gap-x-5 gap-y-2 mt-5">
              {productImg &&
                productImg.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full group h-[120px] rounded-lg  relative border border-gray-500"
                  >
                    <span
                      onClick={() => handleRemoveImg(item.id)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-10 h-10 rounded-full text-red-500 bg-yellow-500 flex items-center justify-center "
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
                    </span>
                    <img
                      src={URLS + item.path}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 mt-10 py-4 bg-green-400 bg-opacity-80 text-white rounded-lg mx-auto block"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
