import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../css/navbar.css';

function ModeratorNavbar() {
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
								Students
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/register' className='link'>
								Add Moderator
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/register' className='link'>
								Analytics
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/register' className='link'>
								<FaUserCircle style={{ fontSize: '18px', marginTop: '2px' }} />
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default ModeratorNavbar;
