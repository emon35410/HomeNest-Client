import React, { use } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAreaChart, MdBedroomChild } from 'react-icons/md';
import { Link } from 'react-router';

const RecentHomeCard = ({ recentHomePromise }) => {
    const RecentHome = use(recentHomePromise);
    console.log(RecentHome);

    return (
        <div className='w-11/12 mx-auto my-7'>
            <h1 className='text-center text-4xl my-10 font-bold'>Our Recent Residence</h1>
            <div className='flex flex-wrap justify-center gap-6'>
                {RecentHome.map((Home, index) => (
                    <div data-aos="fade-up"
                        key={index}
                        className="w-[350px] h-[520px] rounded-2xl overflow-hidden shadow-xl bg-[#F5E9E0]"
                    >
                        <img
                            src={Home.image}
                            alt="Luxury House"
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
                            <Link to={`/homes/${Home._id}`} className='btn btn-wide btn-dash btn-primary'>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='my-5 flex items-center justify-center'>
                <Link to="/allproperties" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl 
    bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 
    text-white border-none shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
                    All Properties
                </Link>
            </div>

        </div>
    );
};

export default RecentHomeCard;
