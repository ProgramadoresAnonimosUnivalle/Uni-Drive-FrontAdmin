import {
	Button,
	Card,
	CardContent,
	Switch,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function AttributeCard({ attribute }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [edit, setEdit] = useState(true);
	const [change, setChange] = useState({
		active: true,
		description: true,
	});
	const [data, setData] = useState(attribute);
	const [original, setOriginal] = useState(attribute);

	const handleChangeSwitch = e => {
		const { checked } = e.target;
		setData({
			...data,
			active: checked,
		});
		if (checked === original.active) {
			setChange({ ...change, active: true });
		} else {
			setChange({ ...change, active: false });
		}
	};

	const handleChangeText = e => {
		const { value } = e.target;
		const capitalize = value.charAt(0).toUpperCase() + value.slice(1);
		setData({
			...data,
			description: capitalize,
		});
		if (capitalize === original.description || capitalize.length === 0) {
			setChange({ ...change, description: true });
		} else {
			setChange({ ...change, description: false });
		}
	};

	const handleEditButton = e => {
		setEdit(!edit);
		setData(original);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('send');
		setEdit(true);
		setChange({
			active: true,
			description: true,
		});
		setOriginal(data);
	};

	return (
		<Card
			sx={{
				margin: '0.8rem',
				minWidth: '15rem',
				flex: isMobile ? '1 1 auto' : '0 1 30%',
			}}
		>
			<CardContent>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Typography>ID: {attribute.id}</Typography>
				</div>
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}
				>
					<TextField
						label={'Descripción'}
						description={'description'}
						value={data.description}
						onChange={handleChangeText}
						style={{
							width: isMobile ? '65%' : '70%',
						}}
						disabled={edit}
					/>
					<div style={{ display: 'block' }}>
						<Switch
							checked={data.active}
							onChange={handleChangeSwitch}
							description={'active'}
							disabled={edit}
						/>
						<Typography align='center'>
							{data.active ? 'Activo' : 'Inactivo'}
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
							marginTop: '0.5rem',
						}}
					>
						<Button
							variant='contained'
							size='small'
							color={edit ? 'primary' : 'error'}
							onClick={handleEditButton}
						>
							{edit ? 'Editar' : 'Cancelar'}
						</Button>
						<Button
							variant='contained'
							type='submit'
							color='success'
							size='small'
							disabled={change.description && change.active}
						>
							Guardar
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
