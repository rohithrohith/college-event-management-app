import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

function Event({ style }) {
	return (
		<div className={style.event_card}>
			<img src='/event.jpg' alt='Event title' className={style.event_thumb} />
			<div className={style.event_details}>
				<div className={style.event_content}>
					<h3 className={style.event_title}>
						Event hshud shjhds dsjdjds dsjsdjs dksjd
					</h3>
					<p className={style.event_desc}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
						perspiciatis voluptas soluta dolorum dolore ut veniam neque
						nihil?Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Tenetur, similique?
					</p>
				</div>
				<Link to='#' className={style.read_more_btn}>
					Read more <FaChevronRight className={style.event_icon} />
				</Link>
			</div>
		</div>
	);
}

export default Event;
