import React from 'react';

const Banner = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="carousel relative w-full rounded-lg overflow-hidden shadow-lg">
                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                    
                        src="https://i.ibb.co/KxtP0spQ/darya-tryfanava-9lx-Nf-Vb-Z6-BE-unsplash.jpg"
                        alt="Slide 1"
                        className="w-full object-cover h-96 sm:h-[500px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide4" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/JwjLKGKn/thomas-habr-6-Nmnr-AJPq7-M-unsplash.jpg"
                        alt="Slide 2"
                        className="w-full object-cover h-96 sm:h-[500px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide1" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/CpLS7s7N/nilanka-kariyawasam-Gmr-Ol-Gwyq-WQ-unsplash.jpg"
                        alt="Slide 3"
                        className="w-full object-cover h-96 sm:h-[500px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide2" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❮
                        </a>
                        <a href="#slide4" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 4 */}
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co/Zz0X7cLX/ricardo-resende-KDh-Ie2-W3-C-Y-unsplash.jpg"
                        alt="Slide 4"
                        className="w-full object-cover h-96 sm:h-[500px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide3" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle bg-white/80 text-black hover:bg-white">
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;