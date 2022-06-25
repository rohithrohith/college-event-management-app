import { Outlet, Navigate } from 'react-router-dom';

function AdminProtectedRoutes({ user }) {
	if (user === 'ADMIN') return <Outlet />;
	else if (user === 'STUDENT')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (user === 'MODERATOR')
		return <Navigate to='/unauthorized' replace={true} />;
	else if (!user) return <Navigate to='/unauthorized' replace={true} />;
}

export default AdminProtectedRoutes;
