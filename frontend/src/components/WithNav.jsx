import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function WithNav() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

export default WithNav;
