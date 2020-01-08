import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

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

Recommendations.propTypes = {
	searchedPodcast: PropTypes.string,
	recommendationsList: PropTypes.array,
	emptyResults: PropTypes.bool,
	handleClick: PropTypes.func,
};

export default Recommendations;
