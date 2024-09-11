import axios, { AxiosResponse } from 'axios';

const EVENT_API_BASE_URL = "http://localhost:1110/api/v1/events";

interface Token {
    accessToken: string;
}

class EventService {
    getHotEvents(searchTerm: string, pageNumber: number, pageSize: number): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const playerId = sessionStorage.getItem('userId');

        if (!playerId) {
            throw new Error('userId not found');
        }

        return axios.get(`${EVENT_API_BASE_URL}/hot-events?playerId=${playerId}&pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

    getFavouriteEvent(searchTerm: string, pageNumber: number, pageSize: number): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const playerId = sessionStorage.getItem('userId');

        if (!playerId) {
            throw new Error('userId not found');
        }

        return axios.get(`${EVENT_API_BASE_URL}/favourite-events?playerId=${playerId}&pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

}

const eventServiceInstance = new EventService();

export default eventServiceInstance;
