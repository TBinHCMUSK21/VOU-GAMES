import axios, { AxiosResponse } from 'axios';

const GAME_API_BASE_URL = "http://localhost:1116/api/games/games";

interface Token {
    accessToken: string;
}

interface Game {
    [key: string]: any;
}

class GameService {
    getGamesByEventId(eventId: number): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        return axios.get(`${GAME_API_BASE_URL}/event/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

}

const gameServiceInstance = new GameService();

export default gameServiceInstance;
