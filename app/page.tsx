// app/page.tsx
"use client";
import React, { useState } from "react";
import HeaderTabs from "../components/HeaderTabs";
import InputField from "../components/InputField";
import Chip from "../components/Chip";
import Select from "../components/Select";
import Button from "../components/Button";
import PreviewCard from "../components/PreviewCard";

export default function Home() {
  const [mode, setMode] = useState<"pairs" | "tinder">("pairs");
  const [name, setName] = useState("");
  const [touchedName, setTouchedName] = useState(false);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [holiday, setHoliday] = useState("");
  const [result, setResult] = useState<{ pairs: string; tinder: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = name.trim().length > 0;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, hobbies, holiday }),
      });
      const data = await res.json();
      setResult({ pairs: data.pairs, tinder: data.tinder });
    } catch {
      alert("生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="row-start-2 p-4 sm:p-6 max-w-sm sm:max-w-md lg:max-w-lg mx-auto space-y-6">
        {/* タブ */}
        <HeaderTabs active={mode} onChange={setMode} />

        {/* 名前入力 */}
        <InputField
          label="名前"
          placeholder="名前を入力"
          value={name}
          onChange={setName}
          onBlur={() => setTouchedName(true)}
        />
        {touchedName && name.trim().length === 0 && (
          <p className="text-red-500 text-sm">名前を入力してください。</p>
        )}

        {/* 趣味チップ */}
        <div className="flex gap-2">
          {["映画", "スポーツ", "読書"].map((hobby) => (
            <Chip
              key={hobby}
              label={hobby}
              selected={hobbies.includes(hobby)}
              onClick={() =>
                setHobbies((prev) =>
                  prev.includes(hobby)
                    ? prev.filter((h) => h !== hobby)
                    : [...prev, hobby]
                )
              }
            />
          ))}
        </div>

        {/* ドロップダウン */}
        <Select
          label="休日の過ごし方"
          options={["アウトドア", "インドア", "旅行", "読書"]}
          value={holiday}
          onChange={setHoliday}
        />

        {/* プロフィール生成ボタン */}
        <Button onClick={handleGenerate} disabled={!isValid || loading}>
          {loading ? "生成中…" : "プロフィール生成"}
        </Button>

        {/* プレビュー表示 */}
        {result && (
          <div className="space-y-4">
            <PreviewCard mode="pairs" content={result.pairs} />
            <PreviewCard mode="tinder" content={result.tinder} />
          </div>
        )}
      </main>

      <footer className="row-start-3">
        {/* フッター省略 */}
      </footer>
    </div>
  );
}
