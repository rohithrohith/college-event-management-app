// import { useParams } from 'react-router-dom';
import s from '../css/event.module.css';
import { Link } from 'react-router-dom';

function Event() {
	// const { id } = useParams();
	return (
		<div>
			<h1 className={s.event_title}>Event title</h1>
			<hr className={s.divider} />
			<div className={s.date}>
				<i>Event on: 12-08-2001</i>
			</div>
			<div className={s.date}>
				<i>Last date to register: 06-08-2001</i>
			</div>
			<div className={s.event_desc}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla illo
				optio explicabo reprehenderit corrupti adipisci. Maiores minima illo
				optio beatae odio! Fugit quo, minus consectetur odio ad quas, soluta
				cumque quos asperiores aliquam sed aliquid in possimus nostrum
				doloremque deserunt enim inventore voluptatibus! Ut quidem quas
				architecto ipsa ducimus explicabo deserunt ea veniam, alias accusantium,
				vero amet, delectus sapiente nemo fuga culpa illum provident minus
				officia eos doloremque? Possimus veniam alias fugiat aperiam dolores ut
				dicta aspernatur corrupti natus aliquam veritatis debitis nam quisquam,
				cum sint asperiores quasi eligendi iste voluptatem id tenetur minus
				quae! Commodi cumque natus minima error?
			</div>
			<Link to='/' className={s.register_btn}>
				Register
			</Link>
		</div>
	);
}

export default Event;
