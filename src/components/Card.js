import React, { Component } from 'react';
import styles from './card.module.css';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import PropTypes from 'prop-types';

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
					<button className={styles.cardDescriptionExpandButton} onClick={this.expandDescription}>
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
					<button className={styles.cardDescriptionExpandButton} onClick={this.expandDescription}>
						<img className="svgIcon" src={minusIcon} alt="Collapse Description" />
					</button>
				</>
			);
		}
	};
	render() {
		const { podcast } = this.props;
		const { website, image, title, publisher, description } = podcast;
		const podcastDescription = description.replace(/<[^>]+>/g, '').replace(/&#{0,1}[a-z0-9]+;/gi, ' ');
		return (
			<li className={styles.card}>
				<div className={styles.cardHeading}>
					<a href={website} className={styles.cardThumbnail}>
						<img src={image} alt={`Thumbnail for the ${title} podcast`} />
					</a>
					<div className={styles.cardTitle}>
						<a href={website}>
							<h2>{title}</h2>
						</a>
						<p className={styles.cardSubtitle}>{publisher}</p>
					</div>
				</div>
				<div className={styles.cardDescription}>
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

Card.propTypes = {
	podcast: PropTypes.object,
};

export default Card;
