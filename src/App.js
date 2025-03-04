import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
