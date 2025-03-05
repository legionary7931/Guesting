import './App.css';
import Login from './pages/Login';
import Team from './pages/Team';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/team" element={<Team />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
