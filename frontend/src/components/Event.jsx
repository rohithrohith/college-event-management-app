import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

function Event({ style, event }) {
	return (
		<div className={style.event_card}>
			<img src='/event.jpg' alt='Event title' className={style.event_thumb} />
			<div className={style.event_details}>
				<div className={style.event_content}>
					<h3 className={style.event_title}>{event.title}</h3>
					<p className={style.event_desc}>{event.description}</p>
				</div>
				<Link to={`/event/${event._id}`} className={style.read_more_btn}>
					Read more <FaChevronRight className={style.event_icon} />
				</Link>
			</div>
		</div>
	);
}

export default Event;
