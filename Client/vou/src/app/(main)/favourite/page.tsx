"use client";
import React, { useState, useEffect, useCallback } from 'react';
import EventCard from './EventCard';
import EventService from '../../api/event/route';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import styles from '../event/EventList.module.css';

const Page = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize] = useState(12);
	const [totalElements, setTotalElements] = useState(0);

	const fetchEvents = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await EventService.getFavouriteEvent(searchTerm, pageNumber, pageSize);
			console.log("response: ", response);
			setTotalElements(response.data.totalElements);
			setFilteredEvents(response.data.content);
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
	}, [searchTerm, pageNumber, pageSize]);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const handleSearch = () => {
		setPageNumber(0);  // Reset page number
		fetchEvents();
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleChangePage = (newPage) => {
		if (newPage >= 0 && newPage < pageCount) {
			setPageNumber(newPage);
		}
	};

	const pageCount = totalElements > 0 ? Math.ceil(totalElements / pageSize) : 1;

	return (
		<div className={styles.eventPage}>
			<div className="mb-4">
				<div className='d-flex align-items-center justify-content-between'>
					<InputGroup className={styles.searchBar}>
						<FormControl
							placeholder="Search events..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<Button variant="outline-secondary" onClick={handleSearch}>
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</InputGroup>
				</div>
			</div>
			{loading && <Spinner animation="border" />}
			{error && <div className="error-message">{error}</div>}
			<div className="d-flex align-items-center justify-content-center mb-3">
				<div style={{fontWeight: "800", fontSize: "28px"}}>Favourite Events</div>
				<FontAwesomeIcon icon={faHeart} height="32px" className="ml-2" style={{color: "red"}} />
			</div>

			<div className={styles.eventList}>
				{filteredEvents.length > 0 ? (
					filteredEvents.map(event => (
						<EventCard key={event.id} event={event} />
					))
				) : (
					<div>No events found.</div>
				)}
			</div>
			<div className="pagination mt-4" style={{marginBottom: '100px'}}>
				<Pagination>
					<Pagination.Prev onClick={() => handleChangePage(pageNumber > 0 ? pageNumber - 1 : 0)} />
					{[...Array(pageCount).keys()].map(number => (
						<Pagination.Item
							key={number}
							active={number === pageNumber}
							onClick={() => handleChangePage(number)}
						>
							{number + 1}
						</Pagination.Item>
					))}
					<Pagination.Next onClick={() => handleChangePage(pageNumber < pageCount - 1 ? pageNumber + 1 : pageCount - 1)} />
				</Pagination>
			</div>
		</div>
	);
};

export default Page;


