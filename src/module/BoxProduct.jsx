import React from "react";
import { Link } from "react-router-dom";
const BoxProduct = ({ item, props }) => {
  return (
    <div className="box mb-5 h-[450px]">
      <div className="relative rounded-lg  w-full h-[260px] mb-5 overflow-hidden">
        <img
          className="w-full rounded-lg h-full object-cover absolute inset-0  tran hover:scale-150"
          src={item.ImgPath}
          alt=""
        />
      </div>
      <Link
        to={`/products/${item?.id}`}
        className="text-lg css-name-product font-semibold  max-h-[60px] h-[60px] block overflow-hidden text-ellipsis"
      >
        {item?.name}
      </Link>
      <div className="flex flex-col items-center justify-between gap-y-3">
        <p className="font-semibold text-xl">
          <span>
            {" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item?.price)}
          </span>{" "}
        </p>
        <Link
          to={`/products/${item?.id}`}
          className="bg-green-500  text-white px-4 py-3 rounded-lg text-xl hover:bg-green-600"
        >
          xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default BoxProduct;
