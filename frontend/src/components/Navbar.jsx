import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getStudent } from '../actions/authActions';

function Navbar() {
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getStudent());
	}, []);

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
						{user && user.role === 'moderator' && (
							<li className='nav-item'>
								<Link to='/register' className='link'>
									Students
								</Link>
							</li>
						)}
						{user && user.role === 'admin' && (
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
						{user && user.role === 'student' && (
							<>
								<li className='nav-item'>
									<Link to='/register' className='link'>
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
											<hr />
											<Link to='/register' className='logout-link'>
												Logout
											</Link>
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

export default connect(null, { getStudent })(Navbar);
