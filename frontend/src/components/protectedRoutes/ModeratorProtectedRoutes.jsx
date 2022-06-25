import { Outlet, Navigate } from 'react-router-dom';

function ModeratorProtectedRoutes({ user }) {
	if (user === 'MODERATOR') return <Outlet />;
	else if (user === 'STUDENT')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user === 'ADMIN')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user) return <Navigate to='/unauthorized' replace={true} />;
}

export default ModeratorProtectedRoutes;
