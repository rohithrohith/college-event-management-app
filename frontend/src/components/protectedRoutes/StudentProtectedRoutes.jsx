import { Outlet, Navigate } from 'react-router-dom';

function StudentProtectedRoutes({ user }) {
	if (user === 'STUDENT') return <Outlet />;
	else if (user === 'MODERATOR')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user === 'ADMIN')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user) return <Navigate to='/unauthorized' replace={true} />;
}

export default StudentProtectedRoutes;
