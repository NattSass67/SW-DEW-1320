"use client";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Page() {
  const mockData = [
    {
      dentist: 'Dentist 1',
      bookingDate: '30/4/2567',
      bookingStatus: 'Ongoing',
    },
    {
      dentist: 'Dentist 1',
      bookingDate: '13/4/2567',
      bookingStatus: 'Completed',
    },
    {
      dentist: 'Dentist 2',
      bookingDate: '12/4/2567',
      bookingStatus: 'Completed',
    },
    {
      dentist: 'Dentist 1',
      bookingDate: '11/4/2567',
      bookingStatus: 'Completed',
    },
    {
      dentist: 'Dentist 2',
      bookingDate: '10/4/2567',
      bookingStatus: 'Completed',
    },
  ];

  const handleDelete = (index: number) => {
    console.log('Delete action for index:', index);
  };

  return (
    <div className='flex flex-col items-center h-screen w-screen'>
      <div className='py-11 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>History</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-7 py-3">
                Dentist
              </th>
              <th scope="col" className="px-7 py-3">
                Booking Date
              </th>
              <th scope="col" className="px-7 py-3">
                Booking Status
              </th>
              <th scope="col" className="px-7 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                  } border-b dark:border-gray-700`}
              >
                <th scope="row" className="px-7 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.dentist}
                </th>
                <td className="px-7 py-4">{item.bookingDate}</td>
                <td className="px-7 py-4">{item.bookingStatus}</td>
                <td className="px-7 py-4">
                  {item.bookingStatus === 'Ongoing' ? (
                    <div className="flex space-x-2">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <Link href="/editbooking">Edit</Link>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Can't edit</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
