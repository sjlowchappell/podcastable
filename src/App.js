import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer.js';
import LoadingCircle from './components/LoadingCircle';

class App extends Component {
	constructor() {
		super();
		this.state = {
			podcastInput: '',
			searchedPodcast: {},
			recommendationsList: [],
			emptyResults: false,
			isSubmitted: false,
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
			recommendationsList: [],
			emptyResults: false,
			isSubmitted: true,
		});
	};

	// When user types into search box, state is updated with new value
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	resetButton = e => {
		this.setState({
			podcastInput: '',
			searchedPodcast: {},
			recommendationsList: [],
			emptyResults: false,
			isSubmitted: false,
		});
	};

	// Async function to search for a podcast.
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
			// conditional checks if the call returns results. If it doesn't, sets empty results to true so that an error message will be printed in the results section
			if (apiData.data.count !== 0) {
				// retrieves the id for the podcast which can be used to get recommendations
				const podcastID = apiData.data.results[0].id;
				const recommendations = this.fetchRecommendationData(podcastID);
				// once the recommendations have been received, set the state with the recommendation list
				recommendations.then(result => {
					this.setState({
						searchedPodcast: apiData.data.results[0],
						recommendationsList: result,
					});
				});
			} else {
				this.setState({
					emptyResults: true,
				});
			}
		} catch (err) {
			this.setState({
				emptyResults: true,
			});
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
			this.setState({
				emptyResults: true,
			});
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

					{/* On submit, display CSS Loader. Replace with the below when finished */}
					{/* CSS loader taken directly from: https://loading.io/css/ */}
					{this.state.isSubmitted === true &&
					this.state.recommendationsList.length === 0 &&
					this.state.emptyResults === false ? (
						<LoadingCircle />
					) : null}

					{/* When a recommendations list exists, or no results were returned, print recommendations (or error message) to screen */}
					{this.state.recommendationsList.length !== 0 || this.state.emptyResults ? (
						<Recommendations
							recommendationsList={this.state.recommendationsList}
							searchedPodcast={this.state.searchedPodcast}
							emptyResults={this.state.emptyResults}
							handleClick={this.resetButton}
						/>
					) : null}
				</main>

				<Footer />
			</div>
		);
	}
}

export default App;
