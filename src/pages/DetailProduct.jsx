import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoxProduct from "../module/BoxProduct";
import parse from "html-react-parser";
import { useCart } from "../store/cart";
import productAPi from "../api/productAPi";

const DetailProduct = () => {
  const param = useParams();
  const [size, setSize] = useState(null);
  const [listProducts, setListProducts] = useState(null);
  const addToCart = useCart((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await productAPi.getId(param.id);

      setItem(res?.data);
      setLoading(false);
      console.log(res);
    })();
    document.title = "chi tiết sản phẩm";
  }, [param.id]);

  useEffect(() => {
    const getProduct = async () => {
      const products = await productAPi.getAll({ _page: 1, _limit: 3 });
      setListProducts(products.data);
    };
    getProduct();
  }, []);

  const updateQuantity = (type) => {
    if (type === "giam") {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const check = () => {
    if (size === null) {
      alert("vui lòng chọn size");
      return false;
    } else {
      return true;
    }
  };

  const addToCarts = async () => {
    const checks = check();
    if (checks) {
      let newItem = {
        id: item?.id,
        img: item?.ImgPath,
        name: item?.name,
        price: item?.price,
        quantity: quantity,
        size: size,
      };
      addToCart(newItem);
    }
  };
  return (
    <>
      {loading ? (
        <div className="mx-auto mt-10 w-10 h-10 rounded-full border-4 border-green-300 border-t-transparent animate-spin"></div>
      ) : (
        <div className="container mx-auto">
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="w-full h-[500px] rounded-lg">
              <img
                className="w-full h-[333px] object-cover rounded-lg mb-5"
                src={item?.ImgPath}
                alt=""
              />
            </div>
            <div className="w-full px-5">
              <h1 className="text-3xl font-semibold mb-5 ">{item?.name}</h1>
              <p className="text-xl font-semibold mb-5 text-green-400">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item?.price)}
              </p>
              <div className="mb-10">
                <p className="mb-5 text-lg">kích cỡ</p>
                <div className="flex gap-x-3">
                  {item?.size?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSize(item)}
                      className={`w-10 h-10 flex cursor-pointer  items-center justify-center bg-green-400 text-white rounded-lg ${
                        size === item ? "border-2 border-green-600" : null
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* số lượng */}
              <div className="flex mb-5 select-none items-center justify-between w-[150px] border border-gray-400 rounded-lg px-4 py-2">
                <div
                  onClick={() => updateQuantity("giam")}
                  className="incement"
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
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
                <div>{quantity}</div>
                <div onClick={() => updateQuantity("tang")}>
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
              <button
                // disabled={disabled}
                onClick={() => addToCarts()}
                className="bg-green-500 select-none text-white px-4 py-3 rounded-lg text-xl hover:bg-green-600"
              >
                thêm vào giỏ hàng
              </button>
            </div>
          </div>
          <div className="flex gap-x-12 flex-col lg:flex-row">
            {/* story */}
            <div className="story lg:w-[70%] w-full px-5">
              <h1 className="text-xl font-bold">story</h1>

              {item && parse(item?.description)}
            </div>

            {/* sản phẩm tương tự */}
            <div className="lg:w-[30%] w-full px-5">
              <h1 className="text-xl font-bold mb-5">khám phá thêm</h1>
              <div className="flex flex-col">
                {listProducts?.length > 0 &&
                  listProducts.map((item, index) => (
                    <BoxProduct key={index} item={item}></BoxProduct>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
