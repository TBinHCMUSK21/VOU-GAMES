"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; // useParams to get eventId from URL
import GameCard from './GameCard'; // Adjust this import path as needed
import EventGamesService from '../../../api/eventgames/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import styles from './GameList.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
    const { eventId } = useParams(); // Get eventId from URL params
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [eventgames, setEventGames] = useState([]);

    const brandID = 15;

    const fetchGames = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await EventGamesService.getGamesByEventId(Number(eventId));
            console.log("response: ", response);
            setEventGames(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setError(`Server responded with an error: ${error.response.statusText}`);
            } else if (error.request) {
                setError("No response from server.");
            } else {
                setError(`Error: ${error.message}`);
            }
            setLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        if (brandID) {
            fetchGames();
        }
    }, [fetchGames, eventId]);

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className={styles.gamePage}>
            {loading && <Spinner animation="border" />}
            {error && <div className="error-message">{error}</div>}
            <div style={{marginBottom: '30px'}}>
                <button
                    className="btn btn-light position-absolute top-0 start-0 m-2"
                    onClick={handleBack}
                    style={{ borderRadius: '50%' , zIndex: 10}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
                <div style={{fontWeight: "800", fontSize: "28px"}}>Game Of Event</div>
            </div>

            <div className={styles.gameList}>
                {eventgames.length > 0 ? (
                    eventgames.map(eventgame => (
                        <GameCard key={eventgame.game.id} eventgame={eventgame} />
                    ))
                ) : (
                    <div>No games found.</div>
                )}
            </div>
        </div>
    );
};

export default Page;