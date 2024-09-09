import axios, { AxiosResponse } from 'axios';

const NOTIFICATION_API_BASE_URL = "http://localhost:1116/api/v1/notifications";

interface Token {
    accessToken: string;
}

interface Notification {
    [key: string]: any;
}

class NotificationService {
    addNotification(requestBody: { eventId: number; playerId: number }): Promise<axios.AxiosResponse<any>> {
        return axios.post(`${NOTIFICATION_API_BASE_URL}`, requestBody);
    }

    deleteNotification(eventId: number, playerId: number): Promise<axios.AxiosResponse<any>> {
        return axios.delete(`${NOTIFICATION_API_BASE_URL}?eventId=${eventId}&playerId=${playerId}`);
    }
}

const notificationServiceInstance = new NotificationService();

export default notificationServiceInstance;
