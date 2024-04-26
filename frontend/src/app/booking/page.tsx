"use client";
import React, { useState } from 'react';
import Dropdown from './components/dropdown';

const dentistData = [
  {
    id: 1,
    name: 'Dr. John Doe',
    yearsOfExperience: 15,
    areaOfExpertise: 'General Dentistry',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    yearsOfExperience: 20,
    areaOfExpertise: 'Orthodontics',
  },
  {
    id: 3,
    name: 'Dr. Michael Johnson',
    yearsOfExperience: 10,
    areaOfExpertise: 'Pediatric Dentistry',
  },
  {
    id: 4,
    name: 'Dr. Sarah Lee',
    yearsOfExperience: 12,
    areaOfExpertise: 'Cosmetic Dentistry',
  },
];

export default function Booking() {
  const [selectedDentistId, setSelectedDentistId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

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

  const handleDentistSelect = (id: number) => {
    setSelectedDentistId(id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

    if (selectedDentistId && selectedDate) {
      console.log("Selected Dentist ID:", selectedDentistId);
      console.log("Selected Date:", selectedDate);
    } else {
      alert('โปรดเลือกหมอและวันที่ก่อนทำการจอง');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Dental Booking
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
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}
