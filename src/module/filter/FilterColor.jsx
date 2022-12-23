import React, { useEffect, useState } from "react";
import CheckBox from "../../component/CheckBox";
const listColor = [
  {
    label: "trắng",
    value: "white",
  },
  {
    label: "vàng",
    value: "yellow",
  },
  {
    label: "đen",
    value: "black",
  },
  {
    label: "đỏ",
    value: "red",
  },
  {
    label: "xanh lá",
    value: "green",
  },
  {
    label: "tím",
    value: "violet",
  },
  {
    label: "cam",
    value: "orange",
  },
  {
    label: "xanh nước biển",
    value: "blue",
  },
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
