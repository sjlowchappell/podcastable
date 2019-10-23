import React from 'react';
import Card from './Card';

const Recomendations = ({ searchedPodcast, recommendationsList, emptyResults }) => {
	return (
		<section id="results">
			<div className="wrapper">
				{emptyResults ? (
					<p className="errorMessage">
						Sorry! We couldn't find recommendations for that podcast. Please try again.
					</p>
				) : (
					<>
						<h2>Based on your interest in {searchedPodcast.title_original}, we'd recommend:</h2>
						<ul>
							{recommendationsList.map(recommendation => {
								return <Card key={recommendation.id} podcast={recommendation} />;
							})}
						</ul>
					</>
				)}
			</div>
		</section>
	);
};

export default Recomendations;
