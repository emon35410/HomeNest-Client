import React, { Suspense } from 'react';
import Banner from './Banner';
import RecentHomeCard from './RecentHomeCard';
import WhyChooseUs from './WhyChooseUs';
import FeaturedProperties from './FeaturedProperties ';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    
    
    const recentHomePromise = fetch("https://home-nest-server-mauve.vercel.app/recent-homes").then(res => res.json()).then(data => {

        return data;

    }
    )

    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={<div className='flex justify-center items-center'>
                <span className="loading loading-spinner text-error"></span>
            </div>}>
                <RecentHomeCard recentHomePromise={recentHomePromise} data-aos="fade-up"></RecentHomeCard>
            </Suspense>
            <WhyChooseUs data-aos="fade-right"></WhyChooseUs>
            <FeaturedProperties data-aos="fade-left"></FeaturedProperties>

        </div>
    );
};

export default Home;