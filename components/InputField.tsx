// components/InputField.tsx
"use client";
import React from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
}) => {
  const id = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
