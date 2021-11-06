import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-secondary-dark py-6">
            <div className="container mx-auto px-4">
                <NavLink to="/home"><h3 className="text-3xl font-bold text-center text-white"><span className="text-primary">Traventures</span></h3></NavLink>
                <div className="flex justify-center my-10">
                    <NavLink to="/home" className="text-white mx-4">Home</NavLink>
                </div>
                <hr className="border-1 border-gray-700"/>
                <p className="text-center text-white mt-3">&copy; Copyright 2021</p>
            </div>
        </div>
    );
};

export default Footer;