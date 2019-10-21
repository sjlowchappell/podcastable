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
			const apiData = await axios.get(`${this.API_URL}search`, {
				headers: {
					'X-ListenAPI-Key': this.API_KEY,
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
			});
		} catch (err) {
			console.log(err);
		}
	}

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

					<section id="results">
						{this.state.recommendationsList.length !== 0 ? (
							<Recomendations
								recommendationsList={this.state.recommendationsList}
								searchedPodcast={this.state.searchedPodcast}
							/>
						) : null}
					</section>
				</main>

				<Footer />
			</div>
		);
	}
}

export default App;
