import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from './Root';
import Home from '../Component/Home/Home';
import AllProperties from '../Component/AllProperties/AllProperties';
import AddProperties from '../Component/AddProperties/AddProperties';
import MyProperties from '../Component/MyProperties/MyProperties';
import MyRatings from '../Component/MyRatings/MyRatings';
import PropertiesDetails from '../Component/PropertiesDetails/PropertiesDetails';




const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "allproperties",
                loader: async () => {
                    const res = await fetch("http://localhost:3000/homes");
                    return res.json();
                },

                Component: AllProperties
            },
            {
                path: "addproperties",
                element: <AddProperties></AddProperties>
            },
            {
                path: "myproperties",
                element: <MyProperties></MyProperties>
            },
            {
                path: "myratings",
                element: <MyRatings></MyRatings>
            },
            {
                path:"homes/:id",
                loader: ({params})=>fetch(`http://localhost:3000/homes/${params.id}`),
                element:<PropertiesDetails></PropertiesDetails>
            }
        ]
    },

]);

export default router;