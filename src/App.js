import React from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Recomendations from './components/Recomendations.js';
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

	API_URL = 'https://listen-api.listennotes.com/api/v2/';
	API_KEY = '576ca4c5e0c347949c82d6b8f674a9cc';

	// Handle form submit by making an api call based on user input, then resets user input
	handleSubmit = e => {
		e.preventDefault();
		this.fetchSearchData(this.state.podcastInput);
		this.setState({
			podcastInput: '',
		});
	};

	// When user types into search box, state is updated with new value
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	// Async function to search for a podcast.
	// TODO: Need to implement Error Handling.
	async fetchSearchData(input) {
		try {
			const apiData = await axios.get(`${this.API_URL}search`, {
				headers: {
					'X-ListenAPI-Key': this.API_KEY,
				},
				params: {
					q: input,
					type: 'podcast',
				},
			});
			// retrieves the id for the podcast which can be used to get recommendations
			console.log(apiData);
			const podcastID = apiData.data.results[0].id;
			const recommendations = this.fetchRecommendationData(podcastID);
			// once the recommendations have been received, set the state with the recommendation list
			recommendations.then(result => {
				this.setState({
					searchedPodcast: apiData.data.results[0],
					recommendationsList: result,
				});
			});
		} catch (err) {
			console.log(err);
		}
	}

	// Using ID from previous API call, fetch recommendation data from Listen Notes API
	async fetchRecommendationData(id) {
		try {
			const apiData = await axios.get(`${this.API_URL}podcasts/${id}/recommendations`, {
				headers: {
					'X-ListenAPI-Key': this.API_KEY,
				},
				params: {
					id: id,
				},
			});
			const recommendations = apiData.data.recommendations;
			// return recommendations once they've been received
			return recommendations;
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className="App">
				<Header />

				<main>
					<Search
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
						podcastInput={this.state.podcastInput}
					/>

					{/* When a recommendations liste exists, print recommendations to screen */}
					{this.state.recommendationsList.length !== 0 ? (
						<Recomendations
							recommendationsList={this.state.recommendationsList}
							searchedPodcast={this.state.searchedPodcast}
						/>
					) : null}
				</main>

				<Footer />
			</div>
		);
	}
}

export default App;
