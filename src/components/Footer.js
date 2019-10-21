import React from 'react';
import apiLogo from '../assets/api-logo.png';

const Footer = () => {
	return (
		<footer>
			<div className="wrapper">
				<a href="https://www.listennotes.com/api/docs/" className="apiLogo">
					<img src={apiLogo} alt="Listen Notes API Logo: Powered by Listen Notes" />
				</a>
				<p>© {new Date().getFullYear()} Sam Low-Chappell</p>
			</div>
		</footer>
	);
};

export default Footer;
