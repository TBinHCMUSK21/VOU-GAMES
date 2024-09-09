"use client";

import React, {useEffect, useState } from 'react'
import IconLeftArrow from '@/components/icons/IconLeftArrow'
import PlayIcon from '@/components/icons/PlayIcon';
import IconInstruction from '@/components/icons/IconInstruction';
import ThreeDText from '@/components/common/ThreeDText';
interface Game {
  id: number;
  name: string;
  description: string;
  instructions: string;
  // Add other properties as needed
}
const Page = ({
	searchParams,
}: {
	searchParams: {
		shakegame: string;
		brand: string;
		event: string;
	};
}) => {
	const { brand, event, shakegame } = searchParams;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberClick, setNumberClick] = useState(5);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShakeClick = async () => {
    if (numberClick > 0) {
      try {
        // Show loading spinner or indicator
        setIsLoading(true);
  
        // Make the AJAX request to the server
        const response = await fetch('http://localhost:1116/api/items/scroll/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Add any necessary body content here
        });
  
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Parse the JSON data
        const data = await response.json();
  
        // Update state with the fetched data
        setItem(data);
        setIsModalOpen(true);
        setNumberClick(prev => prev - 1);
      } catch (error) {
        // Handle errors, e.g., show a message to the user
        console.error('Fetch error:', error);
        alert('Failed to fetch item. Please try again later.');
      } finally {
        // Hide loading spinner or indicator
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch('http://localhost:1116/api/games/1');
        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }
        const data: Game = await response.json(); // Type the data
        setGame(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchGameDetails();
  }, []);

    const handleToggleInstructions = () => {
      console.log('toggle instructions');
      setShowInstructions(prevState => !prevState);
    };

    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
  <>
    {game ? (
    <div
      className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full overflow-y-hidden max-h-[calc(100vh-80px)]"
      style={{
        margin: "0 auto",
        position: "relative",
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)"
      }}
    >
      <div className="absolute top-4 left-4 w-full flex flex-row items-center">
        {/* Back Button */}
        <button
          className=" flex-none font-bold py-2 px-4 rounded-full shadow-3xl hover:bg-gray-800"
          style={{
            backgroundColor: "#4A2C2A",
            boxShadow: "inset -2px -2px 5px rgba(255, 255, 255, 0.2), inset 2px 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          <IconLeftArrow className="size-5" style={{
            color: "white",
          }} />
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
        <div className='flex-none ml-3'> {game.name} </div>
        <div className="relative group flex flex-grow justify-end mr-7">
          <IconInstruction className="size-5" 
          onClick = {handleToggleInstructions}/>
          {showInstructions && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-48 bg-gray-800 text-white text-sm rounded-md py-2 px-4 transition-opacity duration-300">
              <h2 className="font-bold text-lg">Hướng dẫn</h2>
              <p>{game.instructions}</p>
            </div>
          )}
        </div>
      </div>

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
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col text-center">
              <h2 className="text-2xl font-bold mb-4">Chúc mừng!</h2>
              <p className="mb-6">Bạn đã nhận được chữ</p>
              {item ? (
              <div className="flex justify-center mb-6">
                <ThreeDText text={item.image} size="text-6xl" />
              </div>) : (
                <p></p>
              )}
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700 text-lg">Loading...</p>
    </div>
  )}
  </>
  )
}

export default Page;
