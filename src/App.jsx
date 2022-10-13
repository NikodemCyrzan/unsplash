import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Main } from './sites/Main';
import { Photos } from './sites/Photos';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Main />}/>
				<Route path='/photos/:query' element={<Photos />}/>
				<Route path='*' />
			</Routes>
		</>
	);
}

export default App;
