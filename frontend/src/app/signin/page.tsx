"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router=useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('isloggedin', 'true');
        router.push("/history");
        
      } else {
        const errorData = await response.json();
        console.error('Login Error:', errorData);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <section className="bg-primary-200 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center mb-6">
          <a href="#" className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white">
            <span className="ml-2">Dentist Booking</span>
          </a>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mt-4">
            Sign in
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>
          <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
