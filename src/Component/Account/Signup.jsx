import React, { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';


const Signup = () => {
    const { signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInGoogle();
            const newUser = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            };

            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            const data = await res.json();
            console.log("After saving user data:", data);

            if (data.success) {
                navigate("/"); // user created
            } else {
                alert(data.message); // "Already Have an Account"
                navigate("/"); // optional: navigate even if user exists
            }

        } catch (error) {
            console.error("Error saving user:", error);
        }
    };


    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 px-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-500">
                    <div className="p-8" data-aos="fade-right">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                            Create an Account
                        </h2>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Full Name"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Your Password"
                                    className="w-full mt-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full hover:cursor-pointer py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
                            Already have an account?{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                                <Link to="/login">Login</Link>
                            </span>
                        </p>

                        <div className="mt-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Or sign up with</p>
                            <button onClick={handleGoogleSignIn} className="flex hover:cursor-pointer items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm">
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
                                Sign Up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
