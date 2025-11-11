import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { NavLink } from 'react-router';
import "./Navbar.css"
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {

    const { user, logOut, setLoading } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                setLoading(false);
                navigate("/login")
            })
            .catch((error) => {
                console.error("Logout error:", error);
                setLoading(false);
            });
    }
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allproperties">All Properties</NavLink></li>
        {
            user && <>
                <li><NavLink to="/addproperties">Add Properties</NavLink></li>
                <li><NavLink to="/myproperties">My Properties</NavLink></li>
                <li><NavLink to="/myratings">My Ratings</NavLink></li>
            </>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">HomeNest</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? (
                            <div className="dropdown dropdown-end  ">
                                <div tabIndex={0} role="button" className="w-12 h-12">
                                    <img
                                        className="rounded-full hover:cursor-pointer w-full h-full object-cover"
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt={user.displayName || "User"}
                                    />
                                </div>


                                <ul
                                    tabIndex="-1"
                                    className="menu dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
                                >
                                    <li><h1 className="font-semibold">{user.displayName}</h1></li>
                                    <li><h1 className="text-sm text-gray-500">{user.email}</h1></li>
                                    <li>
                                        <Link to="/login" onClick={handleLogOut} className="btn btn-outline btn-primary mt-2">
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        ) : (
                            <>
                                <Link to="/login" className='mr-3 btn btn-outline btn-primary'>Login</Link>
                                <Link to="/signup" className='btn btn-neutral'>Sign Up</Link>
                            </>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;