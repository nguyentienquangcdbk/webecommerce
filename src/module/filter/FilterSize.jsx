import React, { useEffect, useState } from "react";
import CheckBox from "../../component/CheckBox";
const listSize = ["37", "38", "39", "40", "41", "42", "43", "44"];
const FilterSize = ({ filter, onchange = () => {} }) => {
  const [sizes, setSizes] = useState([]);
  const hanldeChangesize = (size) => {
    setSizes((prev) => {
      if (sizes.includes(size)) {
        return prev.filter((x) => x !== size);
      } else {
        return [...prev, size];
      }
    });
  };
  useEffect(() => {
    onchange(sizes);
  }, [sizes]);

  return (
    <div className="mb-8">
      <h3 className="mb-5 text-xl font-medium">kích cỡ</h3>
      <div className="flex flex-col gap-y-3">
        {listSize.map((item, index) => (
          <CheckBox
            key={item}
            checked={sizes.includes(item)}
            onClick={() => hanldeChangesize(item)}
          >
            {item}
          </CheckBox>
        ))}
      </div>
    </div>
  );
};

export default FilterSize;
