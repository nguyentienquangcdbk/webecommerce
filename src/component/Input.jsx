import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  type = "text",
  name = "",
  error = "",
  placeholder = "",
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative mt-5">
      <input
        type={type}
        {...field}
        {...props}
        placeholder={placeholder}
        //   {...register("name")}
        className={`w-full px-4 py-3  border rounded-lg border-[#EDEDF2] outline-none focus:border-green-500 mb-2 ${
          error.length > 0 ? "border-red-400 placeholder:text-red-500" : null
        }`}
        //   placeholder="nhâp tên danh mục..."
      />
      <span className="text-red-500 text-base">{error}</span>
    </div>
  );
};

export default Input;
