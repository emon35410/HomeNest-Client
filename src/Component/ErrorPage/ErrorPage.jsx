import React from 'react';

import ErrorImg from "../../assets/error-404.png"
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <img src={ErrorImg} alt="" />
            <h1 className='text-4xl font-semibold mt-5'>Oops, page not found!</h1>
            <p className='text-[#627382] mt-3'>The page you are looking for is not available</p>

            <button
                onClick={() => navigate(-1)}
                className='inline-block mt-5 px-4 py-2 hover:cursor-pointer rounded-md font-medium hover:bg-blue-600 border-0 bg-[#F9A51A] transition-all duration-300 hover:scale-105 active:scale-95'
            >
                Go Back
            </button>

        </div>
    );
};

export default ErrorPage;