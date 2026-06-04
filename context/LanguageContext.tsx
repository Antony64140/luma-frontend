"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import fr from "@/locales/fr";
import en from "@/locales/en";
import es from "@/locales/es";

type Language = "fr" | "en" | "es";

const translations = {fr,en,es,};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof fr;}

const LanguageContext =
  createContext<LanguageContextType | null>(null);
export function LanguageProvider({
  children,}: {
  children: React.ReactNode;}) {
  const [language, setLanguage] =
    useState<Language>("fr");
  useEffect(() => {
    const saved =
      localStorage.getItem("language") as Language;
    if (saved) {
      setLanguage(saved);
    }}, []);
  useEffect(() => {
    localStorage.setItem(
      "language",
      language);}, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],}}>
      {children}
    </LanguageContext.Provider>);}

export function useLanguage() {
  const context =
    useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider");}
  return context;
}