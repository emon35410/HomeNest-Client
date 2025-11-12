import React from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaStar } from "react-icons/fa";
import moment from "moment";

const MyRatings = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/reviews?reviewer_email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setReviews(data)
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    if (!user) {
        return <p>Please log in to see your reviews.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

            {reviews.length === 0 ? (
                <p>You have not submitted any reviews yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
                        >

                            <img
                                src={review.property_image}
                                alt={review.property_name}
                                className="w-full h-40 object-cover rounded-xl mb-3"
                            />

                            <h2 className="text-lg text-gray-600 font-semibold">{review.property_name}</h2>
                            <p className="text-gray-600 text-sm">Reviewed by: {review.reviewer_name}</p>

                            <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-gray-700">{review.review_text}</p>

                            <p className="mt-2 text-gray-400 text-xs">
                                {moment(review.date).format("MMMM Do YYYY, h:mm a")}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default MyRatings;