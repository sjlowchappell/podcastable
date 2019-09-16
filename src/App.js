import React from 'react';
import './App.css';
import axios from 'axios';
import Recomendations from './components/Recomendations.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			podcastInput: '',
			searchedPodcast: {},
			recommendationsList: [],
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.fetchSearchData(this.state.podcastInput);
		this.setState({
			podcastInput: '',
		});
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	async fetchSearchData(input) {
		try {
			const apiData = await axios.get('https://listen-api.listennotes.com/api/v2/search', {
				headers: {
					'X-ListenAPI-Key': '576ca4c5e0c347949c82d6b8f674a9cc',
				},
				params: {
					q: input,
					type: 'podcast',
				},
			});
			const results = apiData.data.results[0].id;
			const recommendations = this.fetchRecommendationData(results);
			recommendations.then(result => {
				this.setState({
					searchedPodcast: apiData.data.results[0],
					recommendationsList: result,
				});
				document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
			});
		} catch (err) {
			console.log(err);
		}
	}

	async fetchRecommendationData(id) {
		try {
			const apiData = await axios.get(
				`https://listen-api.listennotes.com/api/v2/podcasts/${id}/recommendations`,
				{
					headers: {
						'X-ListenAPI-Key': '576ca4c5e0c347949c82d6b8f674a9cc',
					},
					params: {
						id: id,
					},
				},
			);
			const recommendations = apiData.data.recommendations;
			return recommendations;
		} catch (err) {
			console.log(err);
		}
	}

	renderPodcasts() {
		const { recommendationsList, searchedPodcast } = this.state;
		if (recommendationsList.length !== 0) {
			return <Recomendations recommendationsList={recommendationsList} searchedPodcast={searchedPodcast} />;
		}
	}

	render() {
		return (
			<div className="App">
				<Header />

				<section id="search" class="searchSection">
					<div className="wrapper">
						<svg class="podSVG" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
							<path d="m512 256c0-68.378906-26.628906-132.667969-74.980469-181.019531-48.351562-48.351563-112.636719-74.980469-181.019531-74.980469-68.378906 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 104.746094 64.132812 198.921875 160.664062 237.652344v3.347656c0 8.285156 6.71875 15 15 15h160.671876c8.28125 0 15-6.714844 15-15v-3.347656c96.53125-38.730469 160.664062-132.90625 160.664062-237.652344zm-204.71875 80.332031c26.472656-16.957031 44.054688-46.628906 44.054688-80.332031 0-52.566406-42.769532-95.335938-95.335938-95.335938s-95.335938 42.769532-95.335938 95.335938c0 33.703125 17.582032 63.375 44.054688 80.332031-14.460938 9.261719-26.261719 22.320313-33.996094 37.753907-37.617187-27.207032-60.386718-71.023438-60.386718-118.085938 0-80.320312 65.34375-145.667969 145.664062-145.667969s145.664062 65.347657 145.664062 145.667969c.003907 47.0625-22.765624 90.878906-60.386718 118.089844-7.734375-15.4375-19.535156-28.496094-33.996094-37.757813zm-116.617188-80.332031c0-36.023438 29.3125-65.335938 65.335938-65.335938s65.335938 29.3125 65.335938 65.335938-29.3125 65.332031-65.335938 65.332031-65.335938-29.308593-65.335938-65.332031zm130.671876 226h-130.671876v-65.335938c0-36.023437 29.3125-65.332031 65.335938-65.332031s65.335938 29.308594 65.335938 65.332031zm30-21.027344v-44.308594c0-4.261718-.289063-8.457031-.832032-12.574218 50.324219-32.160156 81.164063-87.929688 81.160156-148.089844 0-96.863281-78.800781-175.667969-175.664062-175.667969s-175.664062 78.804688-175.664062 175.667969c0 60.160156 30.839843 115.929688 81.160156 148.089844-.546875 4.117187-.832032 8.3125-.832032 12.574218v44.308594c-78.960937-36.75-130.664062-116.597656-130.664062-204.972656 0-124.617188 101.382812-226 226-226s226 101.382812 226 226c0 88.375-51.703125 168.222656-130.664062 204.972656zm0 0" />
						</svg>
						<p>
							Have a favorite podcast? Want to find more podcasts with a similar sound, production value,
							or vibe? With Podcastable, you can search your favorite podcast to find a list of other
							recommended podcasts.
						</p>

						<form className="podcastSubmitContainer" onSubmit={this.handleSubmit}>
							<label for="podcastInput">Enter the name of your favorite podcast below:</label>
							<input
								type="text"
								placeholder="StartUp"
								name="podcastInput"
								onChange={this.handleChange}
								value={this.state.podcastInput}
								id="podcastInput"
								className="podcastSubmitInput"
							/>
							<input className="podcastSubmitButton" type="submit" value="Submit" />
						</form>
					</div>
				</section>

				<section id="results">
					<div className="wrapper">{this.renderPodcasts()}</div>
				</section>

				<Footer />
			</div>
		);
	}
}

export default App;

// Question to ask:

// Why does my e.target select the elements within my anchor but not my anchor tag itself? How can I select the anchor tag so that I can make this scaleable? LOOK INTO REFS

// Also, I installed a smooth scroll thing and then figured out a way to do it myself. How do I uninstall the things I don't need?
