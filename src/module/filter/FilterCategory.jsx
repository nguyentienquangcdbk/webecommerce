import React, { useEffect, useState } from "react";
import CheckBox from "../../component/CheckBox";

const categories = ["adidas", "vanz", "Nike", "Puma", "MLB"];
const FilterCategory = ({ filter, onChange = () => {} }) => {
  // const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const handleCategory = (id) => {
    console.log(id);
    setCategoryIds((prev) => {
      if (categoryIds.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
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
            key={item.id}
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
