import React from "react";

const PolyCart = ({ name, description, icon }) => {
  return (
    <div className="group">
      <div className="flex w-full group-hover:-translate-y-5 transition-all  px-5  h-[80px] py-2 items-center justify-between rounded-lg shadow-lg">
        <div className="text-green-400">{icon}</div>
        <div className="flex flex-col gap-y-3">
          <h5 className="font-semibold text-lg">{name}</h5>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PolyCart;
