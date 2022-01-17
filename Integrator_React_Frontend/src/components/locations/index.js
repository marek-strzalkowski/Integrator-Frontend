import React, { useEffect, useState } from 'react';
import Locations from './locations';
import LocationsLoadingComponent from './locationsloading';
import axiosInstance from '../../axios';

export default function LocationsList() {

	const LocationsList = LocationsLoadingComponent(Locations);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`locations/`).then((res) => {
			const allLocations = res.data;
			setAppState({ loading: false, locations: allLocations });			
		});
	}, [setAppState]);

	return (
		<div className='container'>
			<div className="Locations">
				<h1>Locations</h1>

				<LocationsList isLoading={appState.loading} locations={appState.locations} />
				
			</div>
		</div>
	);

}