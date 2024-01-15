import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App  from "./App";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

const rootEl = document.querySelector("#root");
if (!rootEl) throw new Error("Cannot find root element with that id");
const root = createRoot(rootEl);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <App />
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>
);
