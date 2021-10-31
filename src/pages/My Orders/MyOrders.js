import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const MyOrders = () => {
    const { user } = useAuth()
    const [singleUserOrderList, setSingleUserOrderList] = useState([])
    const [deleteCount, setDeleteCount] = useState(0)

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
                                        // setDeleteCount(response.data.deletedCount)
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
        axios.post('https://dreadful-corpse-01416.herokuapp.com/singleUserOrderList', { "userEmail": user.email || NaN })
            .then(function (response) {
                setSingleUserOrderList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [user, deleteCount])
    return (
        <div>



            <div className="container mx-auto p-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Plan Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Duration
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Cost
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Start Data
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {singleUserOrderList.length > 0 ?
                                            singleUserOrderList.map(singleBooking =>
                                                <tr key={singleBooking._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {singleBooking?.bookedSpot?.planName}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{singleBooking?.bookedSpot?.duration}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">${singleBooking.totalCost} ({singleBooking.quantity} Person)</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {singleBooking.startDate.split('T')[0]}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-400 text-black`}>
                                                            {singleBooking.status}
                                                        </span>
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

        </div>
    );
};

export default MyOrders;