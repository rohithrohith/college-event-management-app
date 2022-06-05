import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

function StudentNavbar() {
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
						<li className='nav-item'>
							<Link to='/register' className='link'>
								Your events
							</Link>
						</li>
						<li className='nav-item'>
							<div className='link'>
								<FaUserCircle style={{ fontSize: '18px', marginTop: '2px' }} />
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default StudentNavbar;
