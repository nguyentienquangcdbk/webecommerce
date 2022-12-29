import React from "react";
// import { Link } from "react-router-dom";
import BoxProduct from "../module/BoxProduct";
import { productStore } from "../store/product";
import polyCard from "../asset/polycard";
import PolyCart from "../module/PolyCart";
import banner from "../img/banner.png";
const Home = () => {
  document.title = "trang chủ";
  const listProduct = productStore((state) => state.listProduct);
  console.log(listProduct);
  return (
    <div className="">
      <div className="banner w-full h-[40vh] lg:h-[70vh] mb-10">
        <img className="w-full h-full object-cover" src={banner} alt="" />
      </div>

      <div className="container mx-auto mb-10 ">
        <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12 sm:px-0 gap-x-5 gap-y-5">
          {polyCard.map((item, index) => (
            <PolyCart
              name={item.name}
              description={item.description}
              icon={item.icon}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto mb-10">
        <h1 className="text-center text-2xl font-semibold mb-12">
          sản phẩm bán chạy trong tuần
        </h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5">
          {listProduct?.length > 0 &&
            listProduct
              .slice(0, 8)
              .sort(function () {
                return 0.5 - Math.random();
              })
              .map((item, index) => (
                <BoxProduct key={index} item={item}></BoxProduct>
              ))}
        </div>
      </div>
      <div className="container mx-auto mb-10">
        <h1 className="text-center text-2xl font-semibold mb-12">
          sản phẩm phổ biến
        </h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5">
          {listProduct?.length > 0 &&
            listProduct
              .slice(0, 7)
              .sort(function () {
                return 0.5 - Math.random();
              })
              .map((item, index) => (
                <BoxProduct key={index} item={item}></BoxProduct>
              ))}
          {/* <BoxProduct></BoxProduct>
          <BoxProduct></BoxProduct>
          <BoxProduct></BoxProduct>
          <BoxProduct></BoxProduct>
          <BoxProduct></BoxProduct> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
