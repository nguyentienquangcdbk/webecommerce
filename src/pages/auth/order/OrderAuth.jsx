import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderAPi from "../../../api/orderApi";

const OrderAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listOrder, setListOrder] = useState();

  useEffect(() => {
    document.title = "trang đơn hàng";
    getOrder();
  }, []);

  const getOrder = async () => {
    setLoading(true);
    await orderAPi
      .getAll()
      .then((res) => {
        console.log(res);

        setListOrder(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const removeOrder = async (id) => {
    await orderAPi
      .delete(id)
      .then((res) => {
        console.log(res);
        getOrder();
        toast.success("xóa thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="css-scroll-x overflow-x-auto">
        <table className="w-[1200px] lg:w-full list_Order">
          <thead>
            <tr className="bg-gray-300">
              <th>id</th>
              <th>name</th>
              <th>tổng tiền</th>
              <th>đia chỉ cụ thể</th>
              <th>địa chỉ </th>
              <th>ngày tạo</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading ? (
            <div className="w-10 h-10 animate-spin mx-auto mt-5 border-8 border-green-500 border-t-transparent rounded-full"></div>
          ) : (
            <tbody>
              {listOrder?.length > 0 &&
                listOrder.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      <h2 className="truncate group relative">{item.name}</h2>
                    </td>
                    <td>{item?.totalPrice}</td>
                    <td>{item?.address}</td>
                    <td>{item?.pathAddress}</td>
                    <td>{item?.time}</td>
                    <td>
                      <div className="flex gap-x-3">
                        <button
                          className="p-2 bg-red-400 bg-opacity-60 rounded-lg text-white"
                          onClick={() => removeOrder(item.id)}
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
                        </button>
                        <button
                          onClick={() => navigate(`edit/${item.id}`)}
                          className="p-2 bg-yellow-400 bg-opacity-60 rounded-lg text-white"
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
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <div className="mt-10 flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default OrderAuth;
