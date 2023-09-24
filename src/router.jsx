import {createBrowserRouter} from "react-router-dom";
import Search from "./components/search/Search.jsx";
import Layout from "./components/layout/Layout.jsx";
import OfferDetails from "./components/offers/OfferDetails.jsx";
import AddOffer from "./components/offers/AddOffer.jsx";
import Register from "./components/users/Register.jsx";

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
            },
            {
                path: "/add-offer",
                element: <AddOffer/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    },
]);