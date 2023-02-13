import React from "react";
// import { Link } from "react-router-dom";
import BoxProduct from "../module/BoxProduct";
import polyCard from "../asset/polycard";
import PolyCart from "../module/PolyCart";
import banner from "../img/banner.png";
import { useEffect } from "react";

import { useState } from "react";
import productAPi from "../api/productAPi";
import BannerSilder from "../module/BannerSilder";
const Home = () => {
  document.title = "trang chủ";
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const products = await productAPi.getAll({ _page: 1, _limit: 8 });
      console.log(products);
      setListProduct(products.data);
    };
    getProduct();
  }, []);
  // const listProduct = productStore((state) => state.listProduct);

  return (
    <div className="">
      <BannerSilder />

      <div className="container mx-auto mb-10 ">
        <div className=" flex flex-wrap justify-center px-12 sm:px-0 gap-x-5 gap-y-5">
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

      <div className=" container flex flex-col md:flex-row gap-x-5 mx-auto mt-10">
        <div className="w-full md:w-[50%] p-5">
          <img
            src="https://theme.hstatic.net/200000306687/1000886682/14/home_about_bot.png?v=104"
            className="w-full object-cover rounded-lg"
            alt=""
          />
        </div>
        <div className="w-full md:w-[50%] p-5">
          <h1 className="text-5xl mb-5 font-semibold">Phong cách của bạn</h1>
          <p className="text-gray-400 text-base">
            Mở khóa phong cách và doanh số bán hàng độc quyền, giảm sản phẩm và
            những lần hợp tác mới nhất của chúng tôi với cộng đồng Converse -
            tất cả đều được gửi thẳng đến hộp thư đến của bạn.
          </p>
        </div>
      </div>

      <div className="container mx-auto mb-10">
        <h1 className="text-center text-2xl font-semibold mb-12">
          sản phẩm bán chạy trong tuần
        </h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5">
          {listProduct?.length > 0 &&
            listProduct.map((item, index) => (
              <BoxProduct key={index} item={item}></BoxProduct>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
