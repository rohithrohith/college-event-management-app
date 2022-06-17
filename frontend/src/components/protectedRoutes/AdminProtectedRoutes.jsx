import { Outlet, Navigate } from 'react-router-dom';

function AdminProtectedRoutes({ user }) {
	if (user.role === 'ADMIN') return <Outlet />;
	else if (user.role === 'STUDENT')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user.role === 'MODERATOR')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user.role) return <Navigate to='/unauthorized' replace={true} />;
}

export default AdminProtectedRoutes;
