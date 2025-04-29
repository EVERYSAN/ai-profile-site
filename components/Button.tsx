// components/Button.tsx
"use client";
import React from 'react';

type ButtonProps = {
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 sm:py-4 text-base sm:text-lg font-medium transition-colors"
    >
      プロフィール生成
    </button>
  );
};

export default Button;
