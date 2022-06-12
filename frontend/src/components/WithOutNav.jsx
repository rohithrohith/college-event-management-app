import { Outlet } from 'react-router-dom';

function WithOutNav() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default WithOutNav;
