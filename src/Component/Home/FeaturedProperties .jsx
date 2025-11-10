import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdBedroomParent, MdBathroom } from 'react-icons/md';

const FeaturedProperties = () => {
    const insights = [
        {
            title: "Rising Property Values",
            description: "Properties in Sylhet and Dhaka have appreciated 15% in the last year.",
            icon: "📈",
        },
        {
            title: "Best Investment Areas",
            description: "Our experts highlight top neighborhoods for high ROI and rental demand.",
            icon: "🏘️",
        },
        {
            title: "Smart Buying Tips",
            description: "Learn how to negotiate prices, check property documentation, and avoid common mistakes.",
            icon: "💡",
        },
    ];

    return (
        <section data-aos="fade-left" className=" py-16 px-6 md:px-12 lg:px-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-600 mb-4">📊 Market Insights</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Stay informed about the real estate market to make smart investment decisions.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {insights.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl text-gray-600 font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default FeaturedProperties;
