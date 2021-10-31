import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Controller, useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios'

const ManageAllOrders = () => {
    const { user } = useAuth()
    const [allUserBookingList, setAllUserBookingList] = useState([])
    const [deleteCount, setDeleteCount] = useState(0)
    const [status, setStatus] = useState(0)
    const { register, handleSubmit, watch, reset, control, getValues, formState: { errors } } = useForm();


    const onSubmit = data => {
        console.log(data)
    }

    const handleUpdateStatus = (e) => {
        e.preventDefault()
        console.clear();
        const status = e.target.querySelector('select').value
        const id = e.target.querySelector('select').id

        axios.post('https://dreadful-corpse-01416.herokuapp.com/updateStatus', { "status": status, "id": id })
            .then(function (response) {
                setStatus(status + 1)
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    const handleDeleteBooking = (id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                        <i className="fas fa-trash-alt text-3xl bg-red-400 w-16 h-16 flex justify-center items-center rounded-full text-red-800"></i>
                        <h1 className="my-5 text-2xl font-medium text-gray-900">Are you sure?</h1>
                        <div>
                            <button className="mr-2 bg-gray-600 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-gray-700 focus:outline-none" onClick={onClose}>Cancel</button>

                            <button className="bg-red-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-red-600 focus:outline-none"
                                onClick={() => {
                                    axios.post('https://dreadful-corpse-01416.herokuapp.com/deleteBooking', { "deleteReqId": id })
                                        .then(function (response) {
                                            setDeleteCount(deleteCount + response.data.deletedCount)

                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                    onClose();
                                }}
                            >
                                Yes, Delete it!
                            </button>
                        </div>
                    </div>
                );
            }
        });



    }

    useEffect(() => {
        axios.get('https://dreadful-corpse-01416.herokuapp.com/manageAllBooking')
            .then(function (response) {
                setAllUserBookingList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [user, deleteCount, status])





    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Plan Name / Duration
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Cost
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start Data
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Current Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Update Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allUserBookingList.length > 0 ?
                                        allUserBookingList.map(singleBooking =>
                                            <tr key={singleBooking._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {singleBooking.userEmail}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{singleBooking?.bookedSpot?.planName} / {singleBooking?.bookedSpot?.duration}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">${singleBooking.totalCost} ({singleBooking.quantity} Person)</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {singleBooking.startDate.split('T')[0]}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {/* {
                                                        singleBooking.status == "Approved" ? <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-black`}>
                                                        {singleBooking.status}
                                                    </span> :
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-300 text-black`}>
                                                    {singleBooking.status}
                                                </span>
                                                    } */}
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-300 text-black`}>
                                                        {singleBooking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">


                                                    <form className="flex items-center" onSubmit={e => handleUpdateStatus(e)}>
                                                        < select defaultValue={singleBooking.status} id={singleBooking._id}

                                                            className="border-2 border-gray-100 form-select block w-full p-2" >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Approved">Approved</option>
                                                        </select >
                                                        <button type="submit" className="ml-2 bg-green-500 hover:bg-green-600 h-full p-2 w-10 text-white" type="submit"><i className="fas fa-check"></i></button>
                                                    </form>

                                                    {/* < select
      
      className="browser-default custom-select" >
      <option value={`Pending:${singleBooking._id}`}>Pending</option>
      <option value={`Approved:${singleBooking._id}`}>Approved</option>
    </select > */}



                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => { handleDeleteBooking(singleBooking._id) }} className="text-white bg-red-500 w-7 h-7 rounded"><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        ) : <tr className="flex justify-center items-center p-6"><td colSpan="3" className="bg-red-200">No Orders Found</td></tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAllOrders;