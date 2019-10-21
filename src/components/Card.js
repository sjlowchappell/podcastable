import React from 'react';

const Card = ({ recommendation, expandDescription }) => {
	return (
		<li className="card">
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
				{/* if the description is too long, add a button to expand it */}
				{recommendation.description.length > 175 ? <button onClick={expandDescription}>Expand</button> : null}
			</div>
		</li>
	);
};

export default Card;
