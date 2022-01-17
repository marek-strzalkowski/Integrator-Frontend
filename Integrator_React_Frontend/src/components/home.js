import React, { useEffect, useState } from 'react';
import Events from './events/events';
import EventsLoadingComponent from './events/eventsloading';
import axiosInstance from '../axios';

export default function  Home() {

	const EventsLoading = EventsLoadingComponent(Events);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`events/?sort=go`).then((res) => {
			const allEvents = res.data;
			setAppState({ loading: false, events: allEvents });			
		});
	}, [setAppState]);

	return (
		<div className='container'>
			<div className="Home">
				<h1 className='mb-4'>INTEGRATOR</h1>				

				<EventsLoading isLoading={appState.loading} events={appState.events} />

			</div>
		</div>
	);
	
}