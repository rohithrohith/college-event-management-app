import s from '../css/home.module.css';
import Event from '../components/Event';

function Home() {
	return (
		<div>
			<h2>Recent events</h2>
			<div className={s.recent_events}>
				<Event style={s} />
			</div>
		</div>
	);
}

export default Home;
