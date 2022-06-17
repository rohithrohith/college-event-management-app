import { useNavigate } from 'react-router-dom';

function Error404() {
	const navigate = useNavigate();
	return (
		<div>
			<h1>404</h1>
			<h2>Page you were looking for doesn't exists!</h2>
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
				onClick={() => navigate(-1, { replace: true })}
			>
				Go back
			</button>
		</div>
	);
}

export default Error404;
