import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import loginService from '../services/Login.service';
import { Link, Navigate } from 'react-router-dom';
import ErrorAlert from '../components/alerts/ErrorAlert';
import { validateEmail, validatePassword } from '../utils/Validate';

const theme = createTheme({
	palette: {
		primary: red,
	},
});

export default function Login() {
	const { token, login } = useAuth();
	if (token) {
		return <Navigate to='/home'></Navigate>;
	}
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [validCredentials, setValidCredentials] = useState({
		email: true,
		password: true,
	});
	const [alert, setAlert] = useState(false);

	const handleChange = e => {
		setAlert(false);
		const { name, value } = e.target;
		setCredentials({
			...credentials,
			[name]: value,
		});
		setValidCredentials({
			...validCredentials,
			[name]:
				value.length === 0
					? true
					: name === 'email'
					? validateEmail(value)
					: validatePassword(value),
		});
	};

	const handleAlertClose = () => setAlert(false);

	const handleSubmit = async e => {
		e.preventDefault();
		if (validCredentials.email && validCredentials.password) {
			const res = await loginService(credentials);
			if (res.jwt) {
				login(res.jwt);
			} else {
				setAlert(true);
			}
		} else {
			setAlert(true);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				maxWidth='xs'
				style={{
					height: '90vh',
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
					padding: '2rem',
					textAlign: 'center',
				}}
			>
				<Card>
					<CardContent
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '20rem',
							justifyContent: 'space-around',
						}}
					>
						<Typography variant='h4'>
							<strong>Inicio de sesi??n</strong>
						</Typography>
						<form onSubmit={handleSubmit}>
							<TextField
								key={'email'}
								name={'email'}
								value={credentials.email}
								label='Correo electr??nico'
								variant='filled'
								style={{
									marginBottom: '1rem',
								}}
								onChange={handleChange}
								fullWidth
								required
								helperText={
									validCredentials.email ? null : 'Formato de correo no valido'
								}
							></TextField>
							<TextField
								key={'password'}
								name={'password'}
								value={credentials.password}
								label='Contrase??a'
								variant='filled'
								type='password'
								onChange={handleChange}
								style={{ marginBottom: '1rem' }}
								fullWidth
								required
								helperText={
									validCredentials.password
										? null
										: 'Formato de contrase??a no valido'
								}
							></TextField>
							<Button variant='contained' type='submit'>
								Iniciar sesi??n
							</Button>
						</form>
					</CardContent>
				</Card>
			</Container>
			<ErrorAlert
				open={alert}
				onClose={handleAlertClose}
				message={'Credenciales incorrectas.'}
			/>
			<footer style={{ textAlign: 'end', padding: '2rem' }}>
				<Link to='/'>INICIO</Link>
			</footer>
		</ThemeProvider>
	);
}
