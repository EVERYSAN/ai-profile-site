// components/Chip.tsx
"use client";
import React from "react";

type ChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-full text-sm sm:text-base font-medium transition-colors ${
        selected
          ? "bg-pink-500 text-white"       // ★ 選択: 濃いピンク背景＋白文字
          : "bg-gray-100 text-gray-900"     // ★ 未選択: 薄グレー背景＋濃い文字
      }`}
    >
      {label}
    </button>
  );
};

export default Chip;
