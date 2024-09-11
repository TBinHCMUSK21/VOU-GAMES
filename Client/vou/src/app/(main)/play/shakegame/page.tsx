"use client";
import React, {useEffect, useState } from 'react'
import IconLeftArrow from '@/components/icons/IconLeftArrow'
import PlayIcon from '@/components/icons/PlayIcon';
import IconInstruction from '@/components/icons/IconInstruction';
import ThreeDText from '@/components/common/ThreeDText';
import CustomButtonShake from '@/components/common/CustomButtonShake';
import FriendsPlayTurnModal  from '@/components/playturn/FriendsPlayTurnModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
interface Game {
  id: number;
  name: string;
  description: string;
  instructions: string;
  targetWord: string;
  // Add other properties as needed
}
interface Item {
  id: number;
  name: string;
  quantity: number;
}
type UserDetails = {
  id: number;
  clerkId: string;
  avatar: string;
  createdAt: string; // You can use Date type if you want to work with dates
  dob: string | null;
  email: string;
  gender: string | null;
  name: string;
  phoneNumber: string;
  role: string;
  username: string;
};
type Friend = {
  id: {
    userId: number;
    friendId: number;
  };
  user: UserDetails;
  friend: UserDetails;
};
interface PlaySessionUpdateRequest {
  eventgameId: number;
  userId: number;
  endTime: string; // Adjust the type as needed, e.g., Date
}

interface Token {
  accessToken: string;
}

