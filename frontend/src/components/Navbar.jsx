import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getUser } from '../actions/authActions';

function Navbar() {
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		window.location.pathname = '/';
	};

	const toggleLogout = () => {
		document.getElementById('logout').classList.toggle('show-logout');
	};

	return (
		<div className='navbar-container'>
			<nav className='navbar'>
				<div className='navbar-left'>
					<Link
						to='/home'
						style={{
							fontSize: '18px',
							color: 'var(--primary)',
							fontWeight: 'bold',
						}}
					>
						College Event Management
					</Link>
				</div>
				<div className='navbar-right'>
					<ul className='nav-list'>
						{user && user.role === 'MODERATOR' && (
							<li className='nav-item'>
								<Link to='/students' className='link'>
									Students
								</Link>
							</li>
						)}
						{user && user.role === 'ADMIN' && (
							<>
								<li className='nav-item'>
									<Link to='/register' className='link'>
										Add moderator
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/register' className='link'>
										Add events
									</Link>
								</li>
							</>
						)}
						{user && user.role === 'STUDENT' && (
							<>
								<li className='nav-item'>
									<Link to='/participated' className='link'>
										Participated events
									</Link>
								</li>
							</>
						)}

						{user && (
							<>
								<li className='nav-item'>
									<div className='profile' onClick={toggleLogout}>
										{user && user.name}
										<div className='logout' id='logout'>
											<FaUserCircle
												style={{
													fontSize: '18px',
													marginTop: '2px',
													marginRight: '5px',
												}}
											/>
											<span style={{ margin: '2px 0', display: 'block' }}>
												{user && user.role}
											</span>
											<hr />
											<button
												type='button'
												to='/register'
												className='logout-btn'
												onClick={logout}
											>
												Logout
											</button>
										</div>
									</div>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default connect(null, { getUser })(Navbar);
