import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const AddProperties = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        property_name: '',
        short_description: '',
        category: 'Rent',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area_sqft: '',
        image: '',
        seller_contact: ''
    });

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newHome = {
            _id: uuidv4(),
            ...formData,
            seller_name: user.displayName,
            seller_email: user.email,
            seller_image: user.photoURL || "",
            seller_contact: user.phoneNumber || ""
        };

        fetch("https://home-nest-server-mauve.vercel.app/homes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newHome)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Property added successfully!");
                setFormData({
                    property_name: '',
                    short_description: '',
                    category: 'Rent',
                    price: '',
                    location: '',
                    bedrooms: '',
                    bathrooms: '',
                    area_sqft: '',
                    image: '',
                    seller_contact: ''
                });
            })
            .catch(err => {
                console.error("Error adding property:", err);
                toast.error("Failed to add property");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Add Property
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Property Name</label>
                        <input
                            type="text"
                            name="property_name"
                            value={formData.property_name}
                            onChange={handleChange}
                            placeholder="Enter property name"
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Short Description</label>
                        <textarea
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                            placeholder="Enter property description"
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                            <option value="House">House</option>
                            <option value="Villa">Villa</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Area or Address"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Bedrooms</label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="Number of bedrooms"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Bathrooms</label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="Number of bathrooms"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Area (sqft)</label>
                            <input
                                type="number"
                                name="area_sqft"
                                value={formData.area_sqft}
                                onChange={handleChange}
                                placeholder="Enter area in sqft"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Image Link</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Seller Name</label>
                            <input
                                type="text"
                                value={user.displayName}
                                readOnly
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Seller Email</label>
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 dark:text-gray-300">Seller Contact</label>
                            <input
                                type="text"
                                name="seller_contact"
                                value={formData.seller_contact}
                                onChange={handleChange}
                                placeholder="Enter your contact number"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-2 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                    >
                        Add Property
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperties;
