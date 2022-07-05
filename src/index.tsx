import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
