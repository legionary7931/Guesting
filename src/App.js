import './App.css';
import Login from './pages/Login';
import Team from './pages/Team';
import Create from './pages/Create';
import Application from './pages/Application';
import Guesting from './pages/Guesting';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './layouts/Header';
import BodyContainer from './layouts/BodyContainer';
import { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
	<div className = "App">
		<Router>
			{isAuthenticated ? (
			<div>
				<Header />
				<BodyContainer>
					<Routes>
						<Route path="/team" element={<Team />} />
						<Route path="/team/create" element={<Create/>}/>
						<Route path="/team/application" element={<Application/>} />
						<Route path="/team/guesting" element={<Guesting />} />
						<Route path="*" element={<Navigate replace to="/team" />} />
					</Routes>
				</BodyContainer>
			</div>
			) : (
			<Login onLogin={() => setIsAuthenticated(true)} />
			)}
	  </Router>
	</div>
	);
}

export default App;
