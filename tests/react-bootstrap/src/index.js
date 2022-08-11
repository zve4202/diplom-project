import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CustomProvider } from "rsuite";
import ruRU from "rsuite/locales/ru_RU";
import "rsuite-table/dist/css/rsuite-table.min.css";

ReactDOM.render(
    <React.StrictMode>
        <CustomProvider locale={ruRU}>
            <App />
        </CustomProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
