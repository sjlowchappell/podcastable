import React from 'react';
import cardStyles from './card.module.css';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';

const Card = ({ podcast }) => {
	// Expand description allows user to open and close description based on length of description. Toggles classes that either display or hide content
	const expandDescription = e => {
		e.stopPropagation();
		const description = e.target.parentElement.previousElementSibling;
		const icon = e.target;
		if (description.classList.contains('descriptionClosed')) {
			description.classList.toggle('descriptionClosed');
			icon.classList.toggle('closedIcon');
			icon.nextElementSibling.classList.toggle('closedIcon');
		} else {
			description.classList.toggle('descriptionClosed');
			icon.classList.toggle('closedIcon');
			icon.previousElementSibling.classList.toggle('closedIcon');
		}
	};
	return (
		<li className={cardStyles.card}>
			<div className={cardStyles.cardHeading}>
				<a href={podcast.website} className={cardStyles.cardThumbnail}>
					<img src={podcast.image} alt={`Thumbnail for the ${podcast.title} podcast`} />
				</a>
				<div className={cardStyles.cardTitle}>
					<a href={podcast.website}>
						<h2>{podcast.title}</h2>
					</a>
					<p className={cardStyles.cardSubtitle}>{podcast.publisher}</p>
				</div>
			</div>
			<div className={cardStyles.cardDescription}>
				<p className="descriptionClosed">
					{/* regex included here because description is sometimes encapsulated in HTML tags and entities. */}
					{podcast.description.replace(/<[^>]+>/g, '').replace(/&#{0,1}[a-z0-9]+;/gi, ' ')}
				</p>
				{/* if the description is too long, add a button to expand it */}
				{podcast.description.length > 175 ? (
					<button className={cardStyles.cardDescriptionExpandButton} onClick={expandDescription}>
						<img className="svgIcon" src={plusIcon} alt="Expand Description" />
						<img className="closedIcon svgIcon" src={minusIcon} alt="Collapse Description" />
					</button>
				) : null}
			</div>
		</li>
	);
};

export default Card;
