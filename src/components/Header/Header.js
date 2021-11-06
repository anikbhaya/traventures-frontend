import { getAuth } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logOut } = useAuth()
  const [toggleMenu, setToggleMenu] = useState(false)

  const handleToggleMenu = () => {
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true)
    console.log(toggleMenu)
  }



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
                  <NavLink className="mx-2 font-medium hover:bg-gray-100 px-5 py-2 rounded-md" to="/myOrders" activeClassName="text-primary bg-gray-100">My Orders</NavLink>
                </>
              }
            </div>
          </div>

          {
            user.email && <div className="flex items-center">
              <img width="30px" height="30px" className="rounded-full	mr-2 border-primary border-2" src={user.photoURL || 'https://i.ibb.co/FVdSWWM/download.jpg'} alt="" />
              <p>{user.displayName ? user.displayName : "Unknown"}</p>

            </div>
          }

          <div className="flex items-center pr-2">
            {
              user.email ? <div className="flex">
                <button onClick={logOut} className="border border-1 border-primary text-primary hover:bg-gray-100 transition-all px-6 py-2 rounded-full ml-2">Log out</button>
                <div className="relative hidden lg:inline-block">
                  <button onClick={handleToggleMenu} to="/login" className="bg-red-500 text-white hover:bg-red-600 rounded transition-all px-6 py-2  ml-2">  ADMIN PANEL <i className="fas fa-chevron-down"></i></button>
                  <div className={`flex bg-red-400 flex-col absolute w-52 shadow-lg left-5 rounded z-20 ${!toggleMenu && 'hidden'}`}>

                    <NavLink onClick={handleToggleMenu} className="text-white font-medium hover:bg-red-600 px-5 py-2 w-full" activeClassName="bg-red-600" to="/addNewSpot" >Add New Spot</NavLink>
                    <hr />
                    <NavLink onClick={handleToggleMenu} className="text-white font-medium hover:bg-red-600 px-5 py-2 w-full" activeClassName="bg-red-600" to="/manageAllOrders">Manage All Orders</NavLink>
                  </div>
                </div>





              </div>
                :
                <div>
                  <NavLink to="/login" className="border border-1 border-primary text-primary hover:bg-gray-100 transition-all px-6 py-2 rounded-full ml-2">Login</NavLink>
                  <NavLink to="/register" className="bg-primary hover:bg-primary-dark transition-all text-white px-6 py-2 rounded-full ml-2">Register</NavLink>
                </div>
            }



          </div>

        </div>

      </div >

      {
        user.email && <div className="lg:hidden grid grid-cols-2 bg-secondary mb-1">
          <NavLink className="text-white  text-center w-full  font-medium hover:bg-primary  px-5 py-2  " to="/myOrders" activeClassName="bg-primary ">My Orders</NavLink>
          <div className="relative w-full">
                  <button onClick={handleToggleMenu} to="/login" className="bg-red-500 text-white hover:bg-red-600  transition-all px-6 py-2  w-full">  ADMIN PANEL <i className="fas fa-chevron-down"></i></button>
                  <div className={`flex bg-red-400 flex-col absolute  shadow-lg left-5 rounded z-20 ${!toggleMenu && 'hidden'}`}>

                    <NavLink onClick={handleToggleMenu} className="text-white font-medium hover:bg-red-600 px-5 py-2 w-full" activeClassName="bg-red-600" to="/addNewSpot" >Add New Spot</NavLink>
                    <hr />
                    <NavLink onClick={handleToggleMenu} className="text-white font-medium hover:bg-red-600 px-5 py-2 w-full" activeClassName="bg-red-600" to="/manageAllOrders">Manage All Orders</NavLink>
                  </div>
                </div>
        </div>
      }
    </nav >
  );
};

export default Header;