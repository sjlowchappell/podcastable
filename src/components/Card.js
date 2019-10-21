import React from 'react';
import cardStyles from './card.module.css';

const Card = ({ recommendation }) => {
	const expandDescription = e => {
		const description = e.target.previousElementSibling;
		if (description.classList.contains('descriptionClosed')) {
			description.classList.remove('descriptionClosed');
			description.classList.add('descriptionOpen');
		} else {
			description.classList.remove('descriptionOpen');
			description.classList.add('descriptionClosed');
		}
	};
	return (
		<li className={cardStyles.card}>
			<div className={cardStyles.titleSection}>
				<a href={recommendation.website} className={cardStyles.logoImageContainer}>
					<img src={recommendation.image} alt="" />
				</a>
				<div className={cardStyles.showTitleContainer}>
					<a className={cardStyles.title} href={recommendation.website}>
						<h3>{recommendation.title}</h3>
					</a>
					<h4>{recommendation.publisher}</h4>
				</div>
			</div>
			<div>
				<p className="descriptionClosed">
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
