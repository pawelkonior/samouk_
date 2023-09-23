import {createBrowserRouter} from "react-router-dom";
import Search from "./components/search/Search.jsx";
import Layout from "./layout/Layout.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Search />
            }
        ]
    },
]);