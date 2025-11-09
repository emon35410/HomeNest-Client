import React, { Suspense } from 'react';
import Banner from './Banner';
import RecentHomeCard from './RecentHomeCard';


const Home = () => {
    const recentHomePromise = fetch("http://localhost:3000/recent-homes").then(res=>res.json()).then(data=>{
     
        return data;
       
    }
    )
   
    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={<div className='flex justify-center items-center'>
                <span className="loading loading-spinner text-error"></span>
                </div>}>
                <RecentHomeCard recentHomePromise={recentHomePromise}></RecentHomeCard>
            </Suspense>
            
        </div>
    );
};

export default Home;