import React, { useEffect, useState } from "react";
import productAPi from "../api/productAPi";
import BoxProduct from "../module/BoxProduct";
import FilterCategory from "../module/filter/FilterCategory";
import FilterSize from "../module/filter/FilterSize";
import FilterColor from "../module/filter/FilterColor";
import ReactPaginate from "react-paginate";

const POST_PER_PAGE = 8;
const Products = () => {
  document.title = "danh sách sản phẩm";
  const [showFilter, setShowFilter] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("DESC");
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  // const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    color: [],
    size: [],
    category: [],
    _page: 1,
  });
  const [filterProductList, setFilterProductList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const products = await productAPi.getAll({
        categoryName: filters.category,
        color: filters.color,
        size: filters.size,
        _sort: "price",
        _order: sort,
        _page: page,
        _limit: POST_PER_PAGE,
      });

      setFilterProductList(products.data);
      setLoading(false);
    }
    fetchData();
  }, [sort, filters, page]);
  useEffect(() => {
    async function fetchData() {
      const products = await productAPi.getAll({
        categoryName: filters.category,
        color: filters.color,
        size: filters.size,
      });
      const totalProduct = products?.data.length;
      setPageCount(Math.ceil(totalProduct / 8));

      // setFilterProductList(products.data);
    }
    fetchData();
  }, [sort, filters, page]);
  console.log(filterProductList);

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
      <div className="flex items-start gap-x-5 ">
        <div
          className={`boloc ${
            showFilter ? "translate-x-[0px]" : "-translate-x-[250px]"
          } w-full max-w-[250px] lg:translate-x-[0px] bg-white  px-5 z-[100] tran`}
        >
          <span
            className="absolute top-5 right-5 block lg:hidden  cursor-pointer hover:text-green-400"
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
          {/* <FilterSize onchange={handleFilterSize}></FilterSize> */}
          <FilterColor onchange={handleFilterColor}></FilterColor>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`px-4 py-2 block lg:hidden bg-green-400 text-white   hover:bg-green-500`}
            >
              bộ lọc
            </button>

            <div className="flex">
              <button
                className={`${
                  sort === "DESC"
                    ? "bg-green-400 text-white"
                    : "text-black bg-white"
                } px-2 py-1  border-2 border-green-400 `}
                onClick={() => setSort("DESC")}
              >
                giảm dần theo giá
              </button>
              <button
                onClick={() => setSort("ASC")}
                className={`${
                  sort === "ASC"
                    ? "bg-green-400 text-white"
                    : "text-black bg-white"
                } px-2 py-1  border-2 border-green-400 `}
              >
                tăng dần theo giá
              </button>
            </div>
          </div>
          {loading ? (
            <div className="w-10 h-10 animate-spin mx-auto mt-5 border-8 border-green-500 border-t-transparent rounded-full"></div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5">
              {filterProductList?.length > 0 &&
                filterProductList.map((item, index) => (
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
              pageCount={pageCount}
              pageClassName="w-10 h-10 flex justify-center items-center hover:bg-green-400 rounded-full"
              activeClassName="bg-green-300 text-white"
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
