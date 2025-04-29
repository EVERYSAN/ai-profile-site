// components/PreviewCard.tsx
"use client";
import React from "react";

type PreviewCardProps = {
  mode: "pairs" | "tinder";
  content?: string;
};

const PreviewCard: React.FC<PreviewCardProps> = ({ mode, content }) => {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
      {/* タブ */}
      <div className="flex">
        <div
          className={`flex-1 text-center py-2 font-medium ${
            mode === "pairs" ? "bg-white text-black" : "bg-gray-100 text-gray-500"
          }`}
        >
          Pairs プレビュー
        </div>
        <div
          className={`flex-1 text-center py-2 font-medium ${
            mode === "tinder" ? "bg-white text-black" : "bg-gray-100 text-gray-500"
          }`}
        >
          Tinder プレビュー
        </div>
      </div>
      {/* AI結果 or ダミー */}
      <div className="p-4">
        {content ? (
          <p className="whitespace-pre-wrap text-sm text-gray-800">{content}</p>
        ) : (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full"></div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
