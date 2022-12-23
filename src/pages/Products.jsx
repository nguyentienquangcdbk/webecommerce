import React, { useEffect, useState } from "react";
// import CheckBox from "../component/CheckBox";
import BoxProduct from "../module/BoxProduct";
import FilterCategory from "../module/filter/FilterCategory";
import FilterColor from "../module/filter/FilterColor";
import FilterSize from "../module/filter/FilterSize";
import productAPi from "../api/productAPi";
import ReactPaginate from "react-paginate";
const Products = () => {
  document.title = "danh sách sản phẩm";
  const [showFilter, setShowFilter] = useState(false);
  // const [sort, setSort] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    category: [],
    page: 1,
  });
  const [filterProductList, setFilterProductList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await productAPi.getAll({
          category: filters.category,
          color: filters.color,
          size: filters.size,
          time: filters.time,
          page: page,
        });
        console.log(res);
        // if (res?.data.count === 1) {
        //   setFilterProductList(res?.data.data);
        // } else {
        if (typeof res?.data.data === "object") {
          const arrListProduct = Object.values(res?.data.data);
          setFilterProductList(arrListProduct);
        } else {
          setFilterProductList(res?.data);
        }
        // }
        setLastPage(res?.data?.last_page);
        setLoading(false);
      } catch {
        console.log("error");
        setLoading(false);
      }
    })();
    console.log(filters);
  }, [filters, page]);

  const handleSort = (e) => {
    console.log(e);
    if (e === filters.time) {
      return;
    } else {
      setFilters({
        ...filters,
        time: e,
      });
    }
    console.log(e);
  };

  const handleFilterCategory = (category) => {
    setFilters({
      ...filters,
      category: category,
    });
    setPage(1);
  };
  const handleFilterColor = (colors) => {
    setFilters({
      ...filters,
      color: colors,
    });
    setPage(1);
  };

  const handleFilterSize = (size) => {
    setFilters({
      ...filters,
      size: size,
    });
    setPage(1);
  };

  const handlePageClick = (x) => {
    setPage(x.selected + 1);
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="flex items-start ">
        <div
          className={`boloc ${
            showFilter ? "translate-x-0" : "-translate-x-[250px]"
          } bg-white tran lg:translate-x-0  w-[250px] z-10 lg:p-0 py-10 px-5`}
        >
          <span
            className="absolute top-5 right-5 block lg:hidden cursor-pointer hover:text-green-400"
            onClick={() => setShowFilter(false)}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <FilterCategory onChange={handleFilterCategory} />
          <FilterSize onchange={handleFilterSize}></FilterSize>
          <FilterColor onchange={handleFilterColor}></FilterColor>
        </div>
        <div className="w-full flex-1">
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`px-4 py-2 block lg:hidden bg-green-400 text-white   hover:bg-green-500`}
            >
              bộ lọc
            </button>

            <div className="sort border border-gray-400">
              <button
                onClick={() => handleSort("desc")}
                className={`px-4 py-2 ${
                  filters.time === "desc"
                    ? "bg-green-400  text-white"
                    : "bg-white text-black"
                } `}
              >
                giá tăng dần
              </button>
              <button
                onClick={() => handleSort("ASC")}
                className={`px-4 py-2 ${
                  filters.time === "ASC"
                    ? "bg-green-400  text-white"
                    : "bg-white text-black"
                }`}
              >
                giá giảm dần
              </button>
            </div>
          </div>
          {loading ? (
            <div className="w-10 h-10 animate-spin mx-auto mt-5 border-8 border-green-500 border-t-transparent rounded-full"></div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5">
              {filterProductList?.length > 0 &&
                filterProductList?.map((item, index) => (
                  <BoxProduct key={index} item={item}></BoxProduct>
                ))}
            </div>
          )}

          {!loading && filterProductList?.length === 0 && (
            <div>không tìm thầy sản phẩm nào</div>
          )}

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
      </div>
    </div>
  );
};

export default Products;
