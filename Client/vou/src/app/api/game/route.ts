import axios, { AxiosResponse } from 'axios';

const GAME_API_BASE_URL = "http://localhost:1116/api/games";

interface Token {
    accessToken: string;
}

interface Game {
    [key: string]: any;
}

class GameService {
    getGamesByEventId(eventId: number): Promise<axios.AxiosResponse<any>> {
        return axios.get(`${GAME_API_BASE_URL}/event/${eventId}`);
    }

}

const gameServiceInstance = new GameService();

export default gameServiceInstance;
