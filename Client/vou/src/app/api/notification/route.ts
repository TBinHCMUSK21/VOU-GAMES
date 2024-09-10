import axios, { AxiosResponse } from 'axios';

const NOTIFICATION_API_BASE_URL = "http://localhost:1110/api/games/notifications";

interface Token {
    accessToken: string;
}

interface Notification {
    [key: string]: any;
}

class NotificationService {
    addNotification(requestBody: { eventId: any; playerId: number }): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        return axios.post(`${NOTIFICATION_API_BASE_URL}`, requestBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }

    deleteNotification(eventId: number, playerId: number): Promise<axios.AxiosResponse<any>> {
        const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
            throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;

        return axios.delete(`${NOTIFICATION_API_BASE_URL}?eventId=${eventId}&playerId=${playerId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    }
}

const notificationServiceInstance = new NotificationService();

export default notificationServiceInstance;
