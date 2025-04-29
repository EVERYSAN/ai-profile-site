"use client";
import React from "react";

type HeaderTabsProps = {
  active: "pairs" | "tinder";
  onChange: (mode: "pairs" | "tinder") => void;
};

const HeaderTabs: React.FC<HeaderTabsProps> = ({ active, onChange }) => {
  return (
    <div role="tablist" className="flex w-full max-w-md mx-auto rounded-lg overflow-hidden">
      <button
        role="tab"
        aria-selected={active === "pairs"}
        className={`flex-1 py-2 text-center font-medium transition-colors ${
          active === "pairs" ? "bg-[#3DA9FC] text-white" : "bg-[#E0F2FE] text-[#065FAD]"
        }`}
        onClick={() => onChange("pairs")}
      >
        Pairs
      </button>
      <button
        role="tab"
        aria-selected={active === "tinder"}
        className={`flex-1 py-2 text-center font-medium transition-colors ${
          active === "tinder" ? "bg-[#FF6B72] text-white" : "bg-[#FFE5E8] text-[#A82836]"
        }`}
        onClick={() => onChange("tinder")}
      >
        Tinder
      </button>
    </div>
  );
};

export default HeaderTabs;