const Page = ({
	searchParams,
}: {
	searchParams: {
		eventgameId: string;
	};
}) => {
	const { eventgameId } = searchParams;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isPlayTurnModalOpen, setIsPlayTurnModalOpen] = useState(false);
  const [numberClick, setNumberClick] = useState(5);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        const fetchedUserId = Number(response.data.data.id);
        setUserId(fetchedUserId);  // Set the userId

        // After setting the userId, fetch shake user details
        fetchShakeUserDetails(fetchedUserId);  // Pass the userId here
        fetchFriends(fetchedUserId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEventDetails = async () => {
      try {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
          throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/eventgames/get-event/${eventgameId}`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = response.data;
        console.log('data event', data);
        setGame(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    // Move shakeUserDetails inside fetchUser and pass userId as argument
    const fetchShakeUserDetails = async (fetchedUserId: number) => {
      if (!fetchedUserId) return;
      try {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
          throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/shakeuser/get-shake-user/${fetchedUserId}/${eventgameId}`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = response.data;
        console.log('data shake user', data);
        setNumberClick(data.quantity);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    const fetchFriends = async (fetchedUserId: number) => {
      try {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
          throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/users/${fetchedUserId}/friends`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('friends', response.data);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    // Execute fetchUser and fetchEventDetails
    fetchUser();
    fetchEventDetails();
  }, [eventgameId]); // Add dependencies if necessary


  const handleShakeClick = async () => {
    console.log('handleShakeClick',userId);
    if (numberClick > 0  && userId) {
      try {
        // Show loading spinner or indicator
        setIsLoading(true);

        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
          throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        // Make the AJAX request to the server
        const response = await fetch(`http://localhost:1110/api/games/items/scroll/eventGameId/${eventgameId}/userId/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({}), // Add any necessary body content here
        });
        // Check if the response is successful (status code 200-299)
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
  
        // Parse the JSON data
        const data = await response.json();
  
        // Update state with the fetched data
        setItem(data);
        setIsModalOpen(true);
        setNumberClick(prev => prev - 1);
        //update play session end time
        const requestPayload: PlaySessionUpdateRequest = {
          eventgameId: Number(eventgameId),
          userId: userId,
          endTime: new Date().toISOString(),
        };
        updateEndTime(requestPayload);
      } catch (error) {
        // Handle errors, e.g., show a message to the user
        console.error('Fetch error:', error);
        alert('Failed to fetch item. Please try again later....');
      } finally {
        // Hide loading spinner or indicator
        setIsLoading(false);
      }
    }
  };

  const updateEndTime = async (request: PlaySessionUpdateRequest) => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;

      const response = await axios.put(
        `http://localhost:1110/api/games/games/playsessions/end`, // Adjust the URL as needed
        request,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleInventoryClick = async () => {
    try{
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/user-items/user/${userId}/event/${eventgameId}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response);
      // set items from data
      const data = response.data;
      setItems(data);
      setIsItemModalOpen(true);
    }
    catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch item. Please try again later.');
    }
  }

  const handlePlayTurnClick = () => {
    console.log('handlePlayTurnClick');
    setIsPlayTurnModalOpen(true);
  }

  const handleTradeClick = async () => {
    try{
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/user-items/user/${userId}/event/${eventgameId}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response);
      // set items from data
      const data = response.data;
      setItems(data);
      setIsTradeModalOpen(true);
    }
    catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch item. Please try again later.');
    }
  }

  const setGiftRequest = async (friendId:number,userItemId:number) => {
    try{
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/gift-history/add`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      },{
        params: {
          giverId: userId,
          receiverId:friendId,
          itemId:userItemId,
          eventGameId:eventgameId
        }
      });
      console.log(response);
      // set items from data
      const data = response.data;
      alert('Gửi quà thành công');
    }
    catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch item. Please try again later.');
    }
    console.log('setGiftRequest',friendId,userItemId);
  }


  const closeModal = () => {
    setIsModalOpen(false);
    setIsItemModalOpen(false);
    setIsTradeModalOpen(false);
    setIsPlayTurnModalOpen(false);
  };

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
              {/* <p>{game.instructions}</p> */}
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
          <CustomButtonShake label="Kho đồ" onClick={handleInventoryClick} />
          <CustomButtonShake label="Tìm thêm lượt chơi" onClick={handlePlayTurnClick}/>
          <CustomButtonShake label="Tặng vật phẩm cho bạn bè" onClick={handleTradeClick}/>
          <CustomButtonShake label="Đổi quà" />
        </div>

        {/* Roll modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col text-center">
              <h2 className="text-2xl font-bold mb-4">Chúc mừng!</h2>
              <p className="mb-6">Bạn đã nhận được chữ</p>
              {item ? (
              <div className="flex justify-center mb-6">
                <ThreeDText text={item.name} size="text-6xl" />
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
        {/* Items Modal */}
        {isItemModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col text-center">
              {/* Close Button */}
              <div className="w-full flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-transparent text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">Vật phẩm của bạn</h2>
              <div className="flex flex-wrap justify-center mb-0">
                  {items.length > 0 ? (
                    items.map((item: { items: { name: string }, quantity: number }, index: number) => (
                      <div key={index} className="mx-4 mb-4 flex flex-col items-center">
                        {item.items && (
                          <>
                            <ThreeDText text={item.items.name} size="text-4xl" />
                            <span className="text-sm font-semibold mt-2">x{item.quantity}</span>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>You don't own any items yet.</p>
                  )}
              </div>
              {/* add div to show target word with normal text style bold, large*/}
              <div className='mb-5'>
                <p>Keyword cần hoàn thiện: {game.targetWord}</p>
              </div>
            </div>
          </div>
        )}
        {/* Trade Modal */}
        {isTradeModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col text-center">
              {/* Close Button */}
              <div className="w-full flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-transparent text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">Vật phẩm của bạn</h2>
              <div className="flex flex-wrap justify-center mb-0">
                  {items.length > 0 ? (
                    items.map((item: { items: { name: string }, quantity: number }, index: number) => (
                      <div key={index} className="mx-4 mb-4 flex flex-col items-center">
                        {item.items && (
                          <>
                            <ThreeDText text={item.items.name} size="text-4xl" />
                            <span className="text-sm font-semibold mt-2">x{item.quantity}</span>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>You don't own any items yet.</p>
                  )}
              </div>

              {/* Gift Section */}
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Tặng vật phẩm</h3>

                {/* Friend Dropdown */}
                <label htmlFor="friendSelect" className="block text-sm font-medium text-gray-700">Chọn bạn bè:</label>
                <select id="friendSelect" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setSelectedFriendId(Number(e.target.value))}>
                  <option value="">Chọn bạn</option>
                  {friends.map((friend) => (
                    <option key={friend.friend.id} value={friend.friend.id}>
                      {friend.friend.name}
                    </option>
                  ))}
                </select>

                {/* Item Dropdown */}
                <label htmlFor="itemSelect" className="block text-sm font-medium text-gray-700 mt-4">Chọn vật phẩm:</label>
                <select id="itemSelect" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setSelectedItemId(e.target.value)}>
                  <option value="">Chọn vật phẩm</option>
                  {items.map((item: { items: { name: string } }, index: number) => (
                    <option key={index} value={item.items.id}>
                      {item.items.name}
                    </option>
                  ))}
                </select>

                {/* Submit Button */}
                <button
                onClick={() => {
                  if (selectedFriendId && selectedItemId) {
                    // If both are not null, call setGiftRequest
                    setGiftRequest(selectedFriendId, Number(selectedItemId)); // Cast selectedItemId to number if it's string
                  } else {
                    alert('Please select both a friend and an item.');
                  }
                }}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Tặng
              </button>
              </div>
            </div>
          </div>
        )}

        {/* play turn Modal */}
        {isPlayTurnModalOpen && (
          <FriendsPlayTurnModal
            userId={userId ?? 0} // Pass the current user ID here
            eventGameId={Number(eventgameId) ?? 0}
            isOpen={isPlayTurnModalOpen}
            onClose={() => setIsPlayTurnModalOpen(false)}
          />
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
