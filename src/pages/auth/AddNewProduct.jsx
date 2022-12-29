import React, { useEffect, useMemo, useState } from "react";
import Label from "../../component/Label";
import Input from "../../component/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImgUpload from "../../component/ImgUpload";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { URLS } from "../../utils";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import productAPi from "../../api/productAPi";
import categoryApi from "../../api/categoryApi";

Quill.register("modules/imageUploader", ImageUploader);

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
const AddNewProduct = () => {
  const [image, setImage] = useState(null);
  const [imgDesc, setImgDesc] = useState(null);
  const [category, setCategory] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

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
    const arr = value.map((item, index) => item.value);
    setValue("color", arr);
  };
  const handleSize = (value) => {
    const arr = value.map((item, index) => item.value);
    setValue("size", arr);
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
              Accept: "application/json",
            },
          });
          return URLS + response?.data.file_path;
        },
      },
    }),
    []
  );

  const onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const onchangeUpload = (e) => {
    console.log("e", e.target.files);
    const file = e.target.files;
    setImgDesc(file);
  };
  const checkValueAdd = (value) => {
    if (value.size == null) {
      toast.error("chưa chọn size");
      return;
    }
    if (value.color == null) {
      toast.error("chưa chọn màu sắc");
      return;
    }
    if (value.categoryName == null) {
      toast.error("chưa chọn nhà sản xuất");
      return;
    }

    return true;
  };
  const handleAddProduct = async (value) => {
    value.price = Number(value.price);
    const check = checkValueAdd(value);
    if (check) {
      if (image) {
        const data = new FormData();
        data.append("file", image);
        const img = await axios.post(
          "http://103.82.27.248/api/img/upload",
          data
        );
        console.log(img);
        value.avatar = img?.data.file_path;
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
        .add(value)
        .then((res) => {
          toast.success("thêm sản phẩm thành công");
          reset({
            name: "",
            price: "",
            description: "",
          });
          setImage(null);

          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
          <div className="field  flex flex-col w-full">
            <Label>name</Label>
            <Input
              error={errors?.name?.message}
              control={control}
              name="name"
              placeholder="nhập tên sản phẩm"
            />
          </div>
          <div className="field flex flex-col w-full">
            <Label>giá sản phẩm</Label>
            <Input
              error={errors?.price?.message}
              control={control}
              name="price"
              placeholder="nhập giá sản phẩm"
            />
          </div>
        </div>
        <div className="field flex flex-col w-full">
          <Label>mô tả sản phẩm</Label>
          <ReactQuill
            theme="snow"
            modules={module}
            value={getValues("description")}
            onChange={(value) => setValue("description", value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full p-5">
            <h3 className="font-semibold text-lg mb-5">avatar one</h3>
            <ImgUpload
              images={image}
              name="ImageOne"
              setImages={setImage}
              onchange={onImgChange}
            ></ImgUpload>
          </div>

          <div className="field flex flex-col w-full p-5"></div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1  gap-x-5 mt-10">
          <div>
            <Label>màu sắc sản phẩm</Label>

            <Select
              closeMenuOnSelect={false}
              onChange={handleColor}
              isMulti
              options={colourOptions}
            />
          </div>
          <div>
            <Label>kích thước sản phẩm</Label>
            <Select
              onChange={handleSize}
              closeMenuOnSelect={false}
              isMulti
              options={sizeOptions}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 my-10">
          <div>
            <Label>nhà sản xuất</Label>
            <Select
              onChange={(x) => setValue("categoryName", x.value)}
              className="mt-5"
              placeholder="nhà sản xuất"
              options={category}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              ảnh mô tả sản phẩm
            </label>
            <input type="file" onChange={onchangeUpload} multiple />
          </div>
        </div>

        <button className="px-4 py-2 bg-green-400 text-white text-lg mx-auto rounded-lg">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
