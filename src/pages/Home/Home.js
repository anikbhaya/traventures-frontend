import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useSpots from '../../hooks/useSpots';
import './Home.css'

const Home = () => {
    
    const { spots } = useSpots([])
    return (
        <div>
            <div id="banner" className=" bg-red-50 flex items-center text-center justify-center text-white">
                <div className="container mx-auto p-4 w-1/2">
                    <h4 className="uppercase text-primary">Start Your Adventure.</h4>
                    <h1 className="text-5xl my-5 font-bold">Let's Explore The World!</h1>
                    <p>Why do you go away? So that you can come back. So that you can see the place you came from with new eyes and extra colors. And the people there see you differently, too. Coming back to where you started is not the same as never leaving.</p>
                    <NavLink to="/home" className="border border-primary py-3 px-7 rounded-full inline-block mt-8 hover:bg-primary hover:text-black">Book Now</NavLink>
                </div>

            </div>

            <div id="tourismSpots" className="my-8">
                <div className="container mx-auto p-4">
                <h2 className="text-center font-bold w-2/3 text-3xl mx-auto  my-10 ">
                        Our <span className="text-primary">Exclusive</span> Tour Plans
                    </h2>
                    {
                        spots.length > 0 ? <div className="grid grid-cols-3 gap-20">
                        {
                            spots.map(spot =>
                                <div key={spot._id} className="border border-gray-300">
                                    <div className="flex justify-between bg-primary py-2 px-3 text-white">
                                        <p><i className="fas fa-clock"></i> {spot.duration}</p>
                                        <p><i className="fas fa-map-marked-alt"></i> {spot.location}</p>
                                    </div>
                                    <img src={spot.img} className="w-full" alt="" />
                                    <div className="p-4">
                                        <i className="fas fa-star text-primary"></i> {spot.rating}
                                        <h3 className="text-2xl font-bold">{spot.planName}</h3>
                                        <p><span className="text-red-500 font-bold text-xl">${spot.price}</span>/Per Person</p>
                                        <p>{spot.description.slice(0, 140)} ...</p>
                                        <div className="flex justify-center">
                                            <NavLink to={`/spot/${spot._id}`} className="border border-primary py-3 px-7 rounded-full inline-block mt-8 hover:bg-primary hover:text-black">Book Now</NavLink>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div> : <div class="flex justify-center items-center my-40">
                <div
                    class="
                animate-spin
                rounded-full
                h-32
                w-32
                border-t-2 border-b-2 border-purple-500
              "
                ></div>
            </div>
                    }
                </div>
            </div>
            
            <div id="award">
                <div className="bg-secondary pb-40">
                <div className="container mx-auto p-4">
                <h2 className="text-center font-bold w-2/3 text-3xl mx-auto text-white mt-10 ">
                        Award Winning and Top Rated Tour Operator
                    </h2>
                    <p className="my-3 text-center text-primary uppercase">call our agents for book.</p>
                </div>
                </div>
                <div className="container mx-auto p-4">
                    
                    <div className="grid grid-cols-4 gap-6 relative bottom-32">
                        <div className="flex justify-center flex-col items-center bg-gray-100 h-72 shadow-lg">
                        <i className="fas fa-user-nurse text-7xl text-primary"></i>
                        <p className="text-xl mt-2">8000+ Our Local Guides</p>
                        </div>
                        <div className="flex justify-center flex-col items-center bg-gray-100 h-72 shadow-lg">
                        <i className="fas fa-user-shield text-7xl text-primary"></i>
                        <p className="text-xl mt-2">100% Trusted Tour Agency</p>
                        </div>
                        <div className="flex justify-center flex-col items-center bg-gray-100 h-72 shadow-lg">
                        <i className="fas fa-user-clock text-7xl text-primary"></i>
                        <p className="text-xl mt-2">28+ Years of Trave Experience</p>
                        </div>
                        <div className="flex justify-center flex-col items-center bg-gray-100 h-72 shadow-lg">
                        <i className="far fa-laugh-beam text-7xl text-primary"></i>
                        <p className="text-xl mt-2">98% Our Travelers are Happy</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div id="review" className="grid grid-cols-2">
                <div className="w-full">
                    <img className="w-full" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hiking-quotes-1586278882.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*" alt="" />
                </div>
                <div className=" bg-gray-100 h-full flex flex-col items-center justify-center p-12">
                    <h3 className="text-3xl uppercase font-medium text-center">Our Top Review</h3>
                    <p className="text-center mt-5"> I have been using this tool since 2015 and have already plnned four trips with triphobo. I love your website. Really helpful tool for travel planning.  I especially enjoyed that we could add multiple destinations as well as activities in the days.. Thumbs up!!!</p>
                    <p className="mb-5">- Andria</p>
                    <div>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;