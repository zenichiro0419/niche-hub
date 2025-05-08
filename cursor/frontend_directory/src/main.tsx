/**
 * アプリエントリポイント
 *
 * @概要
 *   - Redux Providerでストアをラップ
 *   - MUI ThemeProviderの雛形を追加
 *   - 今後ルーティングやテーマ切替を追加しやすい構成
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // 今後、ダーク/ライトやカスタムテーマをここで拡張
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
