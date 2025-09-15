import React from "react";

const Input = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        className="w-full rounded-md border-2 border-gray-300 p-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
