import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SildeBar from "../module/SildeBar";
import { useStore } from "../store/auth";
import { useCart } from "../store/cart";

const AdminLayout = () => {
  const [showSlibar, setShowSlibar] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setItemCart = useCart((state) => state.setItemCart);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user?.isAdmin === 0) {
      navigate("/");
    }
  }, [user]);

  const handleLogOut = async () => {
    await axios({
      method: "post",
      url: "http://103.82.27.248/api/logout",
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
  return (
    <div>
      <div className="flex relative">
        <SildeBar showSlibar={showSlibar} setShowSlibar={setShowSlibar} />
        <div
          className={`flex-1 absolute tran  max-h-[100vh] overflow-scroll overflow-x-hidden w-full`}
        >
          <header className="h-[12vh] w-full bg-gray-100 flex items-center justify-end">
            <div className="flex gap-x-5 items-center">
              <span
                onClick={handleLogOut}
                className="px-4 rounded-lg py-2 bg-black text-orange-500 font-xl cursor-pointer"
              >
                logout
              </span>
              <h1 className="text-lg mr-3 font-semibold">{user?.name}</h1>
            </div>
          </header>
          <div className=" w-full bg-white   py-5 px-0 md:px-5 lg:px-10">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
