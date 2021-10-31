import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import { useParams } from 'react-router';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';


const BookSpot = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [spot, setSpot] = useState({})
    const [quantity, setQuantity] = useState(1)

    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm();

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const onSubmit = async data => {
        data.bookedSpot = spot
        data.userEmail = await user.email
        data.status = "Pending"
        data.totalCost = parseInt(spot.price) * parseInt(quantity)

        axios.post('https://dreadful-corpse-01416.herokuapp.com/placeYourBooking', data)
            .then(function (response) {
                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                                <i className="fas fa-check text-3xl bg-green-400 w-16 h-16 flex justify-center items-center rounded-full text-green-800"></i>
                                <h1 className="my-5 text-2xl font-medium text-gray-800">Your order has been placed!</h1>
                                <button className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>Ok</button>
                            </div>
                        );
                    }
                });
                reset();
                setQuantity(1)

            })
            .catch(function (error) {
                console.log(error);
            })
    };

    // Get Single Spot Data
    useEffect(() => {
        axios.get(`https://dreadful-corpse-01416.herokuapp.com/spot/${id}`)
            .then(res => {
                setSpot(res.data)
            })
    }, [])

    console.log(user)
    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="w-1/2">
                    <div className="">
                        <div className="flex justify-between bg-primary py-2 px-3 text-white">
                            <p><i className="fas fa-clock"></i> {spot.duration}</p>
                            <p><i className="fas fa-map-marked-alt"></i> {spot.location}</p>
                        </div>
                        <img src={spot.img} className="w-full" alt="" />
                    </div>
                    <div className="">
                        <i className="fas fa-star text-primary"></i> {spot.rating}
                        <h3 className="text-2xl font-bold">{spot.planName}</h3>
                        <p><span className="text-red-500 font-bold text-xl">${spot.price}</span>/Per Person</p>
                        <p>{spot.description}</p>
                    </div>

                </div>
                <div className="w-1/2 ml-5">

                    <div className="container mx-auto bg-gray-200 px-3 py-8">
                        <h3 className="text-center font-bold text-2xl mb-4">Place Your Booking Now...</h3>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("fullName", { required: true })} placeholder="Full Name" defaultValue={user.displayName} />
                            {errors.fullName && <span>This field is required</span>}
                            <br /><br />
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("email", { required: true })} placeholder="Email" defaultValue={user.email} />
                            {errors.email && <span>This field is required</span>}
                            <br /><br />
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("address", { required: true })} placeholder="Address" />
                            {errors.address && <span>This field is required</span>}
                            <br /><br />
                            <input defaultValue="1" min="1" onChangeCapture={handleQuantity} type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("quantity", { required: true })} placeholder="Quantity" />
                            {errors.quantity && <span>This field is required</span>}
                            <br /><br />

                            <Controller
                                control={control}
                                name='startDate'
                                render={({ field }) => (
                                    <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholderText='Select date (MM/DD/YYYY)'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                    />
                                )}
                            />
        
                                    
                            <br /><br />
                            <p className="my-3 text-xl font-medium">Total Cost: ${spot.price * quantity}</p>
                            <input type="submit" value="Place Your Order" className=" bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer mx-auto w-full" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSpot;