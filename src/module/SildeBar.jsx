import React from "react";
import { Link, NavLink } from "react-router-dom";

const SildeBar = ({ showSlibar, setShowSlibar }) => {
  return (
    <div
      className={` w-[250px] fixed z-10 bg-white  top-0 left-0 bottom-0   border-r-gray-400 border-r pt-10 px-5 tran ${
        showSlibar ? "left " : " left-[-250px]"
      } `}
    >
      <Link to="/" className="mb-10 flex items-center justify-center">
        <img srcSet="Logo.png 2x" alt="logo" />
      </Link>
      <div className="mt-10 flex flex-col gap-y-10">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2  text-lg w-full  p-5 text-green-500"
              : "py-2  text-lg w-full   p-5 text-gray-500"
          }
          to="/admin"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2  text-lg w-full  p-5 text-green-500"
              : "py-2  text-lg w-full   p-5 text-gray-500"
          }
          to="/admin/product"
        >
          sản phẩm
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2  text-lg w-full  p-5 text-green-500"
              : "py-2  text-lg w-full   p-5 text-gray-500"
          }
          to="/admin/category"
        >
          nhà sản xuất
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2  text-lg w-full  p-5 text-green-500"
              : "py-2  text-lg w-full   p-5 text-gray-500"
          }
          to="/admin/order"
        >
          đơn hàng
        </NavLink>
      </div>

      <div
        onClick={() => setShowSlibar(!showSlibar)}
        className="absolute top-[5%]  right-[-37px] flex items-center  tran bg-white showNavBar shadow-green-400 shadow-sm h-14 w-10"
      >
        <div className={`${showSlibar ? "rotate-180" : null} tran`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SildeBar;
