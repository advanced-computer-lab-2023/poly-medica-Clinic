import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
	Box,
	Button,
	FormControl,
	Grid,
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

const FirebaseRegister = ({ type }) => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [educationalBackground, setEducationalBackground] = useState("");
	const [hourlyRating, setHourlyRating] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
    const [speciality, setSpeciality] = useState("");
    const [affiliation, setAffiliation] = useState("");


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


	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const sendData = { type: type,  userData: { name: name, email: email, password: password, userName: userName, dateOfBirth: selectedDate }, speciality: speciality, hourlyRate: hourlyRating, affiliation: affiliation, educationalBackground: educationalBackground  };
		const response = await axiosInstanceAuthSer.post('/signup', sendData);
		if(response.status === 200){		
            Swal.fire({
                icon: 'success',
				title: 'Sign-up Success!',
				text: 'You request have been successfully send',
            });	
			setIsSubmitting(false);
			setPassword("");
			setUserName("");
			setName("");
			setEmail("");
			setEducationalBackground("");
			setHourlyRating(0);
			setIsSubmitting(false);
			setSelectedDate(new Date());
			setSpeciality("");
			setAffiliation("");
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
									label="hourly rating"
									type="number"
									margin="normal"
									name="hr"
									value={hourlyRating}
									onChange={ e => setHourlyRating(e.target.value) }
									required
                                    inputProps={{
                                        min:0
                                    }}
									sx={{ ...theme.typography.customInput }}
							/>
						</FormControl>

						<FormControl fullWidth required>
							<TextField
										fullWidth
										label="educational Background"
										type="text"
										margin="normal"
										name="eb"
										value={educationalBackground}
										onChange={ e => setEducationalBackground(e.target.value) }
										required
										sx={{ ...theme.typography.customInput }}
								/>
						</FormControl>

                        <FormControl fullWidth required>
							<TextField
										fullWidth
										label="speciality"
										type="text"
										margin="normal"
										name="eb"
										value={speciality}
										onChange={ e => setSpeciality(e.target.value) }
										required
										sx={{ ...theme.typography.customInput }}
								/>
						</FormControl>

                        <FormControl fullWidth required>
							<TextField
										fullWidth
										label="affiliation"
										type="text"
										margin="normal"
										name="eb"
										value={affiliation}
										onChange={ e => setAffiliation(e.target.value) }
										required
										sx={{ ...theme.typography.customInput }}
								/>
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
