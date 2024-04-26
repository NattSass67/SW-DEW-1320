"use client";
import React, { useEffect, useState } from 'react';
import Dropdown from './components/dropdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface paramsProps {
  params: {
    id: string; // Assuming 'id' is a string property in params
  };
}


export default function Booking({ params }: paramsProps) {
  const [dentistData, setdentistData] = useState([]);
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isloggedin') === 'true';

    if (!isLoggedIn) {
      router.push('/signin');
    } else {
      fetchDentists();
    }
  }, []);


  const fetchDentists = async () => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        return;
      }

      const userData = JSON.parse(storedUserData);
      const token = userData.token;
      const response = await fetch('http://localhost:5000/api/dentist/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setdentistData(data.data);
      } else {
        console.error('Failed to fetch dentists');
      }
    } catch (error) {
      console.error('Error fetching dentists:', error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const currentDate = new Date();
    const inputDate = new Date(selectedDate);

    if (inputDate > currentDate) {
      setSelectedDate(selectedDate);
    } else {
      alert('โปรดเลือกวันที่ในอนาคตเท่านั้น');
      setSelectedDate('');
    }
  };

  const handleDentistSelect = (id: string | null) => {
    setSelectedDentistId(id);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDentistId && selectedDate) {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
          return;
        }
        const userData = JSON.parse(storedUserData);
        const token = userData.token;

        const response = await fetch(`http://localhost:5000/api/booking/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dentistId: selectedDentistId,
            bookingDate: selectedDate,
          }),
        });

        if (response.ok) {
          console.log('Booking Edit successfully');
          router.push('/history');

        } else {
          console.error('Failed to create booking');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
      }
    } else {
      console.log(selectedDentistId, selectedDate)
      alert('โปรดเลือกหมอและวันที่ก่อนทำการจอง');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Edit Booking
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dentist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dentist</label>
              <Dropdown dentists={dentistData} onSelect={handleDentistSelect} />
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
