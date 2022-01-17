import React from 'react';

export default function LocationsLoading(Component) {
	
	return function LocationsLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p>We are waiting for the data to load!...</p>
		);
	};

}