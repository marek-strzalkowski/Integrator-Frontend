import React, { useEffect, useState } from 'react';
import Events from './events';
import EventsLoadingComponent from './eventsloading';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

export default function EventsList() {

	const EventsLoading = EventsLoadingComponent(Events);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`events/`).then((res) => {
			const allEvents = res.data;
			setAppState({ loading: false, events: allEvents });			
		});
	}, [setAppState]);

	return (
		<div className='container'>
			<div className="Events">
				<h1>Events</h1>

				<EventsLoading isLoading={appState.loading} events={appState.events} />
				
				<Link to={{pathname: '/event/create'}} className='btn btn-success my-3'>Create Event</Link>    
			</div>
		</div>
	);

}