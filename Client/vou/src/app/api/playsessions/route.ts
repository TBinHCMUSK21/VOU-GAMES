import axios from "axios";

const PLAYSESSION_API_BASE_URL = "http://localhost:1110/api/games/playsessions";

interface Token {
	accessToken: string;
}

interface PlaySessions {
	[key: string]: any;
}

class PlaySessionsService {
    addPlaySessions(requestBody: { eventgameid: number; playerid: number }): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        return axios.post(`${PLAYSESSION_API_BASE_URL}`, requestBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

}

const PlaySessionsServiceInstance = new PlaySessionsService();

export default PlaySessionsServiceInstance;
