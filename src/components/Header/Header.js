import { getAuth } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logOut } = useAuth()
  return (
    <nav className="bgwhite">


      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2">
        <div className="relative flex items-center justify-between h-16">

          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/home"><h3 className="text-2xl lg:text-3xl font-bold"><span className="text-primary">Traventures</span></h3></NavLink>
            </div>
            <div className="hidden lg:block flex items-center mx-auto">
              <NavLink className="mx-2 font-medium hover:bg-gray-100 px-5 py-2 rounded-md" to="/home" activeClassName="bg-gray-100">Home</NavLink>
              {
                user.email && <>
                  <NavLink className="mx-2 font-medium hover:bg-gray-100 px-5 py-2 rounded-md" to="/addNewSpot" activeClassName="text-primary bg-gray-100">Add New Spot</NavLink>
                  <NavLink className="mx-2 font-medium hover:bg-gray-100 px-5 py-2 rounded-md" to="/myOrders" activeClassName="text-primary bg-gray-100">My Orders</NavLink>
                  <NavLink className="mx-2 font-medium hover:bg-gray-100 px-5 py-2 rounded-md" to="/manageAllOrders" activeClassName="text-primary bg-gray-100">Manage All Orders</NavLink>
                </>
              }
            </div>
          </div>

          {
            user.email && <div className="flex items-center">
              <img width="30px" height="30px" className="rounded-full	mr-2 border-primary border-2" src={user.photoURL || 'https://i.ibb.co/FVdSWWM/download.jpg'} alt="" />
              <p>{user.displayName ? user.displayName : "Unknown" }</p>

            </div>
          }

          <div className="flex items-center pr-2">
            {
              user.email ? <button onClick={logOut} className="border border-1 border-primary text-primary hover:bg-gray-100 transition-all px-6 py-2 rounded-full ml-2">Log out</button> :
                <div>
                  <NavLink to="/login" className="border border-1 border-primary text-primary hover:bg-gray-100 transition-all px-6 py-2 rounded-full ml-2">Login</NavLink>
                  <NavLink to="/register" className="bg-primary hover:bg-primary-dark transition-all text-white px-6 py-2 rounded-full ml-2">Register</NavLink>
                </div>
            }



          </div>

        </div>

      </div>

      <div className="lg:hidden grid grid-cols-3 bg-secondary mb-1">
        <NavLink className="text-white  text-center w-full  font-medium hover:bg-primary  px-5 py-2  " to="/home" activeClassName="bg-primary ">Home</NavLink>
        <NavLink className="text-white  text-center w-full  font-medium hover:bg-primary  px-5 py-2  " to="/myOrders" activeClassName="bg-primary ">My Orders</NavLink>
        <NavLink className="text-white  text-center w-full  font-medium hover:bg-primary  px-5 py-2  " to="/manageAllOrders" activeClassName="bg-primary ">Manage All Orders</NavLink>
      </div>
    </nav>
  );
};

export default Header;