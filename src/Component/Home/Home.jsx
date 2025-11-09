import React from 'react';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="w-[350px] h-[400px] rounded-2xl overflow-hidden shadow-xl bg-[#F5E9E0]">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                    alt="Luxury House"
                    className="w-full h-64 object-cover"
                />
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#3D2A23] mb-2">
                        Palo Alto, California
                    </h3>
                    <div className='flex gap-10'>
                        <h1 className='text-[#3D2A23]'>4 Rooms</h1>
                        <h1 className='text-[#3D2A23]'>10000 fit</h1>
                    </div>
                    <p className="text-xl font-semibold text-[#3D2A23] mt-3">
                       price: <span>$3,700,000</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;