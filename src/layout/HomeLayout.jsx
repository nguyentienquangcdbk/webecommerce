import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useCart } from "../store/cart";
import { CartIcon, NavIcon, Search, User } from "../icon";
import Footer from "./Footer";

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
  const itemCart = useCart((state) => state.itemCart);

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
              <Search />
            </div>
            <Link
              to={"/cart"}
              className="cart hover:text-green-400 cursor-pointer relative"
            >
              <CartIcon />
              {itemCart && (
                <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {itemCart?.reduce((result, prod) => {
                    return result + prod.quantity;
                  }, 0)}
                </div>
              )}
            </Link>

            <Link
              to="/sign-in"
              className="auth hover:text-green-400 cursor-pointer"
            >
              <User />
            </Link>

            <div
              onClick={() => setToggleMenu(!toggleMenu)}
              className="bar block lg:hidden hover:text-green-400 cursor-pointer"
            >
              <NavIcon />
            </div>
          </div>
        </div>
      </header>

      <Outlet></Outlet>

      <div className="bg-gray-100">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
