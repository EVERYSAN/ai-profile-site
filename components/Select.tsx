"use client";
import React, { useState, useRef, useEffect } from "react";

type SelectProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full" ref={ref}>
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen((o) => !o);
            e.preventDefault();
          }
        }}
        className="w-full border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value || "選択してください"}</span>
        <span aria-hidden>▼</span>
      </div>
      {open && (
        <ul
          role="listbox"
          className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg bg-white"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
