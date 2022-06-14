import s from '../css/students.module.css';
import NewStudentList from '../components/NewStudentList';
import StudentList from '../components/StudentList';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBranchStudents } from '../actions/studentsActions';

function Students() {
	const students = useSelector((state) => state.students);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBranchStudents(user.branch));
	}, [students]);

	return (
		<div>
			<h1>{user.branch} Students</h1>
			<div className={s.new_students_section}>
				<h3 style={{ margin: '10px 0' }}>New Student requests</h3>
				{!students.newStudents && (
					<h3 style={{ color: 'grey', fontSize: '30px' }}>
						No new students registered!
					</h3>
				)}
				{students.newStudents && (
					<div className={s.student_list}>
						{students.newStudents.map((student) => (
							<NewStudentList style={s} student={student} key={student._id} />
						))}
					</div>
				)}
			</div>
			<div className={s.approved_sudent_section}>
				<h3 style={{ margin: '10px 0' }}>Student details</h3>
				{students.approvedStudents && (
					<div className={s.student_list}>
						{students.approvedStudents.map((student) => (
							<StudentList style={s} student={student} key={student._id} />
						))}
					</div>
				)}

				{!students.approvedStudents && (
					<h3 style={{ color: 'grey', fontSize: '30px' }}>
						No students from your branch!
					</h3>
				)}
			</div>
		</div>
	);
}

export default connect(null, { getBranchStudents })(Students);
