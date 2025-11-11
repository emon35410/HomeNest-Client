
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const AddProperties = () => {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Rent',
        price: '',
        location: '',
        image: ''
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

        const propertyData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName
        };

        fetch("http://localhost:3000/properties", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(propertyData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Property added successfully!");
                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    category: 'Rent',
                    price: '',
                    location: '',
                    image: ''
                });
            })
            .catch(err => {
                console.error("Error adding property:", err);
                toast.error("Failed to add property");
            });
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                        Add Property
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Property Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter property name"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
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

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">User Name</label>
                            <input
                                type="text"
                                value={user.displayName}
                                readOnly
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">User Email</label>
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                        >
                            Add Property
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProperties;
