import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
	return (
		<div className="Home">
			<h1>IronProfile</h1>
			<p>Today we will create an app with authorization, adding some cool styles!</p>
			<Link to="/signup">Signup</Link>
			<br/>
			<Link to="/login">Login</Link>
		</div>
	);
};

export default Home;