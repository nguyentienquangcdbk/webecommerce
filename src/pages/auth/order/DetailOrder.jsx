import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import orderAPi from "../../../api/orderApi";
import { URLS } from "../../../utils";

const DetailOrder = () => {
  const params = useParams();
  const [listItemCart, setListItemCart] = useState([]);
  useEffect(() => {
    document.title = "chi tiết order";
    const getOrder = async () => {
      await orderAPi
        .getId(params.id)
        .then((res) => {
          console.log(res?.data?.data);
          setListItemCart(res?.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getOrder();
  }, [params.id]);

  console.log(params.id);
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="flex-1">
        <div className="mb-10">
          <h1>Thông tin người nhận</h1>

          <h3 className="mt-5 text-gray-400 select-none">
            tên :{" "}
            <span className="text-lg ml-3 text-black">{listItemCart.name}</span>
          </h3>
          <h3 className="mt-5 text-gray-400 select-none">
            email :{" "}
            <span className="text-lg ml-3 text-black">
              {listItemCart?.user?.email}
            </span>
          </h3>
          <h3 className="mt-5 text-gray-400 select-none">
            đia chỉ :{" "}
            <span className="text-lg ml-3 text-black">
              {listItemCart.pathAddress}
            </span>
          </h3>
          <h3 className="mt-5 text-gray-400 select-none">
            đia chỉ cụ thể :{" "}
            <span className="text-lg ml-3 text-black">
              {listItemCart.address}
            </span>
          </h3>
          <h3 className="mt-5 text-gray-400 select-none">
            ngày tạo :{" "}
            <span className="text-lg ml-3 text-black">
              {listItemCart?.time}
            </span>
          </h3>
          <h3 className="mt-5 text-gray-400 select-none">
            ghi chú :{" "}
            <span className="text-lg ml-3 text-black">
              {listItemCart.description}
            </span>
          </h3>
        </div>

        <Link className="text-green-500 text-lg" to="/admin/order">
          Quay về{" "}
        </Link>
      </div>
      <div className="flex-1">
        <div className="py-4 border-b border-gray-300">
          {listItemCart?.products?.map((item, index) => (
            <div key={item.id} className="flex items-center mb-5">
              <div className=" w-[62px] h-[62px] relative">
                <img
                  src={URLS + item.img}
                  className="w-full  h-full object-cover rounded-lg "
                  alt=""
                />
                <div className="rounded-full bg-green-400 w-7 h-7 absolute -top-3 -right-3 flex items-center justify-center text-white">
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

        <div className="flex justify-between items-starts pt-2 ">
          <span className="text-base text-[#717171]">Phí vận chuyển</span>
          <span className="text-green-400 text-xl">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(listItemCart.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
