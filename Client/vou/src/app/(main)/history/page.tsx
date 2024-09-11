"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@/components/common/Tabs';
import FriendRequestList from '@/components/common/FriendRequestList';

type FriendRequest = {
  id: number;
  senderName: string;
  receiverName: string;
  status: string;
};

interface Token {
  accessToken: string;
}

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        console.log('User ID:', userId);
        //const response = await axios.get(`/api/user`);
        setUserId(parseInt(userId));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchRequests = async () => {
        setLoading(true);
        try {
          const tokenString = sessionStorage.getItem('token');
          if (!tokenString) {
            throw new Error('Token not found');
          }
          const token: Token = JSON.parse(tokenString);
          const accessToken = token.accessToken;

          const [pendingResponse, sentResponse] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/friend-requests/requests/received/${userId}`, {
              headers:{
                'Authorization': `Bearer ${accessToken}`
              }
            }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/friend-requests/requests/sent/${userId}`, {
              headers:{
                'Authorization': `Bearer ${accessToken}`
              }
            })
          ]);
		  console.log('Pending Requests Response:', pendingResponse);
          console.log('Sent Requests Response:', sentResponse);
          setPendingRequests(pendingResponse.data);
          setSentRequests(sentResponse.data);
        } catch (error) {
          console.error('Error fetching friend requests:', error);
          setError('Failed to fetch friend requests');
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();
    }
  }, [userId]);

  const handleSendRequest = async () => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/friend-requests/send`, null, {
        params: {
          senderId: userId,
          searchInput: phoneNumber
        }, headers:{
          'Authorization': `Bearer ${accessToken}`
        }
      });

      alert(response.data);
      setPhoneNumber('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleRequestUpdate = async (requestId: number, action: 'accept' | 'deny') => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/friend-requests/${requestId}?status=${action}`,{}, {
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response.data); // You can update the UI based on the response
      // Update the requests state after accepting or denying
      setPendingRequests(prevRequests =>
        prevRequests.filter(request => request.id !== requestId)
      );
    } catch (error) {
      console.error('Error updating friend request:', error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container mx-auto p-4">
		<div className="mb-4 flex items-center">
			<input
				type="text"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				placeholder="Nhập SDT hoặc Email"
				className="border border-gray-300 p-2 rounded-l-md flex-grow h-12"
			/>
			<button
				onClick={handleSendRequest}
				className="bg-blue-500 text-white py-2 px-3 rounded-r-md h-12 text-sm"
			>
				Kết bạn
			</button>
		</div>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tab1Content={<FriendRequestList requests={pendingRequests} onRequestUpdate={handleRequestUpdate}  isSentRequest={false}/>}
        tab2Content={<FriendRequestList requests={sentRequests} onRequestUpdate={handleRequestUpdate}  isSentRequest={true}/>}
      />
    </div>
  );
};

export default FriendsPage;
