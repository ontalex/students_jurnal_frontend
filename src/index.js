import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();

root.render(
    <React.Fragment>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.Fragment>
);
