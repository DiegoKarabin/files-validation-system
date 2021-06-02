import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Symfoni } from "./hardhat/SymfoniContext";
import { FileValidator } from './components/FileValidation';

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<Symfoni autoInit={true} >
					<img src={logo} style={{width: '10rem', height: 'auto'}} alt="logo" />
					<FileValidator/>
				</Symfoni>
			</header>
		</div>
	);
}

export default App;
