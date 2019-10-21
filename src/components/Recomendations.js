import React from 'react';
import Card from './Card';

const Recomendations = ({ searchedPodcast, recommendationsList }) => {
	const expandDescription = e => {
		const description = e.target.previousElementSibling;
		if (description.classList.contains('description-closed')) {
			description.classList.remove('description-closed');
			description.classList.add('description-open');
		} else {
			description.classList.remove('description-open');
			description.classList.add('description-closed');
		}
	};

	return (
		<div>
			<h2>Based on your interest in {searchedPodcast.title_original}, we'd recommend:</h2>
			<ul className="recommendationsGallery">
				{recommendationsList.map(recommendation => {
					return (
						<Card
							key={recommendation.id}
							recommendation={recommendation}
							expandDescription={expandDescription}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default Recomendations;
