import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productAPi from "../api/productAPi";
import BoxProduct from "../module/BoxProduct";
import { URLS } from "../utils";
import parse from "html-react-parser";
import { productStore } from "../store/product";
import { useCart } from "../store/cart";
import cartAPi from "../api/cartAPi";
import { toast } from "react-toastify";
import { useStore } from "../store/auth";

const DetailProduct = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [img, setImg] = useState(null);
  const [listSize, setListSize] = useState(null);
  const [sliderImg, setSliderImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const listProduct = productStore((state) => state.listProduct);
  // const Cart = useCart((state) => state.Cart);
  const user = useStore((state) => state.user);
  const updateCart = useCart((state) => state.updateCart);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await productAPi.getId(param.id);
      setProduct(res?.data?.product);
      setListSize(res?.data?.size);
      setImg(res?.data?.img);
      setLoading(false);
      console.log(res);
    })();
    document.title = "chi tiết sản phẩm";
  }, [param.id]);

  const updateQuantity = (type) => {
    if (type === "giam") {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const addToCarts = async () => {
    setDisabled(true);
    if (size != null && user) {
      let newItem = {
        id: user?.cart.id,
        productId: product?.id,
        name: product?.name,
        avatar: product?.avatar,
        price: product?.price,
        quantity: quantity,
        size: size,
      };

      await cartAPi.add(newItem).then((res) => {
        console.log(res);
        if (res?.status === 200) {
          toast("thêm sản phẩm thành công");
          updateCart(user?.cart.id);
          setDisabled(false);
          // return;
        }
      });
    } else {
      if (size === null) {
        alert("vui lòng chọn size");
        setDisabled(false);
      } else {
        navigate("/sign-in");
        setDisabled(false);
      }
    }
    // console.log(Cart);
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
                src={sliderImg ? URLS + sliderImg : URLS + product?.avatar}
                alt=""
              />
              <div className="w-full overflow-x-auto flex gap-x-5 items-center justify-center">
                {img?.length > 0 &&
                  img.map((item, index) => (
                    <img
                      key={item.id}
                      onClick={() => setSliderImg(item?.name)}
                      className="w-20 h-20 object-cover rounded-lg"
                      src={URLS + item.name}
                      alt=""
                    />
                  ))}
              </div>
            </div>
            <div className="w-full px-5">
              <h1 className="text-3xl font-semibold mb-5 ">
                quần jean phong cách
              </h1>
              <p className="text-xl font-semibold mb-5 text-green-400">
                189,000
              </p>
              <div className="mb-10">
                <p className="mb-5 text-lg">kích cỡ</p>
                <div className="flex gap-x-3">
                  {listSize?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSize(item.value)}
                      className={`w-10 h-10 flex cursor-pointer  items-center justify-center bg-green-400 text-white rounded-lg ${
                        size === item.value ? "border-2 border-green-600" : null
                      }`}
                    >
                      {item.value}
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
                disabled={disabled}
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

              {product && parse(product?.description)}
            </div>

            {/* sản phẩm tương tự */}
            <div className="lg:w-[30%] w-full px-5">
              <h1 className="text-xl font-bold mb-5">khám phá thêm</h1>
              <div className="flex flex-col">
                {listProduct?.length > 0 &&
                  listProduct
                    .slice(0, 3)
                    .sort(function () {
                      return 0.5 - Math.random();
                    })
                    .map((item, index) => (
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
