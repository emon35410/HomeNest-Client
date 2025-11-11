import React, { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAreaChart, MdBedroomChild } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllProperties = () => {
    const Homes = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHomes, setFilteredHomes] = useState(Homes);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    useEffect(() => {
        // Filter Homes based on property_name
        const filtered = Homes.filter((home) =>
            home.property_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHomes(filtered);
    }, [searchTerm, Homes]);

    return (
        <div className='w-11/12 mx-auto my-7'>
            <h1 className='text-center text-4xl my-10 font-bold'>
                Our Recent Residence ({filteredHomes.length})
            </h1>

            {/* Search Input */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by Property Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className='flex flex-wrap justify-center gap-6'>
                {filteredHomes.map(Home => (
                    <div
                        data-aos="fade-up"
                        key={Home._id}
                        className="w-[350px] h-[520px] rounded-2xl overflow-hidden shadow-xl bg-[#F5E9E0]"
                    >
                        <img
                            src={Home.image}
                            alt={Home.property_name}
                            loading="lazy"
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-5">
                            <h1 className='text-center text-[#3D2A23] text-2xl font-semibold my-3'>
                                {Home.property_name}
                            </h1>

                            <div className="flex justify-center items-center gap-2 text-[#3D2A23] mb-3">
                                <FaLocationDot className="text-[#3D2A23] text-lg" />
                                <span className="text-lg font-semibold">{Home.location}</span>
                            </div>

                            <div className='flex gap-8 items-center justify-center text-[#3D2A23] mb-3'>
                                <div className="flex items-center gap-2">
                                    <MdBedroomChild className="text-xl" />
                                    <span>{Home.bedrooms} Rooms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdAreaChart className="text-xl" />
                                    <span>{Home.area_sqft} ft²</span>
                                </div>
                            </div>

                            <p className="text-xl text-center font-semibold text-[#3D2A23] mt-3">
                                Price: <span className="font-bold">${Home.price}</span>
                            </p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={`/homes/${Home._id}`} className='btn btn-wide btn-dash btn-primary'>
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
