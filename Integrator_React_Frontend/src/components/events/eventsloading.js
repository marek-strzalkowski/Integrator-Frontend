import React from 'react';

export default function EventsLoading(Component) {

	return function EventsLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;		
		return (
			<p>We are waiting for the data to load!...</p>
		);
	};

}