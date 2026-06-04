"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
<div className="flex gap-3 text-sm font-medium">
<div className="flex gap-3 text-sm">
  <button
    onClick={() => setLanguage("fr")}
    className={language === "fr"
      ? "font-bold text-green-700"
      : "text-slate-400"}
  >
    FR
  </button>

  <button
    onClick={() => setLanguage("en")}
    className={language === "en"
      ? "font-bold text-green-700"
      : "text-slate-400"}
  >
    EN
  </button>

  <button
    onClick={() => setLanguage("es")}
    className={language === "es"
      ? "font-bold text-green-700"
      : "text-slate-400"}
  >
    ES
  </button>
</div>
</div>)}