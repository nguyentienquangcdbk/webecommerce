import React, { useEffect, useState } from "react";
import CheckBox from "../../component/CheckBox";

const categories = ["adidas", "vanz", "Nike", "Puma", "MLB"];
const FilterCategory = ({ filters = [], onChange = () => {} }) => {
  const [categoryIds, setCategoryIds] = useState([]);
  const handleCategory = (id) => {
    setCategoryIds((prev) => {
      if (filters.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
    onChange(categoryIds);
  };
  useEffect(() => {
    onChange(categoryIds);
  }, [categoryIds]);
  return (
    <div className="mb-8">
      <h3 className="mb-5 text-xl font-medium">danh mục</h3>
      <div className="flex flex-col gap-y-3">
        {categories.map((item, index) => (
          <CheckBox
            key={index}
            checked={categoryIds.includes(item)}
            onClick={() => handleCategory(item)}
          >
            {item}
          </CheckBox>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
