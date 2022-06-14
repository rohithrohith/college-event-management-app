import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function StudentList({ style, student }) {
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
				<ol className={style.events_list}>
					<h4>Participated Events</h4>
					{student.participated_event &&
						student.participated_event.map((event) => (
							<li>
								<Link to='/event/1' className={style.participated_event}>
									event.title
								</Link>
							</li>
						))}
					{!student.participated_event && (
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
