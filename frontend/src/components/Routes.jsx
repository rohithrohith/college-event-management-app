import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Event from '../pages/Event';
import ParticipatedEvents from '../pages/ParticipatedEvents';
import Students from '../pages/Students';
import AdminHome from '../pages/AdminHome';
import AddEvent from '../pages/AddEvent';
import UpdateEvent from '../pages/UpdateEvent';
import Error404 from '../pages/Error404';
import AddModerator from '../pages/AddModerator';
import Home from '../pages/Home';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path='/' element={<Landing />}></Route>
			<Route exact path='/home' element={<Home />}></Route>
			<Route exact path='/register' element={<Register />}></Route>
			<Route exact path='/profile' element={<Profile />}></Route>
			<Route exact path='/students' element={<Students />}></Route>
			<Route
				exact
				path='/participated'
				element={<ParticipatedEvents />}
			></Route>
			<Route exact path='/event/:id' element={<Event />}></Route>

			{/* ADMIN ROUTES */}
			<Route exact path='/admin' element={<AdminHome />}></Route>
			<Route exact path='/admin/add' element={<AddEvent />}></Route>
			<Route exact path='/admin/addmod' element={<AddModerator />}></Route>
			<Route exact path='/admin/update/:id' element={<UpdateEvent />}></Route>
			<Route path='*' element={<Error404 />}></Route>
		</Routes>
	);
}

export default AppRoutes;
