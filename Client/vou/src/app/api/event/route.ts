import axios, { AxiosResponse } from 'axios';

const EVENT_API_BASE_URL = "http://localhost:1110/api/v1/events";

interface Token {
    accessToken: string;
}

interface Event {
    [key: string]: any;
}

class EventService {
    getHotEvents(searchTerm: string, pageNumber: number, pageSize: number): Promise<axios.AxiosResponse<any>> {
        // const tokenString = localStorage.getItem('token');
        // if (!tokenString) {
        //     throw new Error('Token not found');
        // }
        // const token: Token = JSON.parse(tokenString);
        //const accessToken = token.accessToken;
        const playerId = 1;

        const accessToken = "eyJ0eXAiOiJCZWFyZXIiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkNTFhNmVhNC0zOWEzLTRkMjQtODQyMS1hZTBlYWJlMTA5NWIiLCJpYXQiOjE3MjU4MTU3NjEsImV4cCI6MTcyNTgxNzU2MSwidXNlclVzZXJuYW1lIjoibmV3dXNlcjEyMyIsInVzZXJTdGF0dXMiOiJBQ1RJVkUiLCJ1c2VyUGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwMTAiLCJ1c2VyRW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlclJvbGUiOiJVU0VSIiwidXNlcklkIjoxNX0.LZOoC_oFPxZEMPb-yerJ1i-8RhTqLVgxX7RtO1QB4DMoSkh3HQTRIru2uwX4Jk4kypnPbG1kcgKPNHPNQonB5BoAbMT0ZGdOZTaEWOuk4--JOFQnefGVSedV6RpsFrh7r4CX0TtqZIlU3qIl8hxsYbb18K3W748tyNzJTatUewNBq_0_BMv-UrdCHUQTuFPW8vLvxPgd4YHRkFuZiwZx86Rwg1uNIOhZKAu4-25jT2d5A1dD7HEqlQZaH4DgJF3eTs4h4VkSj8Spmo2JpM53AAm8w6Ut5TbAs02JfhW-bpQBnsm0pCqkYTVSKjm2Ftw73MuOEHP7hTLRRmFF0Zw4Wg";

        return axios.get(`${EVENT_API_BASE_URL}/hot-events?playerId=${playerId}&pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

    getFavouriteEvent(searchTerm: string, pageNumber: number, pageSize: number): Promise<axios.AxiosResponse<any>> {
        const playerId = 1;

        const accessToken = "eyJ0eXAiOiJCZWFyZXIiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkNTFhNmVhNC0zOWEzLTRkMjQtODQyMS1hZTBlYWJlMTA5NWIiLCJpYXQiOjE3MjU4MTU3NjEsImV4cCI6MTcyNTgxNzU2MSwidXNlclVzZXJuYW1lIjoibmV3dXNlcjEyMyIsInVzZXJTdGF0dXMiOiJBQ1RJVkUiLCJ1c2VyUGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwMTAiLCJ1c2VyRW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlclJvbGUiOiJVU0VSIiwidXNlcklkIjoxNX0.LZOoC_oFPxZEMPb-yerJ1i-8RhTqLVgxX7RtO1QB4DMoSkh3HQTRIru2uwX4Jk4kypnPbG1kcgKPNHPNQonB5BoAbMT0ZGdOZTaEWOuk4--JOFQnefGVSedV6RpsFrh7r4CX0TtqZIlU3qIl8hxsYbb18K3W748tyNzJTatUewNBq_0_BMv-UrdCHUQTuFPW8vLvxPgd4YHRkFuZiwZx86Rwg1uNIOhZKAu4-25jT2d5A1dD7HEqlQZaH4DgJF3eTs4h4VkSj8Spmo2JpM53AAm8w6Ut5TbAs02JfhW-bpQBnsm0pCqkYTVSKjm2Ftw73MuOEHP7hTLRRmFF0Zw4Wg";

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
