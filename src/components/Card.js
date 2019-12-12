import React, { Component } from 'react';
import cardStyles from './card.module.css';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';

class Card extends Component {
	constructor() {
		super();
		this.state = {
			description: 'closed',
		};
	}
	expandDescription = () => {
		this.state.description === 'closed'
			? this.setState({ description: 'open' })
			: this.setState({ description: 'closed' });
	};
	largeDescription = podcastDescription => {
		if (this.state.description === 'closed') {
			return (
				<>
					<p className="descriptionClosed">
						{/* regex included here because description is sometimes encapsulated in HTML tags and entities. */}
						{podcastDescription}
					</p>
					<button className={cardStyles.cardDescriptionExpandButton} onClick={this.expandDescription}>
						<img className="svgIcon" src={plusIcon} alt="Expand Description" />
					</button>
				</>
			);
		} else {
			return (
				<>
					<p className="descriptionOpen">
						{/* regex included here because description is sometimes encapsulated in HTML tags and entities. */}
						{podcastDescription}
					</p>
					<button className={cardStyles.cardDescriptionExpandButton} onClick={this.expandDescription}>
						<img className="svgIcon" src={minusIcon} alt="Collapse Description" />
					</button>
				</>
			);
		}
	};
	render() {
		const { podcast } = this.props;
		const podcastDescription = podcast.description.replace(/<[^>]+>/g, '').replace(/&#{0,1}[a-z0-9]+;/gi, ' ');
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
					{/* if the description is too long, add a button to expand it */}
					{podcastDescription.length > 175 ? (
						this.largeDescription(podcastDescription)
					) : (
						<p className="descriptionClosed">{podcastDescription}</p>
					)}
				</div>
			</li>
		);
	}
}

export default Card;
