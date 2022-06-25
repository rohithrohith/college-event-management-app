import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function StudentList({ style, student }) {
	console.log(student.participatedEvents);
	const showDetails = ({ id }) => {
		document
			.getElementById(`details-${id}`)
			.classList.toggle(style.show_participated_events);
	};
	return (
		<div className={style.student}>
			<div className={style.student_head}>
				<div className={style.student_details}>
					<span
						style={{
							fontWeight: 'bold',
							fontSize: '15px',
							textTransform: 'capitalize',
						}}
					>
						{student.name}
					</span>
					<span style={{ marginLeft: '20px' }}>-{student.email}</span>
				</div>
				<div className={style.student_actions}>
					<button
						className={`${style.action_btn} ${style.student_action_btn}`}
						onClick={() => showDetails({ id: student._id })}
					>
						Participation details{' '}
						<FaChevronDown style={{ marginLeft: '5px' }} />
					</button>
				</div>
			</div>
			<div className={style.participated_events} id={`details-${student._id}`}>
				<h4
					style={{
						borderTop: '1px solid var(--dark)',
						borderBottom: '1px solid var(--dark)',
						padding: '5px 0',
						marginTop: '2px',
					}}
				>
					Participated Events
				</h4>
				<ol className={style.events_list}>
					{student.participatedEvents.length !== 0 &&
						student.participatedEvents.map((event) => (
							<li key={event._id}>
								<Link
									to={`/event/${event._id}`}
									className={style.participated_event}
								>
									{event.title}
								</Link>
							</li>
						))}
					{student.participatedEvents.length === 0 && (
						<h5 style={{ color: 'grey' }}>
							Haven't participated in any events!
						</h5>
					)}
				</ol>
			</div>
		</div>
	);
}
export default StudentList;
