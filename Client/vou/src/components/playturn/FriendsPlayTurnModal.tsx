import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
interface Token {
  accessToken: string;
}
type PlayTurnRequest = {
  id: number;
  senderName: string;
  receiverName: string;
  status: string;
};

type FriendsPlayTurnModalProps = {
  userId: number;
  isOpen: boolean;
  eventGameId: number;
  onClose: () => void;
  // onNumberClickChange auto +5 lượt chơi
  onNumberClickChange: () => void;
};

const FriendsPlayTurnModal: React.FC<FriendsPlayTurnModalProps> = ({ userId, eventGameId, isOpen, onClose, onNumberClickChange }) => {
  const [activeTab, setActiveTab] = useState<'friendsList' | 'receivedRequests'>('friendsList');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<PlayTurnRequest[]>([]);

  // Fetch friends list
  useEffect(() => {
    if (isOpen) {
      const fetchFriends = async () => {
        try {
          const tokenString = sessionStorage.getItem('token');
          if (!tokenString) {
            throw new Error('Token not found');
          }
          const token: Token = JSON.parse(tokenString);
          const accessToken = token.accessToken;
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/users/${userId}/friends`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
          });
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };

      const fetchReceivedRequests = async () => {
        try {
          const tokenString = sessionStorage.getItem('token');
          if (!tokenString) {
            throw new Error('Token not found');
          }
          const token: Token = JSON.parse(tokenString);
          const accessToken = token.accessToken;
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/play-turn-requests/received/user/${userId}/event-game/${eventGameId}`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
          });
          console.log('Received Requests:', response.data);
          setReceivedRequests(response.data);
        } catch (error) {
          console.error('Error fetching received requests:', error);
        }
      };

      fetchFriends();
      fetchReceivedRequests();
    }
  }, [isOpen, userId]);

  const handleRequestPlayTurn = async (friendId: number) => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/play-turn-requests/request?senderId=${userId}&receiverId=${friendId}&eventGameId=${eventGameId}`, {},{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        alert('Play turn request sent!');
    } catch (error) {
      console.error('Error sending play turn request:', error);
      alert('Failed to send play turn request.');
    }
  };

  const handleAcceptRequest = async (requestId: number) => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/play-turn-requests/respond?requestId=${requestId}&responseString=ACCEPTED`, {}, {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        });
        alert('Play turn request accepted!');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept the request.');
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/play-turn-requests/respond?requestId=${requestId}&responseString=DECLINED`, {},
        {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        alert('Play turn request rejected.');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject the request.');
    }
  };

  const handleShareOnFacebook = async () => {
    const shareUrl = `https://www.facebook.com/profile.php`;
    window.open(shareUrl, '_blank');
    // setChancesLeft(0); // After sharing, reduce the chances to 0
    try {
      const tokenString = sessionStorage.getItem('token');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const token: Token = JSON.parse(tokenString);
      const accessToken = token.accessToken;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/games/play-turn-requests/share?userId=${userId}&eventGameId=${eventGameId}`, {},
        {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        // after sharing, close the modal and increase the chances
        onNumberClickChange();
        onClose();
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject the request.');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="bg-transparent text-gray-700 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="mb-4 flex">
          <button
            className={`px-4 py-2 ${activeTab === 'friendsList' ? 'bg-[#ff986c] text-white' : 'bg-[#ffe26c] text-gray-800'}`}
            onClick={() => setActiveTab('friendsList')}
          >
            Danh sách bạn
          </button>
          <button
            className={`px-4 py-2 ml-2 ${activeTab === 'receivedRequests' ? 'bg-[#ff986c] text-white' : 'bg-[#ffe26c] text-gray-800'}`}
            onClick={() => setActiveTab('receivedRequests')}
          >
            Bạn bè xin lượt chơi
          </button>
        </div>

        {activeTab === 'friendsList' && (
          <div>
            {friends.length === 0 ? (
              <p>No friends available.</p>
            ) : (
              <ul>
                {friends.map((friend) => (
                  <li key={friend.friend.id} className="border-b py-2 flex justify-between items-center">
                    <span>{friend.friend.name}</span>
                    <button
                      className="bg-[#ff986c] text-white px-3 py-1 rounded"
                      onClick={() => handleRequestPlayTurn(friend.friend.id)}
                    >
                      Xin lượt chơi
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'receivedRequests' && (
          <div>
            {receivedRequests.length === 0 ? (
              <p>No requests received.</p>
            ) : (
                <ul>
                    {receivedRequests.map((request) => (
                        <li key={request.id} className="border-b py-2 flex items-center justify-between">
                        <div className="flex-1">
                            <p><strong>From:</strong> {request.user.name}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleAcceptRequest(request.id)}
                            >
                            <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => handleRejectRequest(request.id)}
                            >
                            <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        </li>
                    ))}
                </ul>              
            )}
          </div>
        )}
        <div className="mt-4 text-center">
          <span className="block mb-2">
            Bạn còn <strong>1</strong> lượt share để nhận thêm lượt chơi.
          </span>
          {1 > 0 && (
            <button
              className="bg-[#ff6c8a] text-white px-3 py-2 rounded"
              onClick={handleShareOnFacebook}
            >
              Share on Facebook
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPlayTurnModal;
