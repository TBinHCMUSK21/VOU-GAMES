import axios from "axios";

const PLAYSESSION_API_BASE_URL = "http://localhost:1116/api/v1/playsessions";

interface Token {
	accessToken: string;
}

interface PlaySessions {
	[key: string]: any;
}

class PlaySessionsService {
	addPlaySessions(requestBody: {
		eventgameid: number;
		playerid: number;
	}): Promise<axios.AxiosResponse<any>> {
		return axios.post(`${PLAYSESSION_API_BASE_URL}`, requestBody);
	}
}

const PlaySessionsServiceInstance = new PlaySessionsService();

export default PlaySessionsServiceInstance;
