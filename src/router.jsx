import {createBrowserRouter} from "react-router-dom";
import Search from "./components/search/Search.jsx";
import Layout from "./components/layout/Layout.jsx";
import OfferDetails from "./components/offers/OfferDetails.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Search/>
            },
            {
                path: "/offer/:offerId",
                element: <OfferDetails/>
            }
        ]
    },
]);