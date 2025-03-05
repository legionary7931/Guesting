import './App.css';
import Login from './pages/Login';
import Team from './pages/Team';

import { BrowserRouter as Router } from "react-router-dom";
import Header from './layouts/Header';
import BodyContainer from './layouts/BodyContainer';
import { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [activeComponent, setActiveComponent] = useState(<Team />); // 기본 화면을 Team으로 설정
	return (
	<div className = "App">
		<Router>
			{isAuthenticated ? (
			<div>
				<Header setActiveComponent={setActiveComponent} />
				<BodyContainer activeComponent={activeComponent} />
			</div>
			) : (
			<Login onLogin={() => setIsAuthenticated(true)} />
			)}
	  </Router>
	</div>
	);
}

export default App;
