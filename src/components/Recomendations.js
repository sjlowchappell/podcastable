import React from 'react';
import Card from './Card';

const Recomendations = ({ searchedPodcast, recommendationsList }) => {
	return (
		<div className="wrapper">
			<h2>Based on your interest in {searchedPodcast.title_original}, we'd recommend:</h2>
			<ul>
				{recommendationsList.map(recommendation => {
					return <Card key={recommendation.id} podcast={recommendation} />;
				})}
			</ul>
		</div>
	);
};

export default Recomendations;
