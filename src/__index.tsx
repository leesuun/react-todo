import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { DarkMode } from "./__theme";

import App from "./__App";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
    <RecoilRoot>
        <ThemeProvider theme={DarkMode}>
            <App />
        </ThemeProvider>
    </RecoilRoot>
);
