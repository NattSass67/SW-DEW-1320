import React, { useState } from 'react';

interface DropdownProps {
  dentists: { id: number; name: string; yearsOfExperience: number; areaOfExpertise: string }[];
  onSelect: (id: number) => void;
}

export default function Dropdown({ dentists, onSelect }: DropdownProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null); // เพิ่ม state สำหรับเก็บค่า selectedId

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedId(selectedId);
    onSelect(selectedId);
  };

  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectChange}
      >
        <option value="" disabled selected>
          Select a dentist
        </option>
        {dentists.map((dentist) => (
          <option key={dentist.id} value={dentist.id}>
            {dentist.name}
          </option>
        ))}
      </select>
      {/* แสดงข้อมูลเมื่อมีการเลือก */}
      {selectedId && (
        <div className="mt-4">
          <p className="text-gray-900 dark:text-white">Years of Experience: {dentists.find((dentist) => dentist.id === selectedId)?.yearsOfExperience}</p>
          <p className="text-gray-900 dark:text-white">Area of Expertise: {dentists.find((dentist) => dentist.id === selectedId)?.areaOfExpertise}</p>
        </div>
      )}
    </div>
  );
}
