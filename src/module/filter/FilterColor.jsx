import React, { useEffect, useState } from "react";
import CheckBox from "../../component/CheckBox";
const listColor = [
  { value: "đen", label: "đen" },
  { value: "xanh lá", label: "xanh lá" },
  { value: " tím", label: " tím" },
  { value: "đỏ", label: "đỏ" },
  { value: "cam", label: "cam" },
  { value: "vàng", label: "vàng" },
  { value: "trắng", label: "trắng" },
  { value: "hồng", label: "hồng" },
  { value: "nâu", label: "nâu" },
  { value: "xám", label: "xám" },
  { value: "xanh da trời", label: "xanh da trời" },
];
const FilterColor = ({ filter, onchange = () => {} }) => {
  const [colors, setColors] = useState([]);
  const hanldeChangeColor = (color) => {
    setColors((prev) => {
      if (colors.includes(color)) {
        return prev.filter((x) => x !== color);
      } else {
        return [...prev, color];
      }
    });
  };
  useEffect(() => {
    onchange(colors);
  }, [colors]);

  return (
    <div className="mb-8">
      <h3 className="mb-5 text-xl font-medium">màu</h3>
      <div className="flex flex-col gap-y-3">
        {listColor.map((item, index) => (
          <CheckBox
            key={index}
            checked={colors.includes(item.value)}
            onClick={() => hanldeChangeColor(item.value)}
          >
            {item.label}
          </CheckBox>
        ))}
      </div>
    </div>
  );
};

export default FilterColor;
