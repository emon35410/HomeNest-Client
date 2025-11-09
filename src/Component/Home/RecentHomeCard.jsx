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
                {RecentHome.map(Home => (
                    <div
                        key={Home.id}
                        className="w-[350px] h-[520px] rounded-2xl overflow-hidden shadow-xl bg-[#F5E9E0]"
                    >
                        <img
                            src={Home.image}
                            alt="Luxury House"
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-5">
                            {/* Category */}
                            <h1 className='text-center text-[#3D2A23] text-2xl font-semibold my-3'>
                               { Home.property_name}
                            </h1>

                            {/* Location */}
                            <div className="flex justify-center items-center gap-2 text-[#3D2A23] mb-3">
                                <FaLocationDot className="text-[#3D2A23] text-lg" />
                                <span className="text-lg font-semibold">{Home.location}</span>
                            </div>

                            {/* Details */}
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

                            {/* Price */}
                            <p className="text-xl text-center font-semibold text-[#3D2A23] mt-3">
                                Price: <span className="font-bold">${Home.price}</span>
                            </p>
                        </div>
                       <div className='flex justify-center items-center'>
                         <Link className='btn btn-wide btn-dash btn-primary'>View Details</Link>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentHomeCard;
