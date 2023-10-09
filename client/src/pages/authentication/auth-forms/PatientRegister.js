import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useMediaQuery
} from '@mui/material';
import axiosInstanceAuthSer from 'utils/api/axiosInstanceAuthSer';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { DatePicker } from '@mui/x-date-pickers';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import Swal from 'sweetalert2';



// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [emergencyFullName, setEmergencyFullName] = useState("");
	const [emergencyMobileNumber, setEmergencyMobileNumber] = useState("");
	const [mobileNumber, setMobileNumner] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedGender, setSelectedGender] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedRelation, setSelectedRelation] = useState('');

  const familyRelations = [
    'Parent',
    'Child',
    'Sibling',
    'Spouse',
    'Grandparent',
    'Grandchild',
    'Aunt',
    'Uncle',
    'Niece',
    'Nephew',
    'Cousin',
    'Other',
  ];

  const handleRelationChange = (event) => {
    setSelectedRelation(event.target.value);
  };

  // Function to handle date changes
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to get today's date
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    return today;
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const sendData = { type: "patient" ,name: name, email: email, password: password, userName: userName, dateOfBirth: selectedDate, gender: selectedGender, mobileNumber: mobileNumber, emergencyContact: { name: emergencyFullName, mobile: emergencyMobileNumber, relation: selectedRelation } };
		const response = await axiosInstanceAuthSer.post('/signup', sendData);
		const data = response.data;
		console.log({ response , data });
		if(response.status === 200){		
		Swal.fire({
			icon: 'success',
			title: 'Sign-up Success!',
			text: 'You have successfully signed up, you can now login',
		});	
		navigate('/pages/login/login3');
		setIsSubmitting(false);
		} else{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: response.response.data.message,
			});
			setIsSubmitting(false);
			}
		
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
		const temp = strengthIndicator(e.target.value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};

	return (
		<>
					<form onSubmit={handleSubmit} >
						<Grid container spacing={matchDownSM ? 0 : 2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									label="username"
									margin="normal"
									name="username"
									type="text"
									value={userName}
									onChange={ e => setUserName(e.target.value) }
									sx={{ ...theme.typography.customInput }}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									label="name"
									margin="normal"
									name="name"
									type="text"
									value={name}
									onChange={ e => setName(e.target.value)}
									sx={{ ...theme.typography.customInput }}
								/>
							</Grid>
						</Grid>
						<FormControl fullWidth required>
						<TextField
									fullWidth
									label="email"
									type="email"
									margin="normal"
									name="email"
									value={email}
									onChange={ e => setEmail(e.target.value) }
									required
									sx={{ ...theme.typography.customInput }}
							/>
						</FormControl>

						<FormControl fullWidth required>
						<TextField
									fullWidth
									label="password"
									type="password"
									margin="normal"
									name="password"
									defaultValue=""
									required
									value={password}
									onChange={changePassword}
									sx={{ ...theme.typography.customInput }}
							/>
						</FormControl>
							{strength !== 0 && (
							<FormControl fullWidth>
								<Box sx={{ mb: 2 }}>
									<Grid container spacing={2} alignItems="center">
										<Grid item>
											<Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
										</Grid>
										<Grid item>
											<Typography variant="subtitle1" fontSize="0.75rem">
												{level?.label}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</FormControl>
						)}
						<FormControl fullWidth required sx={{ marginBottom:2, marginTop:1 }}>
						<InputLabel>Select Gender</InputLabel>
						<Select
							value={selectedGender}
							onChange={handleGenderChange}
							required
							label="Select Gender"
						>
							<MenuItem value="MALE">Male</MenuItem>
							<MenuItem value="FEMALE">Female</MenuItem>
						</Select>
						</FormControl>
						<FormControl required fullWidth sx={{ marginBottom:1 }}>
							<DatePicker
							required
							margin="normal"
							label="birthdate"
							value={selectedDate}
							onChange={handleDateChange}
							maxDate={getTodayDate()}
							/>
						</FormControl>

						<FormControl fullWidth required>
						<TextField
									fullWidth
									label="mobile number"
									type="text"
									margin="normal"
									name="mn"
									value={mobileNumber}
									onChange={ e => setMobileNumner(e.target.value) }
									required
									sx={{ ...theme.typography.customInput }}
							/>
						</FormControl>

						<Divider sx={{ flexGrow: 1, marginTop: 2 }} orientation="horizontal" />
						<Grid item xs={12} container alignItems="center" justifyContent="center">
						<Box sx={{ mb: 2, mt: 2 }}>
						<Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
							emergency contact
						</Typography>
						</Box>
						</Grid>	

							<FormControl required fullWidth>
							<TextField
									fullWidth
									required
									label="full name"
									margin="normal"
									name="fn"
									type="text"
									defaultValue=""
									value={emergencyFullName}
									onChange={ e => setEmergencyFullName(e.target.value) }
									sx={{ ...theme.typography.customInput }}
								/>
							</FormControl>

						<FormControl fullWidth required>
							<TextField
										fullWidth
										label="mobile number"
										type="text"
										margin="normal"
										name="mn"
										value={emergencyMobileNumber}
										onChange={ e => setEmergencyMobileNumber(e.target.value) }
										required
										sx={{ ...theme.typography.customInput }}
								/>
						</FormControl>

						<FormControl fullWidth required sx={{ mt: 1 }}>
							<InputLabel>Select Family Relation</InputLabel>
							<Select
								required
								label="Select Family Relation"
								value={selectedRelation}
								onChange={handleRelationChange}
							>
								{familyRelations.map((relation, index) => (
								<MenuItem key={index} value={relation}>
									{relation}
								</MenuItem>
								))}
							</Select>
						</FormControl>

						<Box sx={{ mt: 2 }}>
							<AnimateButton>
								<Button  disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
								</Button>
							</AnimateButton>
						</Box>
					</form>
			
		</>
	);
};

export default FirebaseRegister;
