import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { DebouncedCallback } from './examples/DebouncedCallback';
import { DebouncedEffect } from './examples/DebouncedEffect';
import { Naive } from './examples/Naive';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="debouncedCallback" element={<DebouncedCallback />} />
				<Route path="debouncedEffect" element={<DebouncedEffect />} />
				<Route path="naive" element={<Naive />} />
			</Routes>
		</div>
	);
}

export default App;
