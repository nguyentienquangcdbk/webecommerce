import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../../api/categoryApi";
import Input from "../../../component/Input";

const AddNewCateogry = () => {
  const { handleSubmit, register, control } = useForm();
  const navigate = useNavigate();

  const addCategory = async (value) => {
    await categoryApi
      .add(value)
      .then((data) => {
        toast.success("thêm danh mục thành công");
        navigate("/admin/category");
      })
      .catch((error) => {
        console.log(error);
        toast.error("thêm danh mục không thành công");
      });
  };
  return (
    <div>
      <Link
        to="/admin/category"
        className="px-4 py-2 ml-auto bg-green-400 text-white "
      >
        danh sách nhà sản xuất
      </Link>
      <h1 className="text-xl font-medium text-center mb-10">
        thêm nhà sản xuất
      </h1>
      <form onSubmit={handleSubmit(addCategory)} className="mx-auto w-[600px]">
        <div className="field flex flex-col w-full">
          <label htmlFor="" className="font-semibold text-lg mb-5">
            name
          </label>
          <Input
            control={control}
            name="name"
            placeholder="nhập tên nhà sản xuất"
          ></Input>
        </div>

        <button className="px-6 py-3 font-medium block mx-auto bg-violet-400 rounded-lg text-white">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddNewCateogry;
