import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './EventCard.module.css';
import { SuitHeart, SuitHeartFill } from 'react-bootstrap-icons';
import NotificationService from '../../api/notification/route';
import {number} from "prop-types";

interface Event {
    id: number;
    name: string;
    image: string;
    startTime: string;
    endTime: string;
}

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const router = useRouter();
    console.log("event: ", event);
    console.log("event[1]: ", event[1]);
    const [liked, setLiked] = useState(event[1]);
    console.log("liked?: ", liked);
    const handleCardClick = () => {
        router.push(`/play/${event[0].id}`);
    };

    const handleHeartClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const requestBody = { eventId: event[0].id, playerId: parseInt(sessionStorage.getItem("userId"))};

        if (!liked) {
            const response = await NotificationService.addNotification(requestBody);
            console.log("noti: ", response);
        } else {
            const response = await NotificationService.deleteNotification(requestBody.eventId, requestBody.playerId);
            console.log("noti: ", response);
        }

        setLiked(!liked);
    };

    return (
        <div className={styles.eventCard} onClick={handleCardClick}>
            <Image
                src={event[0].image}
                alt={event[0].name}
                className={styles.eventImage}
                width={100}
                height={50}
                layout="responsive"
            />
            <div className='d-flex flex-column justify-content-start mt-2'>
                <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                    <button className={`${styles.heartButton} ${liked ? styles.liked : ''}`} onClick={handleHeartClick}>
                        {liked ? <SuitHeartFill size={24} /> : <SuitHeart size={24} />}
                    </button>
                    <div>{event[0].name}</div>
                </div>
                <div className="mt-1" style={{fontSize: "16px"}}>
                    {new Date(event[0].startTime).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })} - {new Date(event[0].endTime).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}
                </div>
            </div>
        </div>
    );
};

export default EventCard;