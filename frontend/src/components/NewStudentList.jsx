import axios from 'axios';
import { displayMsg } from '../utils';

function NewStudentList({ style, student }) {
	const acceptStudent = async (id) => {
		try {
			const res = await axios.put(
				'http://localhost:5500/api/students/approve/' + id,
				{ isApproved: true },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			displayMsg('Student Approved');
		} catch (err) {
			displayMsg(err.message);
		}
	};
	const rejectStudent = async (id) => {
		try {
			const res = await axios.delete(
				'http://localhost:5500/api/students/reject/' + id,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			console.log(res);
		} catch (err) {
			displayMsg(err.response.data.message);
		}
	};
	return (
		<>
			<div className={style.new_student} key={student.id}>
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
						className={`${style.accept_btn} ${style.action_btn}`}
						onClick={() => {
							acceptStudent(student._id);
						}}
					>
						Accept
					</button>
					<button
						className={`${style.reject_btn} ${style.action_btn}`}
						onClick={() => {
							rejectStudent(student._id);
						}}
					>
						Reject
					</button>
				</div>
			</div>
		</>
	);
}

export default NewStudentList;
