import { useDispatch, connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions';

function Pagination({ limit, total, s = {} }) {
	const dispatch = useDispatch();
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(total / limit); i++) {
		pageNumbers.push(i);
	}
	const changePage = (e) => {
		window.location.hash = `#page${e.target.textContent}`;
		dispatch(getEvents({ page: parseInt(e.target.textContent), limit: limit }));
	};
	return (
		<>
			<ul className={s.page_list}>
				{pageNumbers.map((page, index) => (
					<button onClick={changePage} className={s.page_btn} key={index}>
						<li className={s.page_number}>{page}</li>
					</button>
				))}
			</ul>
		</>
	);
}

export default connect(null, { getEvents })(Pagination);
