import axios, { AxiosResponse } from 'axios';

const SHAKEUSER_API_BASE_URL = "http://localhost:1116/api/v1/shakeuser";

interface Token {
    accessToken: string;
}

interface ShakeUser {
    [key: string]: any;
}

class ShakeUserService {
    addShakeUser(requestBody: { eventgameid: number; playerid: number; quantity: number }): Promise<axios.AxiosResponse<any>> {
        return axios.post(`${SHAKEUSER_API_BASE_URL}`, requestBody);
    }

}

const ShakeUserServiceInstance = new ShakeUserService();

export default ShakeUserServiceInstance;
