import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { useStore } from "../store/auth";
import { useCart } from "../store/cart";
import { productStore } from "../store/product";

const listMenu = [
  {
    name: "trang chủ",
    path: "/",
  },
  {
    name: "sản phẩm",
    path: "/products",
  },
  {
    name: "liên hê",
    path: "/contact",
  },
  {
    name: "giới thiệu",
    path: "/about",
  },
];

const HomeLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const listProduct = productStore((state) => state.listProduct);
  const setProduct = productStore((state) => state.setProduct);
  const setItemCart = useCart((state) => state.setItemCart);
  const itemCart = useCart((state) => state.itemCart);
  // const Cart = useCart((state) => state.Cart);

  const handleLogOut = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.message === "Logged out") {
          localStorage.removeItem("token");
          setUser(null);
          setItemCart(null);
          toast("logout");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!listProduct) {
      setProduct();
    }
  }, []);
  // console.log(Cart);
  return (
    <div className="w-full">
      <header className="container mx-auto">
        <div className=" flex items-center justify-between h-[80px] relative">
          {/* header left */}
          <div className="logo">
            <Link
              className="leading-[5rem] text-4xl text-green-300 font-bold text-shadow-xl"
              to="/"
            >
              sneaker
            </Link>
          </div>

          {/* header center */}
          <div
            className={`menu flex ${
              !toggleMenu ? "mt-[-400px] " : null
            } lg:mt-0   items-center  z-50 lg:z-0   w-full bg-white justify-center  gap-y-10 gap-x-4 text-xl font-semibold `}
          >
            {listMenu.map((item, index) => (
              <Link key={index} className="hover:text-green-400" to={item.path}>
                {item.name}
              </Link>
            ))}
          </div>
          {/* header right */}
          <div className="flex gap-x-4">
            <div className="search hover:text-green-400 cursor-pointer">
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <Link
              to={user?.cart ? "/cart" : "/sign-in"}
              className="cart hover:text-green-400 cursor-pointer relative"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCart && (
                <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {itemCart?.reduce((result, prod) => {
                    return result + prod.quantity;
                  }, 0)}
                </div>
              )}
            </Link>

            {!user ? (
              <Link
                to="/sign-in"
                className="auth hover:text-green-400 cursor-pointer"
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            ) : (
              <>
                <span
                  onClick={handleLogOut}
                  className="text-gray-400 font-xl cursor-pointer hover:text-green-400"
                >
                  logout
                </span>
                {user?.isAdmin === 1 && (
                  <Link
                    to="/admin"
                    className="px-3 py-1 rounded-lg bg-violet-500 text-white text-lg"
                  >
                    admin
                  </Link>
                )}
              </>
            )}
            <div
              onClick={() => setToggleMenu(!toggleMenu)}
              className="bar block lg:hidden hover:text-green-400 cursor-pointer"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <Outlet></Outlet>

      <div className="bg-gray-100">
        <footer className="mx-auto container py-10 px-5 ">
          <div className="grid grid-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
            <div>
              <h3 className="font-semibold text-xl mb-5">Tổng Đài Hỗ Trợ</h3>
              <ul className="flex flex-col gap-y-5">
                <li>
                  Liên hệ đặt hàng <strong>097873874</strong>
                </li>
                <li>
                  thắc mắc đơn hàng <strong>097873874</strong>
                </li>
                <li>
                  góp ý khiếu nại <strong>097873874</strong>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-5">Về sneaker</h3>
              <ul className="flex flex-col gap-y-5">
                <li>Giới thiệu</li>
                <li>Liên hệ</li>
                <li>Tuyển dụng</li>
                <li>Tin tức</li>
                <li>Hệ thống cửa hàng</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-5">
                Chăm Sóc Khách Hàng
              </h3>
              <ul className="flex flex-col gap-y-5">
                <li>Chính sách đổi trả</li>
                <li>Chính sách bảo hàng</li>
                <li>Chính sách hoàn tiền</li>
              </ul>
            </div>

            <div>
              <h3 className=" text-4xl text-green-300 font-bold text-shadow-xl mb-5 mt-[-16px]">
                sneaker
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias omnis delectus deserunt ipsa veritatis quidem error.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomeLayout;
