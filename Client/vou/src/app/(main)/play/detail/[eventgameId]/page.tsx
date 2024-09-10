"use client";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faArrowLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import {useRouter} from "next/navigation";
import PlaySessionsService from '../../../../api/playsessions/route';
import ShakeUserService from '../../../../api/shakeuser/route';

const Page = () => {
    const [eventgameId, setEventGameId] = useState(-1);
    const [instructions, setInstructions] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedValue = sessionStorage.getItem('eventgame');
        if (storedValue) {
            const eventgame = JSON.parse(storedValue);
            setInstructions(eventgame.game.instructions);
            setName(eventgame.game.name);
            setEventGameId(eventgame.id);
        }
    }, []);

    const handleBack = () => {
        window.history.back();
    };

    const handlePlayGame = async () => {
        const requestBodyAddPlaySessions = {
            eventgameid: eventgameId,
            playerid: 1,
        }

        await PlaySessionsService.addPlaySessions(requestBodyAddPlaySessions);

        if (name == "Quiz Game") {
            router.push(`/play/quiz?eventgameId=${eventgameId}`);
        } else if (name == "Shake Game") {
            const requestBodyAddShakeUser = {
                eventgameid: eventgameId,
                playerid: 1,
                quantity: 10
            }

            await ShakeUserService.addShakeUser(requestBodyAddShakeUser);

            router.push(`/play/shakegame?eventgameId=${eventgameId}`);
        }

        console.log("Play Game button clicked");
    };

    return (
        <div className="container mt-5">
            <div style={{marginBottom: '60px'}}>
                <button
                    className="btn btn-light position-absolute top-0 start-0 m-2"
                    onClick={handleBack}
                    style={{ borderRadius: '50%' , zIndex: 10}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            {instructions ? (
                <div className="card shadow-lg p-4" style={{marginBottom: '100px'}}>
                    <div className="d-flex justify-content-center">
                        <h1 className="text-center">
                            Hướng dẫn chơi
                            <FontAwesomeIcon icon={faTrophy} className="me-2 ml-2" style={{ color: 'gold' }} />
                        </h1>
                    </div>
                    <div className="lead" dangerouslySetInnerHTML={{ __html: instructions }} />
                    <div className="mt-3 d-flex align-items-center justify-content-center">
                        <button
                            className="btn btn-success btn-sm d-flex align-items-center justify-content-center"
                            onClick={handlePlayGame}
                            style={{ borderRadius: '50px', padding: '12px 24px' }}
                        >
                            <FontAwesomeIcon icon={faPlay} className="me-2" />
                            <div style={{fontSize: '18px'}}>Play Game</div>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Không tìm thấy game.
                </div>
            )}
        </div>
    );
};

export default Page;
