import { useDispatch, connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';

function Pagination({ limit, total, s = {} }) {
	const dispatch = useDispatch();
	const pageNumbers = [];
	let prevPage = 1;
	for (let i = 1; i <= Math.ceil(total / limit); i++) {
		pageNumbers.push(i);
	}
	const changePage = (e) => {
		if (prevPage !== parseInt(e.target.textContent)) {
			document
				.getElementById(`page-${prevPage}`)
				.classList.remove(`${s.current_page}`);
			document
				.getElementById(`page-${e.target.textContent}`)
				.classList.add(`${s.current_page}`);
			prevPage = parseInt(e.target.textContent);
			window.location.hash = `#page${e.target.textContent}`;
			dispatch(
				getEvents({ page: parseInt(e.target.textContent), limit: limit })
			);
		}
	};
	return (
		<>
			<ul className={s.page_list}>
				{pageNumbers.map((page, index) => {
					if (page === 1) {
						return (
							<button
								onClick={changePage}
								className={`${s.page_btn} ${s.current_page}`}
								id={`page-${page}`}
								key={index}
							>
								<li className={s.page_number}>{page}</li>
							</button>
						);
					}
				})}
			</ul>
		</>
	);
}

export default connect(null, { getEvents })(Pagination);
