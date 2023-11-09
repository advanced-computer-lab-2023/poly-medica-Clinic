import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const test = ({ value }) => {
	const [val, setVal] = useState('');
	// handelSubmit()
	return (
		<>
			<TextField
				label='Text Field'
				data-testid='testinter'
				type='text'
				onChange={(e) => setVal(e.target.value)}
				value={val}
			/>
			<Button onClick={() => setVal('')}>butto</Button>
			<Typography>{val}</Typography>
			<Typography>{value}</Typography>
		</>
	);
};

export default test;
