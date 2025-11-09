import React from 'react';
import { useLoaderData } from 'react-router';

const AllProperties = () => {
    const Homes = useLoaderData()
    console.log(Homes)
    return (
        <div>
            ALl Properties
        </div>
    );
};

export default AllProperties;