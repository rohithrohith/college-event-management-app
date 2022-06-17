import { Outlet, Navigate } from 'react-router-dom';

function StudentProtectedRoutes({ user }) {
	if (user.role === 'STUDENT') return <Outlet />;
	else if (user.role === 'MODERATOR')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user.role === 'ADMIN')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user.role) return <Navigate to='/unauthorized' replace={true} />;
}

export default StudentProtectedRoutes;
