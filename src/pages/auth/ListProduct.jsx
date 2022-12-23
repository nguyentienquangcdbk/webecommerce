import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import productAPi from "../../api/productAPi";
import ReactPaginate from "react-paginate";
import { URLS } from "../../utils";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(page);
  }, [page]);
  const getProduct = async (page) => {
    setLoading(true);
    await productAPi
      .getAll({ page: page })
      .then((res) => {
        console.log(res?.data?.data);
        if (page === 1) {
          setListProduct(res?.data?.data);
        } else {
          const arrListProduct = Object.values(res?.data?.data);
          setListProduct(arrListProduct);
        }
        setLastPage(res?.data?.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const removeProduct = async (id) => {
    await productAPi
      .delete(id)
      .then((res) => {
        toast.success("xóa sản phẩm thành côg");
        getProduct();
        setPage(1);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePageClick = (x) => {
    setPage(x.selected + 1);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">danh sách sản phẩm</h1>
        <Link
          to="add"
          className="px-4 py-2 rounded-lg bg-green-400 text-white text-lg"
        >
          add
        </Link>
      </div>
      <div className="css-scroll-x overflow-x-auto">
        <table className="w-full list_Product ">
          <thead>
            <tr className="bg-gray-300">
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>ảnh 1</th>

              <th>Action</th>
            </tr>
          </thead>
          {loading ? (
            <div className="w-10 h-10 animate-spin mx-auto mt-5 border-8 border-green-500 border-t-transparent rounded-full"></div>
          ) : (
            <tbody>
              {listProduct?.length > 0 &&
                listProduct?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <h2 className="truncate pr-3">{item.name}</h2>
                    </td>
                    <td>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </td>
                    <td>{item.categoryName}</td>
                    <td>
                      <img
                        className="w-12 h-12 object-cover rounded-lg"
                        src={URLS + item.avatar}
                        alt=""
                      />
                    </td>

                    <td>
                      <div className="flex gap-x-3">
                        <button
                          className="p-2 bg-red-400 bg-opacity-60 rounded-lg text-white"
                          onClick={() => removeProduct(item.id)}
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
      </div>
      <div className="mt-10 flex items-center justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          className="flex gap-x-3 items-center "
          pageRangeDisplayed={2}
          forcePage={page - 1}
          pageCount={lastPage}
          pageClassName="w-10 h-10 flex justify-center items-center hover:bg-green-400 rounded-full"
          activeClassName="bg-green-300 text-white"
          // onPageActive={1}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default ListProduct;
