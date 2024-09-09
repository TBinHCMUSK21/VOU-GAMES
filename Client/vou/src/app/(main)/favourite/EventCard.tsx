import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../event/EventCard.module.css';

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
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [progressWidth, setProgressWidth] = useState<number>(0);
    const [timeLeftColor, setTimeLeftColor] = useState<string>('gray'); // Default color

    useEffect(() => {
        const calculateTimeLeft = () => {
            const eventDate = new Date(event.startTime);
            const now = new Date();
            const threeDaysBeforeEvent = new Date(eventDate.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days before the event

            const timeDiff = eventDate.getTime() - now.getTime();
            const threeDaysBeforeDiff = eventDate.getTime() - threeDaysBeforeEvent.getTime();

            if (timeDiff <= 0) {
                setTimeLeft('Event has started');
                setProgressWidth(100);
                setTimeLeftColor('gray'); // Change text color to gray when the event has started
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);

            // Calculate progress width as a percentage of the 3-day interval
            const timeLeftPercent = Math.max(0, Math.min(1, (timeDiff / threeDaysBeforeDiff)));
            setProgressWidth(timeLeftPercent * 100);

            // Change text color to red when the event is upcoming
            setTimeLeftColor('red');
        };

        calculateTimeLeft(); // Initial calculation
        const intervalId = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [event.startTime]);

    const handleCardClick = () => {
        router.push(`/play/${event.id}`);
    };

    return (
        <div className={styles.eventCard} onClick={handleCardClick}>
            <Image
                src={event.image}
                alt={event.name}
                className={styles.eventImage}
                width={100}
                height={50}
                layout="responsive"
            />
            <div className='d-flex flex-column justify-content-start mt-2'>
                <div>{event.name}</div>
                <div className="mt-1" style={{fontSize: "14.5px"}}>
                    {new Date(event.startTime).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })} - {new Date(event.endTime).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}
                </div>
                <div className="mt-2" style={{fontSize: "12px", color: timeLeftColor}}>
                    Time left: {timeLeft}
                </div>
                {timeLeft !== 'Event has started' && (
                    <div className={styles.timeBar}>
                        <div
                            className={styles.timeProgress}
                            style={{
                                width: `${progressWidth}%`,
                                backgroundColor: '#FF6500'
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
