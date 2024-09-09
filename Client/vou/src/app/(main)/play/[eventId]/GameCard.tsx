import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './GameCard.module.css';
const GameCard: ({eventgame}: { eventgame: any }) => React.JSX.Element = ({ eventgame }) => {
    console.log("eventgame: ", eventgame);

    const router = useRouter();
    const handleCardClick = () => {
        sessionStorage.setItem("eventgame", JSON.stringify(eventgame));

        router.push(`/play/detail/${eventgame.game.id}`);
    };

    return (
        <div className={styles.gameCard} onClick={handleCardClick}>
            <Image
                src={eventgame.game.image}
                alt={eventgame.game.name}
                className={styles.gameImage}
                width={100}
                height={50}
                layout="responsive"
            />
            <div className='d-flex flex-column justify-content-start mt-2'>
                <div>{eventgame.game.name}</div>

                <div className="mt-1" style={{fontSize: "14.5px"}}>
                    Type: {eventgame.game.type}
                </div>
            </div>
        </div>
    );
};

export default GameCard;