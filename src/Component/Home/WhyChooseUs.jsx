import React from 'react';
import { FaHandshake, FaHome, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';

const WhyChooseUs = () => {
    return (
        <section data-aos="fade-right" className=" py-16 px-6 md:px-12 lg:px-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-600  mb-4">Why Choose <span className="text-blue-600">HomeNest</span>?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We provide trusted real estate solutions that help you find your dream home — with transparency, care, and expertise you can rely on.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
                    <FaHandshake className="text-blue-600 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl text-gray-600  font-semibold mb-2">Trusted Partnerships</h3>
                    <p className="text-gray-600 text-sm">
                        We work with verified agents and property owners to ensure authenticity in every deal.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
                    <FaHome className="text-green-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl text-gray-600  font-semibold mb-2">Wide Property Range</h3>
                    <p className="text-gray-600 text-sm">
                        Explore a variety of homes, villas, apartments, and lands to suit every lifestyle and budget.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
                    <FaShieldAlt className="text-yellow-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl text-gray-600  font-semibold mb-2">Secure Transactions</h3>
                    <p className="text-gray-600 text-sm">
                        Your privacy and safety are our top priorities with transparent and secure payment processes.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
                    <FaMoneyBillWave className="text-purple-600 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl text-gray-600  font-semibold mb-2">Best Market Prices</h3>
                    <p className="text-gray-600 text-sm">
                        Get competitive deals and expert advice to make your investment worth every penny.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
