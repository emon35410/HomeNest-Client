import React, { useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { FaBed, FaBath, FaRulerCombined, FaEnvelope, FaPhone } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const PropertiesDetails = () => {
  const home = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isBought, setIsBought] = useState(false);
  const [reviews, setReviews] = useState([]);


  const loadReviews = () => {
    fetch(`https://home-nest-server-mauve.vercel.app/reviews/property/${home._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error loading reviews:", err));
  };

  useEffect(() => {
    const bought = localStorage.getItem(`bought_${home._id}`);
    if (bought === "true") setIsBought(true);
  }, [home._id]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    loadReviews();
  }, [home._id]);


  const handleBuyProperty = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to buy this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, buy it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const myProperty = {
          property_name: home.property_name,
          price: home.price,
          location: home.location,
          image: home.image,
          category: home.category,
          buyer_name: user?.displayName || "Anonymous",
          buyer_email: user?.email || "unknown",
          date: new Date().toISOString(),
        };
        fetch("https://home-nest-server-mauve.vercel.app/myproperties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(myProperty),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setIsBought(true);
              localStorage.setItem(`bought_${home._id}`, "true");
              Swal.fire("Success!", "Property added to your properties.", "success");
            }
          })
          .catch(() => Swal.fire("Error!", "Failed to add property.", "error"));
      }
    });
  };


  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      property_id: home._id,
      property_name: home.property_name,
      property_image: home.image,
      reviewer_name: user?.displayName || "Anonymous",
      reviewer_email: user?.email || "unknown",
      rating: parseInt(e.target.rating.value),
      review_text: e.target.review.value,
      date: new Date().toISOString(),
    };
    fetch("https://home-nest-server-mauve.vercel.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Review Added!", "Thank you for your feedback.", "success");
          e.target.reset();
          loadReviews();
        }
      })
      .catch(() => Swal.fire("Error!", "Failed to submit review.", "error"));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

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

      <div className="mt-8 grid md:grid-cols-3 gap-8">

        <div data-aos="fade-right" className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">{home.property_name}</h1>
          <p className="text-lg">{home.location}</p>

          <div className="flex flex-wrap gap-6 mt-4">
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
            <p className="text-gray-500 leading-relaxed">{home.short_description}</p>
          </div>

          <button
            onClick={handleBuyProperty}
            disabled={isBought}
            className={`btn btn-wide text-white border-none shadow-lg transition duration-300 ${
              isBought
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl"
            }`}
          >
            {isBought ? "The Property is Yours ✅" : "Buy This Property"}
          </button>
        </div>

 
        <div data-aos="fade-left" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seller Information</h2>
          <div className="flex flex-col items-center text-center">
            <img
              src={home.seller_image}
              alt={home.seller_name}
              className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-gray-100"
            />
            <h3 className="text-lg text-gray-800 font-bold mt-3">{home.seller_name}</h3>
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

      <div className="mt-12 border-t pt-8">
        <h2 className="text-3xl font-semibold mb-6">Ratings & Reviews</h2>

        <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl shadow-md space-y-4">
          <div>
            <label className="font-medium text-gray-700">Your Rating:</label>
            <select name="rating" className="select select-bordered w-full mt-2" required>
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Your Review:</label>
            <textarea
              name="review"
              className="textarea textarea-bordered w-full mt-2"
              placeholder="Write a short review..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700 w-full">
            Submit Review
          </button>
        </form>

        <div className="mt-8">
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-sm p-4 mb-4 flex gap-4"
                data-aos="fade-up"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-800">{r.reviewer_name}</h4>
                    <p className="text-yellow-500">
                      {"⭐".repeat(r.rating)} <span className="text-gray-400">{r.rating}/5</span>
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">{r.review_text}</p>
                  <p className="text-sm text-gray-400 mt-1">{new Date(r.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesDetails;
