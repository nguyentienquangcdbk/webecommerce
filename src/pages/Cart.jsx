import React from "react";
import { toast } from "react-toastify";
import itemCartAPi from "../api/itemCartApi";
import { useStore } from "../store/auth";
import { useCart } from "../store/cart";
import noCart from "../img/no-cart.png";
import { URLS } from "../utils";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import Label from "../component/Label";
// import Input from "../component/Input";

const Cart = () => {
  document.title = "giỏ hàng";
  const itemCart = useCart((state) => state.itemCart);
  const user = useStore((state) => state.user);
  const updateCart = useCart((state) => state.updateCart);
  const counter = useCart((state) => state.counter);
  const setCounter = useCart((state) => state.setCounter);

  const quantity = itemCart?.reduce((result, prod) => {
    return result + prod.quantity;
  }, 0);

  const total = itemCart?.reduce((result, prod) => {
    return result + Number(prod.price) * prod.quantity;
  }, 0);

  const handleDe = async (id) => {
    // decrementAnItem(id);
    setCounter(id);
    await itemCartAPi.decrement(id).then((res) => {
      updateCart(user?.cart.id);
      console.log(res);
    });
  };
  const handleIn = async (id) => {
    // incrementByAmount(id);
    setCounter(id);
    await itemCartAPi.increment(id).then((res) => {
      console.log(res);
      updateCart(user?.cart.id);
    });
  };
  const handleRemove = async (id) => {
    await itemCartAPi.delete(id).then((res) => {
      console.log(res);
      if (res?.data === 1) {
        updateCart(user?.cart.id);
        toast("xóa sản phẩm thành công");
      }
    });
  };
  return (
    <>
      <Link
        to="/"
        className="bg-black py-3 px-5 rounded-lg fixed right-10 bottom-5  inline-block text-orange-400"
      >
        đơn hàng đang giao {user?.order.length}
      </Link>
      {quantity === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex flex-col gap-y-5 items-center">
            <img
              src={noCart}
              className="w-[500px] h-[250px] object-cover"
              alt=""
            />
            <p className="text-gray-500">giỏ hàng của bạn trống</p>
            <Link
              to="/products"
              className="px-3 py-1 w-[250px]  flex justify-center items-center rounded-lg bg-violet-500 text-white text-lg"
            >
              mua ngay
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row  items-start gap-x-5 py-10 container mx-auto mt-10">
          <div className="w-full css-scroll-x overflow-x-auto">
            <table className=" table_cart w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-start py-3 font-semibold">img</th>
                  <th className="text-start py-3 font-semibold">name</th>
                  <th className="text-start py-3 font-semibold">price</th>
                  <th className="text-start py-3 font-semibold">size</th>
                  <th className="text-start py-3 font-semibold">số lượng</th>
                  <th className="text-start py-3 font-semibold">xóa</th>
                </tr>
              </thead>
              <tbody>
                {itemCart.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-b-gray-100 p-3 ${
                      counter === item.id
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    <td>
                      <img
                        src={URLS + item?.avatar}
                        className="w-10 h-10 object-cover rounded-lg"
                        alt=""
                      />
                    </td>
                    <td>
                      <h1
                        title={item.name}
                        className="truncate cursor-po h-[51px] w-full block text-lg font-medium"
                      >
                        {item.name}
                      </h1>
                    </td>
                    <td>
                      <p>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item?.price)}
                      </p>
                    </td>
                    <td>
                      <p>{item.size}</p>
                    </td>
                    <td>
                      <div className="flex select-none gap-x-4 border mx-3 border-gray-200 rounded-lg items-center justify-between p-2 text-xl font-semibold ">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleDe(item.id)}
                        >
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleIn(item.id)}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        onClick={() => handleRemove(item.id)}
                        className="w-10 h-10 bg-red-400 text-white cursor-pointer flex items-center justify-center rounded-lg bg-opacity-50"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border flex flex-col gap-y-6 border-gray-400 rounded-lg w-[400px] h-[400px] mt-10 lg:mt-0">
            <h1 className="mt-5 ml-3 text-lg font-medium">
              tổng sản phẩm : {quantity}
            </h1>
            <h2 className="mt-5 ml-3 text-lg font-medium">
              tổng giá :{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </h2>

            <div className="flex gap-x-3 border-t border-gray-200 pt-5 justify-center">
              <Link
                to="/products"
                className="bg-green-400 px-4 py-2 text-white rounded-lg"
              >
                tiếp tục mua sắm
              </Link>
              <Link
                to="/checkout"
                className="bg-green-400 px-4 py-2 text-white rounded-lg"
              >
                mua ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
