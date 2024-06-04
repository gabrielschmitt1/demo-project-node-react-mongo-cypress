import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import About from "./routes/about";
import Settings from "./routes/settings";
import Config from "./routes/config";
import Users from "./routes/users";
import Faq from "./routes/faq";

const router = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "config",
                element: <Config />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "faq",
                element: <Faq />,
            },

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);