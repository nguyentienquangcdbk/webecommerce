import React from "react";

import { useCart } from "../store/cart";
import noCart from "../img/no-cart.png";
import { Link } from "react-router-dom";
import { Remove } from "../icon";
const Cart = () => {
  document.title = "giỏ hàng";
  const itemCart = useCart((state) => state.itemCart);
  const decrementAnItem = useCart((state) => state.decrementAnItem);
  const incrementByAmount = useCart((state) => state.incrementByAmount);
  const removeCart = useCart((state) => state.removeCart);
  // const updateCart = useCart((state) => state.updateCart);
  const counter = useCart((state) => state.counter);

  const quantity = itemCart?.reduce((result, prod) => {
    return result + prod.quantity;
  }, 0);

  const total = itemCart?.reduce((result, prod) => {
    return result + Number(prod.price) * prod.quantity;
  }, 0);

  const handleDe = (id) => {
    decrementAnItem(id);
  };
  const handleIn = (id) => {
    incrementByAmount(id);
  };
  const handleRemove = (id) => {
    removeCart(id);
  };
  return (
    <>
      <Link
        to="/"
        className="bg-black py-3 px-5 rounded-lg fixed right-10 bottom-5  inline-block text-orange-400"
      >
        {/* đơn hàng đang giao {user?.order.length} */}
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
                        src={item?.img}
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
                          onClick={() => handleDe(item.idCart)}
                        >
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleIn(item.idCart)}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        onClick={() => handleRemove(item.idCart)}
                        className="w-10 h-10 bg-red-400 text-white cursor-pointer flex items-center justify-center rounded-lg bg-opacity-50"
                      >
                        <Remove />
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
