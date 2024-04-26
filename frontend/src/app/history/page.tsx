"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BookingItem {
  id: string;
  user_id: string;
  dentist_id: string;
  booking_date: string;
  booking_status: string;
  dentist_name: string;
  dentist_experience: number;
  dentist_expertise: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isloggedin') === 'true';

    if (!isLoggedIn) {
      router.push('/signin');
    } else {
      fetchBookingData();
    }
  }, []);

  const fetchBookingData = async () => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        return;
      }

      const userData = JSON.parse(storedUserData);
      const token = userData.token;

      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setBookingData(data.data);
      } else {
        console.error('Failed to fetch booking data');
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        console.log('User data not found in localStorage');
        return;
      }

      const userData = JSON.parse(storedUserData);
      const token = userData.token;
      const response = await fetch(`http://localhost:5000/api/booking/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedData = bookingData.filter((item: BookingItem) => item.id !== id);
        setBookingData(updatedData);
        console.log('Booking deleted successfully');
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
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
            {bookingData.length > 0 ? (
              bookingData.map((item: BookingItem) => (
                <tr key={item.id} className={`bg-white dark:bg-gray-900 border-b dark:border-gray-700`}>
                  <td className="px-7 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.dentist_name}
                  </td>
                  <td className="px-7 py-4">{item.booking_date}</td>
                  <td className="px-7 py-4">{item.booking_status}</td>
                  <td className="px-7 py-4">
                    {item.booking_status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <Link href={`/editbooking/${item.id}`}>Edit</Link>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
              ))
            ) : (
              null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
