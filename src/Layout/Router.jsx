import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from './Root';
import Home from '../Component/Home/Home';
import AllProperties from '../Component/AllProperties/AllProperties';
import AddProperties from '../Component/AddProperties/AddProperties';
import MyProperties from '../Component/MyProperties/MyProperties';
import MyRatings from '../Component/MyRatings/MyRatings';
import PropertiesDetails from '../Component/PropertiesDetails/PropertiesDetails';
import Login from '../Component/Account/Login';
import ErrorPage from '../Component/ErrorPage/ErrorPage';
import Signup from '../Component/Account/Signup';
import PrivateRoute from '../Component/PrivateRoute/PrivateRoute';
import MyPropertyDeailts from '../Component/MyProperties/MyPropertyDeailts';




const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "allproperties",
                loader: async () => {
                    const res = await fetch("https://home-nest-server-mauve.vercel.app/homes");
                    return res.json();
                },

                Component: AllProperties
            },
            {
                path: "addproperties",
                element: <PrivateRoute>
                    <AddProperties></AddProperties>
                </PrivateRoute>
            },
            {
                path: "myproperties",
                element: <PrivateRoute>
                    <MyProperties></MyProperties>
                </PrivateRoute>
            },
            {
                path: "myratings",
                element: <PrivateRoute>
                    <MyRatings></MyRatings>
                </PrivateRoute>
            },
            {
                path: "homes/:id",
                loader: ({ params }) => fetch(`https://home-nest-server-mauve.vercel.app/homes/${params.id}`),
                element: <PrivateRoute>
                    <PropertiesDetails></PropertiesDetails>
                </PrivateRoute>
            },
            {
                path: "/myproperties/:id",
                element: <PrivateRoute>
                    <MyPropertyDeailts></MyPropertyDeailts>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://home-nest-server-mauve.vercel.app/myproperties/${params.id}`),
            }

        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/signup",
        Component: Signup
    }

]);

export default router;