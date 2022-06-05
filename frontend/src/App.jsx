import StudentNavbar from './components/StudentNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/Routes';

function App() {
	const displayNavbar = () => {
		return (
			document.location.pathname !== '/register' &&
			document.location.pathname !== '/' && <StudentNavbar />
		);
	};
	return (
		<Router>
			<div className='App'>
				{displayNavbar()}
				<div className='content'>
					<AppRoutes />
				</div>
			</div>
		</Router>
	);
}

export default App;
