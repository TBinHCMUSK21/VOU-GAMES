"use client";

import React, { useState } from 'react'
import IconLeftArrow from '@/components/icons/IconLeftArrow'
const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberClick, setNumberClick] = useState(5);

  const handleShakeClick = () => {
    if (numberClick > 0) {
      setIsModalOpen(true);
      setNumberClick(prev => prev - 1);
      console.log(numberClick);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
<div className="bg-gray-100 flex items-center justify-center h-screen relative">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full"
      >
        <IconLeftArrow className="size-5" />
      </button>

      <div className="text-center">
        <div className="mb-8">
          <button
            onClick={handleShakeClick}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl"
          >
            Shake Now
          </button>
        </div>
        <div>
          <p className="text-gray-700 text-lg">
            Shakes Left: <span>{numberClick}</span>
          </p>
        </div>
        <div className="mb-8">
          {/* button to view inventory */}
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full"
          >
            Inventory
            </button>
        </div>
      </div>

      {/* Item modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-6">You shook the phone and got an item!</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
</div>
  )
}

export default index
