import React, { useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { Commet } from 'react-loading-indicators';
import DarkModeToggle from '../Theme/DarkMoodToggle';

const Navbar = () => {
    const { user, logOut, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                setLoading(false);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout error:", error);
                setLoading(false);
            });
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allproperties">All Properties</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/addproperties">Add Properties</NavLink></li>
                    <li><NavLink to="/myproperties">My Properties</NavLink></li>
                    <li><NavLink to="/myratings">My Ratings</NavLink></li>
                </>
            )}
        </>
    );

    if (loading) {
        return (
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-center">
                    <Commet color="#32cd32" size="medium" text="Homenest" textColor="" />
                </div>
            </div>
        );
    }

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
            <div className="navbar">
                {/* Left Section: Hamburger + Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden min-h-[44px] min-w-[44px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a href="/" className="btn btn-ghost text-xl text-blue-600 px-2 sm:px-4">
                        HomeNest
                    </a>
                </div>

                {/* Center Section: Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                {/* Right Section: Dark Mode + Auth Buttons */}
                <div className="navbar-end gap-1 sm:gap-2">
                    {/* Dark Mode Toggle */}
                    <div className="flex-shrink-0">
                        <DarkModeToggle />
                    </div>

                    {/* Auth Section */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="avatar min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                                    <img
                                        className="rounded-full hover:cursor-pointer object-cover"
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt={user.displayName || "User"}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
                            >
                                <li className="menu-title">
                                    <span className="font-semibold">{user.displayName}</span>
                                </li>
                                <li className="menu-title">
                                    <span className="text-sm text-gray-500">{user.email}</span>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={handleLogOut}
                                        className="btn btn-outline btn-primary btn-sm mt-2"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-1 sm:gap-2">
                            <Link
                                to="/login"
                                className="btn btn-outline btn-primary btn-sm sm:btn-md min-h-[44px]"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn btn-neutral btn-sm sm:btn-md min-h-[44px] hidden sm:inline-flex"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;