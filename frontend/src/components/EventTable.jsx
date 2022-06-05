import { Link } from 'react-router-dom';
import { FaChartLine, FaEdit } from 'react-icons/fa';

function Evenspanow({ style }) {
	return (
		<div>
			<div className={style.event_list_container}>
				<div className={style.event_list_head}>
					<span className={style.column}>Sl.no</span>
					<span className={style.column}>Title</span>
					<span className={style.column}>Actions</span>
				</div>
				{/* FOR LOOP */}
				<div className={style.event}>
					<span className={`${style.event_sl}  ${style.cell}`}>1</span>
					<span className={`${style.event_name} ${style.cell}`}>
						<Link to='/admin/event/2' className={style.event_link}>
							Event 2
						</Link>
					</span>
					<span className={`${style.event_sl}  ${style.cell}`}>
						<button className={style.stats_btn}>
							<FaChartLine />
						</button>
						<button className={style.stats_btn}>
							<FaEdit />
						</button>
					</span>
				</div>
				<div className={style.event}>
					<span className={`${style.event_sl}  ${style.cell}`}>1</span>
					<span className={`${style.event_name} ${style.cell}`}>
						<Link to='/admin/event/2' className={style.event_link}>
							Event 2
						</Link>
					</span>
					<span className={`${style.event_sl}  ${style.cell}`}>
						<button className={style.stats_btn}>
							<FaChartLine />
						</button>
						<button className={style.stats_btn}>
							<FaEdit />
						</button>
					</span>
				</div>
				<div className={style.event}>
					<span className={`${style.event_sl}  ${style.cell}`}>1</span>
					<span className={`${style.event_name} ${style.cell}`}>
						<Link to='/admin/event/2' className={style.event_link}>
							Event 2
						</Link>
					</span>
					<span className={`${style.event_sl}  ${style.cell}`}>
						<button className={style.stats_btn}>
							<FaChartLine />
						</button>
						<button className={style.stats_btn}>
							<FaEdit />
						</button>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Evenspanow;
