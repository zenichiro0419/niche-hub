/**
 * @file main.tsx
 * @brief アプリケーションのエントリポイント
 * @description AppコンポーネントをStrictModeとRedux Providerでラップし、#rootにマウントする。
 */
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
