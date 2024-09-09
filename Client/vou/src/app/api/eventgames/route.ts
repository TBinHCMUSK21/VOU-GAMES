import axios, { AxiosResponse } from 'axios';

const EVENTGAMES_API_BASE_URL = "http://localhost:1116/api/eventgames";

interface Token {
    accessToken: string;
}

interface EventGames {
    [key: string]: any;
}

class EventGamesService {
    getGamesByEventId(eventId: number): Promise<axios.AxiosResponse<any>> {
        return axios.get(`${EVENTGAMES_API_BASE_URL}/event/${eventId}`);
    }

}

const eventGamesServiceInstance = new EventGamesService();

export default eventGamesServiceInstance;
