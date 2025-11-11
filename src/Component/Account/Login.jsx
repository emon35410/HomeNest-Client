import React, { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { signInGoogle, signInUser } = useContext(AuthContext);
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        signInUser(email, password)
            .then(result => {
                console.log("User logged in:", result.user);
                toast.success("Login successful!");
                navigate("/");
            })
            .catch(error => {
                console.error("Login error:", error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        if (googleLoading) return;
        setGoogleLoading(true);

        signInGoogle()
            .then(result => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                };

                return fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser)
                });
            })
            .then(res => res.json())
            .then(data => {
                console.log("After saving user data:", data);
                toast.success("Successfully logged in");
                navigate("/");
            })
            .catch(error => {
                if (error.code === "auth/cancelled-popup-request") {
                    console.warn("Popup cancelled.");
                    toast.info("Google login cancelled. Try again!");
                } else if (error.code === "auth/popup-closed-by-user") {
                    toast.info("You closed the popup. Please try again.");
                } else {
                    console.error("Google Sign In error:", error);
                    toast.error(error.message || "Something went wrong");
                }
            })
            .finally(() => setGoogleLoading(false)); 
    };

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 px-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-500">
                    <div className="p-8" data-aos="fade-left">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                            Welcome Back
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Your Email"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Your Password"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <button
                                className="text-sm sm:text-base hover:cursor-pointer text-blue-600 dark:text-blue-400 hover:underline transition-colors mt-2"
                            >
                                Forget Password?
                            </button>

                            <button
                                type="submit"
                                className="w-full hover:cursor-pointer py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
                            Don't have an account?{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                                <Link to="/signup">Sign Up</Link>
                            </span>
                        </p>

                        <div className="mt-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Or login with</p>
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                className={`flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium shadow-sm transition ${googleLoading
                                        ? "opacity-60 cursor-not-allowed"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-600"
                                    }`}
                            >
                                {googleLoading ? (
                                    <span>Signing in...</span>
                                ) : (
                                    <>
                                        <svg
                                            aria-label="Google logo"
                                            width="20"
                                            height="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <g>
                                                <path d="M0 0H512V512H0" fill="#fff"></path>
                                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                            </g>
                                        </svg>
                                        Login with Google
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
