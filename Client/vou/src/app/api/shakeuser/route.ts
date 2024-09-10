import axios, { AxiosResponse } from 'axios';

const SHAKEUSER_API_BASE_URL = "http://localhost:1110/api/games/shakeuser";

interface Token {
    accessToken: string;
}

interface ShakeUser {
    [key: string]: any;
}

class ShakeUserService {
    addShakeUser(requestBody: { eventgameid: number; playerid: number; quantity: number }): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        return axios.post(`${SHAKEUSER_API_BASE_URL}`, requestBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

}

const ShakeUserServiceInstance = new ShakeUserService();

export default ShakeUserServiceInstance;
