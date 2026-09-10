import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "next-themes";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./i18n/useLanguage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
