import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Atom } from "react-loading-indicators";
import { Link } from "react-router";

const MyProperties = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [updateData, setUpdateData] = useState({
        property_name: "",
        category: "",
        price: "",
        location: "",
        description: "",
    });

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/myproperties?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setProperties(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This property will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/myproperties/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Property has been removed.", "success");
                            setProperties(properties.filter((item) => item._id !== id));
                        }
                    });
            }
        });
    };

    const openUpdateModal = (property) => {
        setCurrentProperty(property);
        setUpdateData({
            property_name: property.property_name,
            category: property.category,
            price: property.price,
            location: property.location,
            description: property.description,
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/myproperties/${currentProperty._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire("Updated!", "Property has been updated.", "success");
                setProperties(
                    properties.map((p) =>
                        p._id === currentProperty._id ? { ...p, ...updateData } : p
                    )
                );
                setShowModal(false);
            });
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Atom color="#32cd32" size="medium" text="" textColor="" />
            </div>
        );

    if (properties.length === 0) {
        return (
            <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold text-gray-600">No properties found.</h2>
                <p className="text-gray-400">You haven’t bought or added any property yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">🏡 My Properties</h1>


            <div className="overflow-x-auto shadow-md rounded-xl">
                <table className="table-auto w-full min-w-[600px]">
                    <thead className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white">
                        <tr>
                            <th className="px-2 py-2">#</th>
                            <th className="px-2 py-2">Property Name</th>
                            <th className="px-2 py-2">Category</th>
                            <th className="px-2 py-2">Price</th>
                            <th className="px-2 py-2">Location</th>
                            <th className="px-2 py-2">Posted Date</th>
                            <th className="px-2 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((item, index) => (
                            <tr key={item._id} className="hover:bg-blue-400">
                                <td className="px-2 py-2">{index + 1}</td>
                                <td className="px-2 py-2 font-semibold">{item.property_name}</td>
                                <td className="px-2 py-2">{item.category}</td>
                                <td className="px-2 py-2">${item.price.toLocaleString()}</td>
                                <td className="px-2 py-2">{item.location}</td>
                                <td className="px-2 py-2">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="px-2 py-2 flex flex-col md:flex-row justify-center gap-2">
                                    <Link
                                        to={`/myproperties/${item._id}`}
                                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 w-full md:w-auto"
                                    >
                                        <FaEye /> View
                                    </Link>

                                    <button
                                        onClick={() => openUpdateModal(item)}
                                        className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1 w-full md:w-auto"
                                    >
                                        <FaEdit /> Update
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 w-full md:w-auto"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-semibold mb-4">Update Property</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                type="text"
                                name="property_name"
                                value={updateData.property_name}
                                onChange={handleChange}
                                placeholder="Property Name"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                value={updateData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={updateData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                value={updateData.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="input input-bordered w-full"
                                required
                            />
                            <textarea
                                name="description"
                                value={updateData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                                required
                            />

                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProperties;
