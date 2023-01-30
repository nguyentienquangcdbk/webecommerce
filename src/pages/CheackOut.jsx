import React from "react";
import { useForm } from "react-hook-form";
import Input from "../component/Input";
import { useCart } from "../store/cart";
import Select from "react-select";
// import { URLS } from "../utils";
import { city } from "../asset/tp";
import { District } from "../asset/District";
import { ward } from "../asset/wards";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/auth";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const sdtRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const schema = yup.object({
  name: yup.string().required("bạn chưa nhập trường này"),
  sdt: yup
    .string()
    .matches(sdtRegExp, "số điện thoại không hơp lệ")
    .required("bạn chưa nhập số điện thoại"),
  email: yup
    .string()
    .email("email không hợp lệ")
    .required("bạn chưa nhập email"),
  address: yup.string().required("bạn chưa nhập địa chỉ cụ thể"),
});
const CheackOut = () => {
  const itemCart = useCart((state) => state.itemCart);
  // const updateCart = useCart((state) => state.updateCart);
  // const updateUser = useStore((state) => state.updateUser);
  const setItemCart = useCart((state) => state.setItemCart);
  const user = useStore((state) => state.user);
  const [district, setDistrict] = useState(null);
  const [wards, setWards] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const [wardsValue, setWardsValue] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },

    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const total = itemCart?.reduce((result, prod) => {
    return result + Number(prod.price) * prod.quantity;
  }, 0);
  const handleTp = (e) => {
    setDistrictValue({
      label: "",
      value: "",
    });
    setWardsValue({
      label: "",
      value: "",
    });
    setDistrict(District.filter((item) => item.parent_code === e.value));
  };
  const handleDistrict = (e) => {
    setDistrictValue({ label: e.label, value: e.label });
    setWards(ward.filter((x) => x.parent_code === e.code));
  };

  const handlewards = (e) => {
    setWardsValue({
      label: e.label,
      value: e.label,
      path_with_type: e.path_with_type,
    });
  };
  const handleOrder = async (value) => {
    value.path_with_type = wardsValue.path_with_type;
    value.products = JSON.stringify(itemCart);
    if (!user?.cartId) {
      toast.error("tạo đơn hàng thất bại");
      return;
    }
    value.user = user?.uid;
    value.totalPrice = total;
    console.log(value);

    // const res = await orderAPi.add(value);
    await addDoc(collection(db, "order"), {
      ...value,
      createdAt: serverTimestamp(),
    });
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      cartId: uuidv4(),
    });
    setItemCart(null);
    navigate("/");
  };
  return (
    <div className="mt-10 container mx-auto">
      <div className="flex items-start gap-x-10 lg:flex-row flex-col-reverse">
        <div className="flex-1 w-full">
          <h1>Thông tin nhận hàng</h1>
          <form onSubmit={handleSubmit(handleOrder)}>
            <div className="flex flex-col">
              <Input
                control={control}
                placeholder="Email"
                type="text"
                name="email"
                error={errors?.email?.message}
              />
              <Input
                control={control}
                placeholder="Họ và Tên"
                type="text"
                name="name"
                error={errors?.name?.message}
              />
              <Input
                control={control}
                placeholder="Số điện thoại"
                type="text"
                name="sdt"
                error={errors?.sdt?.message}
              />
              <Input
                control={control}
                placeholder="Địa chỉ"
                type="text"
                name="address"
                error={errors?.address?.message}
              />

              <Select
                onChange={handleTp}
                value={getValues("tp")}
                className="mt-5 border  rounded-lg"
                // {...register("tp")}
                placeholder="Tỉnh thành"
                options={city}
              />
              <Select
                onChange={handleDistrict}
                className="mt-5"
                value={districtValue}
                placeholder="Quận huyện"
                options={district}
              />
              <Select
                onChange={handlewards}
                className="mt-5"
                placeholder="Phường xã"
                value={wardsValue}
                options={wards}
              />
            </div>
            <button
              type="submit"
              className="px-8 mt-10 py-4 bg-green-400 bg-opacity-80 text-white rounded-lg mx-auto block"
            >
              submit
            </button>
          </form>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold border-b border-gray-300 py-5 pl-6">
            Đơn Hàng (
            {itemCart?.reduce((result, prod) => {
              return result + prod.quantity;
            }, 0)}{" "}
            sản phẩm)
          </h1>

          <div className="py-4 border-b border-gray-300">
            {itemCart?.map((item, index) => (
              <div key={item.id} className="flex items-center mb-5">
                <div className=" w-[62px] h-[62px] relative">
                  <img
                    src={item.img}
                    className="w-full  h-full object-cover rounded-lg "
                    alt=""
                  />
                  <div className="rounded-full bg-[#2a9dcc] w-7 h-7 absolute -top-3 -right-3 flex items-center justify-center text-white">
                    {item.quantity}
                  </div>
                </div>
                <div className="pl-5 flex-1">
                  <span className="text-base whitespace-pre-wrap leading-5 ">
                    {item.name}
                  </span>
                  <br />
                  <span className="text-[#969696] text-base font-medium">
                    {item.size}
                  </span>
                </div>
                <span className="pl-4 pt-4 text-[#717171] text-right">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item?.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="py-5 border-b border-gray-300">
            <div className="flex justify-between items-starts">
              <span className="text-base text-[#717171]">Tạm Tính</span>
              <span className="text-base text-[#717171]">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </div>
            <div className="flex justify-between items-starts pt-2">
              <span className="text-base text-[#717171]">Phí vận chuyển</span>
              <span className="text-base text-[#717171]">40.000₫</span>
            </div>
          </div>

          <div className="flex justify-between items-starts pt-2 ">
            <span className="text-base text-[#717171]">Phí vận chuyển</span>
            <span className="text-[#2a9dcc] text-xl">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total + 40000)}
            </span>
          </div>

          <Link
            to="/cart"
            className="text-[#2a6395] font-base flex items-center mt-4 animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span>Quay về giỏ hàng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheackOut;
