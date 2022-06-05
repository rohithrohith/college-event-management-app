function NewStudentList({ style }) {
	const acceptStudent = () => {
		console.log('Student accepted!');
	};
	const rejectStudent = () => {
		console.log('Student rejected!');
	};
	return (
		<div className={style.student_list}>
			<div className={style.new_student}>
				<div className={style.student_details}>
					<span style={{ fontWeight: 'bold' }}>Name</span>
				</div>
				<div className={style.student_actions}>
					<button
						className={`${style.accept_btn} ${style.action_btn}`}
						onClick={acceptStudent}
					>
						Accept
					</button>
					<button
						className={`${style.reject_btn} ${style.action_btn}`}
						onClick={rejectStudent}
					>
						Reject
					</button>
				</div>
			</div>
		</div>
	);
}

export default NewStudentList;
