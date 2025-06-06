"use client";

import React, { useState } from 'react'
import IconLeftArrow from '@/components/icons/IconLeftArrow'
import PlayIcon from '@/components/icons/PlayIcon';
import shakeStyle from './shake.module.css';

export default function IndexComponent() {
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
  <div
    className="bg-gray-100 flex items-center justify-center h-screen"
    style={{
      width: "100%",
      maxWidth: "430px",
      margin: "0 auto",
      position: "relative",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b)"
    }}
  >
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 bg-black text-white font-bold py-2 px-4 rounded-full shadow-3xl hover:bg-gray-800"
        style={{
          boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.3), inset 4px 4px 10px rgba(0, 0, 0, 0.7)",
        }}
      >
        <IconLeftArrow className="size-5" />
        <span
          style={{
            content: '',
            position: "absolute",
            top: "8px",
            left: "8px",
            width: "5px",
            height: "5px",
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
          }}
        />
      </button>

      <div className="text-center">
        <div className="mb-8 flex items-center justify-center ">
          <button
            className="relative bg-red-600 text-white font-bold rounded-full"
            style={{
              width: "80px", // Adjust the size as needed
              height: "80px",
              boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.3), inset 4px 4px 10px rgba(0, 0, 0, 0.7)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              outline: "none",
            }}
            onClick={handleShakeClick}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "5px",
                height: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
              }}
            />
            <PlayIcon className="size-5" />
          </button>

        </div>
        <div className='mb-8'>
          <p className="text-gray-700 text-lg">
            Shakes Left: <span>{numberClick}</span>
          </p>
        </div>
        <div className="mb-2">
          {/* button to view inventory */}
          <button
            className="bg-gray-200   hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full relative"
            style={{
              minWidth: "320px",
              boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Inventory
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "5px",
                height: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
              }}
            />
          </button>
        </div>
        <div className="mb-2">
          {/* button to share */}
          <button
            className="bg-gray-200   hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full relative"
            style={{
              minWidth: "320px",
              boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Find more shakes
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "5px",
                height: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
              }}
            />
          </button>
        </div>
        <div className="mb-2">
          {/* button to trade */}
          <button
            className="bg-gray-200   hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full relative"
            style={{
              minWidth: "320px",
              boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Trade with friends
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "5px",
                height: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
              }}
            />
          </button>
        </div>
        <div className="mb-2">
          {/* button to gift */}
          <button
            className="bg-gray-200   hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full relative"
            style={{
              minWidth: "320px",
              boxShadow: "inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Gift items to friends
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "5px",
                height: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
              }}
            />
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
