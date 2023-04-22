import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
	return (
		<div className="Home">
			<h1>Examples</h1>
			<ul>
				<li>
					<Link to="/debouncedCallback">Debounced callback</Link>
				</li>
				<li>
					<Link to="/debouncedEffect">Debounced effect</Link>
				</li>
				<li>
					<Link to="/naive">Naive</Link>
				</li>
			</ul>
		</div>
	);
}
