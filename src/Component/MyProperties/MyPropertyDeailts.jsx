import Aos from "aos";
import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

const MyPropertyDeailts = () => {
  const property = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🏠 Property Details</h1>

      <div className="shadow-md rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Property Info */}
        <div
          data-aos="fade-left"
          className="flex-1 space-y-3 md:space-y-4"
        >
          <h2 className="text-xl md:text-2xl text-gray-700 font-semibold">{property.property_name}</h2>
          <p className="text-gray-600 text-sm md:text-base">Category: {property.category}</p>
          <p className="text-gray-600 text-sm md:text-base">Price: ${property.price.toLocaleString()}</p>
          <p className="text-gray-600 text-sm md:text-base">Location: {property.location}</p>
          <p className="text-gray-600 text-sm md:text-base">Description: {property.description}</p>
          <p className="text-gray-600 text-sm md:text-base">Posted Date: {new Date(property.date).toLocaleDateString()}</p>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white mt-4 w-full md:w-auto"
          >
            ← Back
          </button>
        </div>

        {/* Right: Property Image */}
        <div data-aos="fade-right" className="flex-1 w-full h-64 md:h-auto">
          <img
            src={property.image}
            alt={property.property_name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPropertyDeailts;
