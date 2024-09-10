import axios, { AxiosResponse } from 'axios';

const EVENTGAMES_API_BASE_URL = "http://localhost:1110/api/games/eventgames";

interface Token {
    accessToken: string;
}

interface EventGames {
    [key: string]: any;
}

class EventGamesService {
    getGamesByEventId(eventId: number): Promise<axios.AxiosResponse<any>> {
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

        return axios.get(`${EVENTGAMES_API_BASE_URL}/event/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

}

const eventGamesServiceInstance = new EventGamesService();

export default eventGamesServiceInstance;
