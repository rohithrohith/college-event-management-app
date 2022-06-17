import { useNavigate } from 'react-router-dom';

function Unauth() {
	const navigate = useNavigate();
	return (
		<div>
			<h1>Unauthorized</h1>
			<h2>You are not supposed to be here!</h2>
			<button
				style={{
					background: 'var(--primary)',
					color: 'white',
					padding: '10px',
					borderRadius: '5px',
					outline: 'none',
					border: 'none',
					marginTop: '10px',
				}}
				onClick={() => navigate(-1)}
			>
				Go back
			</button>
		</div>
	);
}

export default Unauth;
