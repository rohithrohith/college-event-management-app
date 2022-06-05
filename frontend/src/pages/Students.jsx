import s from '../css/students.module.css';
import NewStudentList from '../components/NewStudentList';
import StudentList from '../components/StudentList';

function Students() {
	return (
		<div>
			<h1>CSE Students</h1>
			<div className={s.new_students_section}>
				<h3 style={{ margin: '10px 0', color: 'var(--primary)' }}>
					New Student requests
				</h3>
				<NewStudentList style={s} />
				<h3 style={{ color: 'var(--primary)', margin: '10px 0' }}>
					Student details
				</h3>
				<StudentList style={s} />
			</div>
		</div>
	);
}

export default Students;
