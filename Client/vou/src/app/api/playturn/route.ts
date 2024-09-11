import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestPlayTurn = async (userId: number, friendId: number, eventGameId: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/play-turn-requests/request`, {
      userId,
      friendId,
      eventGameId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send play turn request');
  }
};

export const respondToPlayTurnRequest = async (requestId: number, responseString: 'ACCEPT' | 'DECLINE') => {
  try {
    const response = await axios.post(`${API_URL}/api/play-turn-requests/respond`, {
      requestId,
      responseString,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to respond to play turn request');
  }
};

export const fetchRequestsForUser = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/play-turn-requests/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch play turn requests for user');
  }
};

export const fetchRequestsFromFriend = async (friendId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/play-turn-requests/friend/${friendId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch play turn requests from friend');
  }
};
