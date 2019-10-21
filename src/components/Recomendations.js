import React from 'react';

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
				{recommendationsList.map((recommendation, index) => {
					return (
						<li key={recommendation.id} className="card">
							<div className="titleSection">
								<a href={recommendation.website} className="logoImageContainer">
									<img src={recommendation.image} alt="" />
								</a>
								<div className="showTitleContainer">
									<a className="title" href={recommendation.website}>
										<h3>{recommendation.title}</h3>
									</a>
									<h4>{recommendation.publisher}</h4>
								</div>
							</div>
							<div>
								<p className="description-closed">
									{/* regex included here because description is sometimes encapsulated in HTML tags */}
									{recommendation.description.replace(/<[^>]+>/g, '')}
								</p>
								<button onClick={expandDescription}>Expand</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Recomendations;
