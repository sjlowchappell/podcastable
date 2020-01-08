import React from 'react';
import styles from './footer.module.css';
import apiLogo from '../assets/api-logo.png';

const Footer = () => {
	return (
		<footer>
			<div className="wrapper">
				<a href="https://www.listennotes.com/api/docs/" className={styles.apiLogo}>
					<img src={apiLogo} alt="Listen Notes API Logo: Powered by Listen Notes" />
				</a>
				<p>
					© {new Date().getFullYear()} designed and built by{' '}
					<a className={styles.nameLink} href="https://samlow-chappell.com">
						Sam Low-Chappell
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
