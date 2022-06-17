import { Outlet, Navigate } from 'react-router-dom';

function ModeratorProtectedRoutes({ user }) {
	if (user.role === 'MODERATOR') return <Outlet />;
	else if (user.role === 'STUDENT')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user.role === 'ADMIN')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user.role) return <Navigate to='/unauthorized' replace={true} />;
}

export default ModeratorProtectedRoutes;
