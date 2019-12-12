import React from 'react';
import Card from './Card';

const Recommendations = ({ searchedPodcast, recommendationsList, emptyResults, handleClick }) => {
	return (
		<section id="results">
			<div className="wrapper">
				{emptyResults ? (
					<p className="centerText">
						Sorry! We couldn't find recommendations for that search. Please try again.
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
				<div className="centerText">
					<a href="#search" onClick={handleClick} className="button">
						Start Over
					</a>
				</div>
			</div>
		</section>
	);
};

export default Recommendations;
