import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function StudentList({ style }) {
	const showDetails = (id) => {
		document
			.getElementById(`details-${id}`)
			.classList.toggle(style.show_participated_events);
	};
	return (
		<div className={style.student_list}>
			<div className={style.student}>
				<div className={style.student_head}>
					<span style={{ fontWeight: 'bold' }}>Name</span>
					<div className={style.student_actions}>
						<button
							className={`${style.action_btn} ${style.student_action_btn}`}
							onClick={() => showDetails(123)}
						>
							Participation details{' '}
							<FaChevronDown style={{ marginLeft: '5px' }} />
						</button>
					</div>
				</div>
				<div className={style.participated_events} id='details-123'>
					<ol className={style.events_list}>
						<h4>Participated Events</h4>
						<li>
							<Link to='/event/1' className={style.participated_event}>
								Event 1
							</Link>
						</li>
						<li>
							<Link to='/event/2' className={style.participated_event}>
								Event 2
							</Link>
						</li>
						<li>
							<Link to='/event/3' className={style.participated_event}>
								Event 3
							</Link>
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
}
export default StudentList;
