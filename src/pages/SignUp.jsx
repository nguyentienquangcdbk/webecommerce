import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../api/axiosClient";
import Input from "../component/Input";
import Label from "../component/Label";
import { useStore } from "../store/auth";

const schema = yup.object({
  email: yup
    .string()
    .email("bạn nhập chưa đúng email")
    .required("bạn chưa nhập trường này"),
  password: yup
    .string()
    .required("bạn chưa nhập trường này")
    .min(6, "mật khẩu ít nhất 8 ký tụ "),
  name: yup.string().required("bạn chưa nhập trường này"),
});
const SIgnUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  useEffect(() => {
    document.title = "đăng ký";
    if (user) {
      navigate("/");
    }
  }, []);
  const handleSignUp = async (values) => {
    console.log(values);
    await axiosClient
      .post("register", values)
      .then((res) => {
        const user = res?.data?.user;
        console.log(res);
        setUser(user);
        localStorage.setItem("token", res?.data?.token);
        toast("đăng ký tài khoản thành công");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto container">
      <div className="mt-10">
        <Link to="/">
          <img srcSet="./Logo.png 2x" alt="logo" />
        </Link>
        <div className=" w-[600px] mx-auto flex flex-col items-center gap-y-5">
          <h1 className="text-2xl font-semibold">Đăng Ký</h1>
          <p className="text-gray-400 ">
            Bạn đã có tài khoản ?{" "}
            <Link className="text-green-400" to="/sign-in">
              Đăng nhập
            </Link>
          </p>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div className="w-full flex flex-col ">
              <Label>name</Label>
              <Input
                control={control}
                placeholder="nhập name"
                name="name"
                error={errors?.name?.message}
              ></Input>
            </div>
            <div className="w-full flex flex-col ">
              <Label>email</Label>
              <Input
                control={control}
                placeholder="nhập email"
                name="email"
                error={errors?.email?.message}
              ></Input>
            </div>
            <div className="w-full flex flex-col ">
              <Label>mật khẩu</Label>
              <Input
                control={control}
                placeholder="password"
                type="password"
                name="password"
                error={errors?.password?.message}
              ></Input>
            </div>

            <button
              disabled={isSubmitting}
              className="w-[50%] bg-green-400 mt-5 rounded-lg h-14 text-xl text-white flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="border-4 border-t-transparent animate-spin h-10 w-10 border-white rounded-full"></div>
              ) : (
                "đăng ký"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SIgnUp;
