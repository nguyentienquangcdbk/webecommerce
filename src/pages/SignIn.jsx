import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Label from "../component/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import { useStore } from "../store/auth";
import { useCart } from "../store/cart";

const schema = yup.object({
  email: yup
    .string()
    .email("bạn nhập chưa đúng email")
    .required("bạn chưa nhập trường này"),
  password: yup
    .string()
    .required("bạn chưa nhập trường này")
    .min(6, "mật khẩu ít nhất 8 ký tụ "),
});
const SignIn = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setItemCart = useCart((state) => state.setItemCart);
  const user = useStore((state) => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    document.title = "đăng nhập";
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    console.log(values);
    await axiosClient
      .post("login", values)
      .then((res) => {
        console.log(res);
        const user = res?.data?.user;
        // const cart = res?.data?.cart;
        if (res?.data?.status === 401) {
          toast.error("đăng nhập không thành công");
        } else {
          setUser(user);
          setItemCart(user?.cart.items);
          localStorage.setItem("token", res?.data?.token);
          toast("đăng nhập thành công");
          navigate("/");
        }
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
          <h1 className="text-2xl font-semibold">Đăng nhập</h1>
          <p className="text-gray-400 ">
            Bạn chưa có tài khoản ?{" "}
            <Link className="text-green-400" to="/sign-up">
              Đăng ký
            </Link>
          </p>
          <form className="w-full" onSubmit={handleSubmit(handleSignIn)}>
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
              className="w-[50%] bg-green-400 mt-5 mx-auto rounded-lg h-14 text-xl text-white flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="border-4 border-t-transparent animate-spin h-10 w-10 border-white rounded-full"></div>
              ) : (
                "đăng nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
