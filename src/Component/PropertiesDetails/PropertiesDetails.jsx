import React from "react";
import { useLoaderData } from "react-router";
import { FaBed, FaBath, FaRulerCombined, FaEnvelope, FaPhone } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const PropertiesDetails = () => {
    const home = useLoaderData();
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Image Section */}
            <div data-aos="fade-left" className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                    src={home.image}
                    alt={home.property_name}
                    className="w-full h-[550px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-white/90 px-4 py-2 rounded-full shadow-md">
                    <p className="text-gray-800 font-semibold">{home.category}</p>
                </div>
                <div className="absolute bottom-6 right-6 bg-green-600 text-white px-5 py-2 rounded-full shadow-md">
                    <p className="text-lg font-semibold">${home.price.toLocaleString()}</p>
                </div>
            </div>

            {/* Details Section */}
            <div  className="mt-8 grid md:grid-cols-3 gap-8">
               
                <div data-aos="fade-right" className="md:col-span-2 space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">{home.property_name}</h1>
                    <p className="text-gray-500 text-lg">{home.location}</p>

                    <div className="flex flex-wrap gap-6 mt-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaBed className="text-green-600" />
                            <span>{home.bedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaBath className="text-blue-600" />
                            <span>{home.bathrooms} Bathrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaRulerCombined className="text-purple-600" />
                            <span>{home.area_sqft} sqft</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-2xl font-semibold mb-2">About this Property</h2>
                        <p className="text-gray-700 leading-relaxed">{home.short_description}</p>
                    </div>
                </div>

                {/* Right - Seller Info */}
                <div data-aos="fade-left" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seller Information</h2>
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={home.seller_image}
                            alt={home.seller_name}
                            className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-gray-100"
                        />
                        <h3 className="text-lg font-bold mt-3">{home.seller_name}</h3>
                        <div className="mt-2 flex flex-col gap-1 text-gray-600">
                            <p className="flex items-center gap-2 justify-center">
                                <FaEnvelope /> {home.seller_email}
                            </p>
                            <p className="flex items-center gap-2 justify-center">
                                <FaPhone /> {home.seller_contact}
                            </p>
                        </div>
                    </div>

                    <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                        Contact Seller
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesDetails;
