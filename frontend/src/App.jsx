import { BrowserRouter as Router } from 'react-router-dom';
import Toast from './components/Toast';
import AppRoutes from './components/Routes';

function App() {
	return (
		<Router>
			<div className='App'>
				<div className='content'>
					<AppRoutes />
				</div>
				<Toast />
			</div>
		</Router>
	);
}

export default App;

// <Routes>
// 	<Route exact path='/' element={<Landing />}></Route>
// 	<Route exact path='/register' element={<Register />}></Route>
// 	<>
// 		<Navbar />
// 	</>
// 	<Route exact path='/verify/:mail' element={<OtpVerify />}></Route>
// 	<Route exact path='/home' element={<Home />}></Route>
// 	<Route exact path='/profile' element={<Profile />}></Route>
// 	<Route exact path='/students' element={<Students />}></Route>
// 	<Route
// 		exact
// 		path='/participated'
// 		element={<ParticipatedEvents />}
// 	></Route>
// 	<Route exact path='/event/:id' element={<Event />}></Route>

// 	{/* ADMIN ROUTES */}
// 	<Route exact path='/admin' element={<AdminHome />}></Route>
// 	<Route exact path='/admin/add' element={<AddEvent />}></Route>
// 	<Route
// 		exact
// 		path='/admin/addmod'
// 		element={<AddModerator />}
// 	></Route>
// 	<Route
// 		exact
// 		path='/admin/update/:id'
// 		element={<UpdateEvent />}
// 	></Route>
// 	<Route path='*' element={<Error404 />}></Route>
// </Routes>
