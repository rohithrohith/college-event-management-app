import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Event from '../pages/Event';
import ParticipatedEvents from '../pages/ParticipatedEvents';
import Students from '../pages/Students';
import AdminHome from '../pages/AdminHome';
import AddEvent from '../pages/AddEvent';
import Error404 from '../pages/error-pages/Error404';
import Unauth from '../pages/error-pages/Unauth';
import AddModerator from '../pages/AddModerator';
import OtpVerify from '../pages/OtpVerify';
import Home from '../pages/Home';
import WithNav from './WithNav';
import WithOutNav from './WithOutNav';
import StudentProtectedRoutes from './protectedRoutes/StudentProtectedRoutes';
import ModeratorProtectedRoutes from './protectedRoutes/ModeratorProtectedRoutes';
import AdminProtectedRoutes from './protectedRoutes/AdminProtectedRoutes';
import { getUser } from '../actions/authActions';

import { useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';

function AppRoutes() {
	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem('token')) dispatch(getUser());
	}, []);
	const user = useSelector((state) => state.user.currentUser);
	if (
		user.role === 'STUDENT' ||
		user.role === 'ADMIN' ||
		user.role === 'MODERATOR' ||
		user.role === ' '
	) {
		return (
			<Routes>
				<Route element={<WithOutNav />}>
					<Route exact path='/' element={<Landing />}></Route>
					<Route exact path='/register' element={<Register />}></Route>
					<Route exact path='/verify/:mail' element={<OtpVerify />}></Route>
					<Route path='*' element={<Error404 />}></Route>
					<Route path='/unauthorized' element={<Unauth />}></Route>
				</Route>
				<Route element={<WithNav />}>
					<Route element={<StudentProtectedRoutes user={user.role} />}>
						<Route
							exact
							path='/participated'
							element={<ParticipatedEvents />}
						></Route>
					</Route>
					<Route element={<ModeratorProtectedRoutes user={user.role} />}>
						<Route exact path='/students' element={<Students />}></Route>
					</Route>
					<Route exact path='/home' element={<Home />}></Route>
					<Route exact path='/event/:id' element={<Event />}></Route>

					{/* ADMIN ROUTES */}
					<Route element={<AdminProtectedRoutes user={user.role} />}>
						<Route exact path='/admin' element={<AdminHome />}></Route>
						<Route exact path='/admin/add' element={<AddEvent />}></Route>
						<Route
							exact
							path='/admin/addmod'
							element={<AddModerator />}
						></Route>
					</Route>
				</Route>
			</Routes>
		);
	}
}

export default connect(null, { getUser })(AppRoutes);
