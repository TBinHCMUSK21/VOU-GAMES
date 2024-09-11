import React from 'react';

type FriendRequest = {
  id: number;
  senderName: string;
  receiverName: string;
  status: string;
};

type FriendRequestListProps = {
  requests: FriendRequest[];
  isSentRequest: boolean;
  onRequestUpdate: (requestId: number, action: 'accept' | 'deny') => void;
};

const FriendRequestList: React.FC<FriendRequestListProps> = ({ requests, isSentRequest, onRequestUpdate }) => {
  return (
    <div>
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.id} className="border-b py-2">
              <p><strong>From:</strong> {request.senderName}</p>
              <p><strong>To:</strong> {request.receiverName}</p>
              <p><strong>Status:</strong> {request.status}</p>
              {!isSentRequest && request.status === 'PENDING' && (
                <div>
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded-md mr-2"
                    onClick={() => onRequestUpdate(request.id, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => onRequestUpdate(request.id, 'deny')}
                  >
                    Deny
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequestList;
