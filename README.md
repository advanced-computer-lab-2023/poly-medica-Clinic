# Poly Medica


PolyMedica is a comprehensive healthcare solution that seamlessly integrates two virtual platforms: [PolyMedica Clinics](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic) and [PolyMedica Pharmacy](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy). This innovative system is built on a microservices architecture, ensuring flexibility, scalability, and efficiency.  
<br/>
The System mainly composed of 6 services, the communication among them is done by either synchronous HTTP requests using Axios or asynchronous communication using Apache Kafka:
 * Clinic Service
 * Patient Service
 * Authentication Service
 * Communication Service
 * Payment Service
 * Pharmacy Service
---

## Badges

<div style="display: flex;">
  <img src="https://img.shields.io/badge/Github-Actions-%232088FF?style=for-the-badge&logo=GithubActions" alt="Github Actions badge">
  <img src="https://img.shields.io/badge/Git--%23F05032?style=for-the-badge&logo=Git" alt="Git badge">
  <img src ="https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=Express&logoColor=white" alt = "Express badge">
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest Badge">
  <img src ="https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=Node.js&logoColor=white" alt = "Node badge">
  <img src ="https://img.shields.io/badge/React.js-%2361DAFB?style=for-the-badge&logo=React&logoColor=black" alt = "React badge">
  <img src ="https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=MongoDB&logoColor=white" alt = "Mongo badge">
  <img src ="https://img.shields.io/badge/Socket.IO-%23000000?style=for-the-badge&logo=Socket.IO&logoColor=white" alt = "Socket badge">
  <img src ="https://img.shields.io/badge/JavaScript_ES6-%23F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" alt = "ES6 badge">
  <img src ="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=Redux&logoColor=white" alt = "Redux badge">
  <img src ="https://img.shields.io/badge/ESLint-%234B32C3?style=for-the-badge&logo=ESLint&logoColor=white" alt = "ESLINT badge">
  <img src ="https://img.shields.io/badge/JWT-%23000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white" alt = "JWT badge">
  <img src ="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=Docker&logoColor=white" alt = "Docker badge">
  <img src ="https://img.shields.io/badge/Kafka-%23231F20?style=for-the-badge&logo=Apache%20Kafka&logoColor=white" alt = "Kafka badge">
  <img src ="https://img.shields.io/badge/Stripe-%231A1A1A?style=for-the-badge&logo=Stripe&logoColor=white" alt = "Stripe badge">
  <img src ="https://img.shields.io/badge/Swagger-%2385EA2D?style=for-the-badge&logo=Swagger&logoColor=black" alt = "Swagger badge">
</div>

--- 

## Build Status

[![Authentication CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/authentication-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/authentication-microservice-ci.yml)

[![Clinic CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/clinic-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/clinic-microservice-ci.yml)

[![Frontend CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/client-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/client-ci.yml)

[![Patient CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/patient-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/patient-microservice-ci.yml)

[![Payment CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/payment-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/payment-microservice-ci.yml)

---

### Planned Features


#### Frontend Automated Testing with Jest for React MUI

To enhance code quality and ensure a stable frontend, we're working on implementing comprehensive automated tests using Jest for our React application built with Material-UI (MUI). These tests will cover unit testing, integration testing, and UI component testing to guarantee a seamless user experience.

#### AI Models Integration

We're excited to introduce AI models to augment our system's capabilities:

- *Doctor Assistance AI*: This AI model will assist doctors by analyzing symptoms input by the patient, suggesting suitable medicines, and providing dosage recommendations. It will also create reminders for doctors regarding prescribed medications and their quantities.

- *Patient Assistance AI*: Suggest replacements for medicines out of stock for the patient

---
<details>
<summary> <h2>Code Style Guide</h2> </summary>

### JavaScript (Node.js and React)

- *Indentation*: Use 2 spaces.
- *Naming Conventions*: camelCase for variables/functions, PascalCase for React components.
- *ESLint*: Utilize appropriate ESLint configurations for Node.js and React.

### Express.js (Backend)

- *Routing*: Follow RESTful conventions for organized routes.
- *Middleware*: Use for route-specific logic.
- *Error Handling*: Implement middleware for consistent error responses.

### MongoDB (Database)

- *Naming Conventions*: Maintain consistent naming for collections (singular nouns).
- *Schema Design*: Ensure consistency across collections.
- *Indexes*: Optimize with appropriate indexes for queries.

### React with Material-UI (Frontend)

- *MUI Components*: Leverage Material-UI components and adhere to their guidelines.
- *Folder Structure*: Organize components by features/functions.
- *State Management*: Use Redux/Context API for complex state (if needed).
- *Lifecycle Methods*: Prefer hooks and functional components.

### Git Workflow

- *Branching*: Follow Gitflow (feature branches, develop, master).
- *Pull Requests*: Require clear descriptions and peer reviews before merging.

</details>  

---  

<details>

<summary> <h3> Microservices Structure </h3> </summary>
 
 ```bash
 Poly-Medica Clinic
├── clinic
│   ├── ...
│   └── (Clinic Service Code)
├── patient
│   ├── ...
│   └── (Patient Service Code)
├── authentication
│   ├── ...
│   └── (Authentication Service Code)
├── communication
│   ├── ...
│   └── (Communication Service Code)
├── payment
│   ├── ...
│   └── (Payment Service Code)
└── client
    ├── ...
    └── (Client Application Code)

Poly-Medica Pharmacy
├── pharmacy
│   ├── ...
│   └── (Pharmacy Service Code)
└── client
    ├── ...
    └── (Client Application Code)
 ```

</details>

---

## Screenshots 🖵

<details>
<summary>Login Page</summary>  
	
 ![login](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/56325872-aaac-4b78-843f-635c8edf4849)
 
</details>

<details>
<summary>Home Page</summary>  
	
 ![home](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/5bfe411b-d6a7-4472-96db-0b88cf9353b6)
 
</details>


<details>
<summary>Appointments Page</summary>  
	
 ![appointments](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/4095f6da-2857-4ac1-bd5d-f2b61d911dc1)
 
</details>

<details>
<summary>Health Package Page</summary>  
	
 ![health-package](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/ef6c952f-107a-4438-8462-f74652dc8ffa)
 
</details>

<details>
<summary>Apply Filter on doctors</summary>  
	
![apply-filter](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/a8b3508f-52dd-4e17-8292-48c788667916)
 
</details>

<details>
<summary>Patient Adding family members</summary>  
	
![add-member](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/e11252e9-487b-4b4f-b33e-efa325a854fb)
 
</details>

<details>
<summary>Doctor Receiving Notification</summary>  
	
![notification](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/f2a8d218-3002-4d7e-9129-25b537392adb)
 
</details>

<details>
<summary>Admin Viewing Requests</summary>  
	
![requests](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/b7643d4d-ac7b-4d18-b2e8-8f5b0fb9e84b)

</details>




 ---

## Tech/Framework used 

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [React](https://reactjs.org/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Jest](https://jestjs.io/)
-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)
-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [Babel](https://babeljs.io/)
-   [Socket IO](https://socket.io/)
-   [JWT](https://jwt.io/)
-   [Docker](https://www.docker.com/)
-   [Apache Kafka](https://kafka.apache.org/)
-   [ESlint](https://eslint.org/)
-   [Redux](https://react-redux.js.org/)
-   [Node Mailer](https://nodemailer.com/)

---

## Features

The system serves different type of users (Patient, Doctor , Admin )
<details>

<summary> As a Guest I can </summary>

- Sign up as a patient 
- submit a request to register as a doctor
- upload and submit required documents upon registrationas a doctor

</details>


<details>

<summary> As a Patient I can </summary>

- Add family members 
- Link another patient's account
- Choose to pay for my appointment using my wallet or credit card
- Enter credit card details and pay for an appointment
- View registered family members 
- View uploaded health records 
- View, Reschedule and Filter appointments
- Cancel an appointment for myself or for a family member
- View, Download and Filter all prescriptions
- choose the way to pay a prescription
- Receive a notification
- Request a follow-up to a previous appointment
- Chat with a doctor
- Start and End a video call with a doctor


</details>

<details>

<summary> As a Doctor I can </summary>

-  Update My personal information like email, affiliation and hourly rate
- View and accept the employment contract
- Add my available time slots for appointments
- View uploaded health records 
- Add a new health records 
- View all prescriptions  
- View, Search and Filter a list of my patients
- Select a patient from the list of patients
- Receive a notification
- View, Reschedule and Filter appointments
- Cancel an appointment
- Schedule a follow-up for a patient
- Add and Delete medicine from a prescription
- Add and Update dosage for each medicine added to the prescription
- Download selected prescription 
- Update a patient's prescription before it is submitted to the pharmacy
- Accept or Revoke a follow-up session request from a patient
-Chat with a patient
- Start and End a video call with a patient
 

</details>

<details>

<summary> As an Admin I can </summary>

- Add another adminstrator 
- Remove a doctor or a patient or an admin from the system
- View all of the information uploaded by a doctor to apply to join the platform
- Accept or Reject the request of a doctor to join the platform
- Add, Update and Delete health packages with different price ranges.
- Accept a request for the registration of a doctor
</details>



## Code Examples 

<details>
    <summary>
    Admin Details
    </summary>

```javascript

import React from 'react';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import EmailIcon from '@mui/icons-material/Email';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useAdminContext } from 'hooks/useAdminContext';
import { commonStyles } from 'ui-component/CommonStyles';

const useStyles = styled(() => commonStyles);

const AdminDetails = () => {
	const classes = useStyles();
	const theme = useTheme();
	const title = ' ';

	const { setSelectedAdmin, setErrorMessage, selectedAdmin } = useAdminContext();

	const handleDialogClose = () => {
		setSelectedAdmin(null);
		setErrorMessage('');
	};

	return (
		<Dialog
			open={selectedAdmin}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: theme.breakpoints.values.md > 800 ? 500 : 300 } }}
		>
			{selectedAdmin && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedAdmin.userName}
					</DialogTitle>
					<DialogContent>
						<div className={classes.container}>
							<div>
								<img
									src={DoctorIcon}
									alt={`${title} ${selectedAdmin.userName}`}
									width='100'
									height='100'
								/>
								<Typography variant='h4' sx={{ marginTop: '1em' }}>
									{`${title} ${selectedAdmin.userName}`}
								</Typography>
							</div>
							<div className={classes.infoContainer}>
								<div className={classes.emailContainer}>
									<EmailIcon className={classes.iconMargin} />
									<Typography variant='body1'>{selectedAdmin.email}</Typography>
								</div>
								<div className={classes.emailContainer}>
									<StarBorderIcon className={classes.iconMargin} />
									<Typography variant='body1'>
										{selectedAdmin.mainAdmin ? 'Main Admin' : 'Sub Admin'}
									</Typography>
								</div>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default AdminDetails;

```
</details>

<details>
    <summary>
    Search Context
    </summary>

```javascript
 import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
```

 </details>




 <details>
    <summary>
    Get admins API
    </summary>

```javascript
	app.get('/admins', async (req, res) => {
		try {
			const admins = await service.findAllAdmins();
			res.status(OK_STATUS_CODE).json({ admins });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
```

 </details>

<details>
    <summary>
    Users Model
    </summary>

```javascript

import mongoose from 'mongoose';
import { USER_ARR_ENUM } from '../../utils/Constants.js';

const userSchema = mongoose.Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		unique: true,
	},
	email:{
		type:String,
		required:true,
		unique: true,
	},
	userName:{
		type:String,
		required:true,
		unique: true
	},
	password:{
		type:String,
		required:true
	},
	type:{
		type: String,
		enum: USER_ARR_ENUM,
		required:true
	},
});

userSchema.statics.signup = async function (
	userId,
	email,
	password,
	userName,
	type,
) {
	const userRecord = new this({
		userId: new mongoose.Types.ObjectId(userId),
		email,
		password,
		userName,
		type,
	});
	const result = await userRecord.save();
	return result;
};

const User = mongoose.model('User', userSchema);

export default User;

```

 </details>
<details>
    <summary>
    Notification
    </summary>

```javascript
import PropTypes from 'prop-types';
 
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, useMediaQuery } from '@mui/material';
 
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
 
import MenuList from './MenuList';
import LogoSection from './LogoSection';
import { drawerWidth } from 'store/constant'; code exa

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

	const drawer = (
		<>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
					<LogoSection />
				</Box>
			</Box>
			<BrowserView>
				<PerfectScrollbar
					component="div"
					style={{
						height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
						paddingLeft: '16px',
						paddingRight: '16px'
					}}
				>
					<MenuList />
					<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
						<Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
					</Stack>
				</PerfectScrollbar>
			</BrowserView>
			<MobileView>
				<Box sx={{ px: 2 }}>
					<MenuList />
					<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
						<Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
					</Stack>
				</Box>
			</MobileView>
		</>
	);

	const container = window !== undefined ? () => window.document.body : undefined;

	return (
		<Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
			<Drawer
				container={container}
				variant={matchUpMd ? 'persistent' : 'temporary'}
				anchor="left"
				open={drawerOpen}
				onClose={drawerToggle}
				sx={{
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						background: theme.palette.background.default,
						color: theme.palette.text.primary,
						borderRight: 'none',
						[theme.breakpoints.up('md')]: {
							top: '88px'
						}
					}
				}}
				ModalProps={{ keepMounted: true }}
				color="inherit"
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

Sidebar.propTypes = {
	drawerOpen: PropTypes.bool,
	drawerToggle: PropTypes.func,
	window: PropTypes.object
};

export default Sidebar;


```

 </details>




 <!-- next -->

---


## Installation  
  
```bash
> git clone https://github.com/advanced-computer-lab-2023/poly-medica-Clinic.git
> cd poly-medica-clinic
> chmod +x install-all.sh
> ./install-all.sh
```

---

## API Documentation

The API documentation is created using Swagger. To access it, follow these steps:

1. Ensure the service is running.
2. Open your browser and navigate to `localhost:SERVICE_PORT/api-docs`.


![swagger](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/a78893f3-69a7-4b00-b8c1-c30e9901e898)



---

## Tests
<!-- to be added -->

The testing is done using `jest`. To run the tests, run the following command:  
- Make sure you are at the root directory of the project
  

```bash
> chmod +x run-tests.sh
>./run-tests.sh
```


![image](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/3b31ae18-a4af-47ed-aee3-cf8e1be5a2d2)

 
### Model tests
`Faker.js` is used to generate data to test different models 

There are tests done for the following models : `User` , `Admin` , `Patient` , `Doctor` , `Appointment` , `Health Package` , `Order` , `Prescription` 


## How to use
To run the project 
- Make sure you are at the root directory of the project
- The script will run all the services and the client except the pharmacy service, which could be found at [this repository](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy)

```bash
> npm install -g concurrently
> chmod +x run-all.sh
> ./run-all.sh
```
 All services and client will be running on the specified ports on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file for all services

<details>
    <summary>
        Authentication and Communication envs
    </summary>

`MONGO_URI`

`MONGO_URI_TEST` 

`JWT_SECRET`

`PORT`

`RESETEMAIL`

`RESETPASSWORD`

</details>


<details>
    <summary>
        Clinic and Patient envs
    </summary>

`MONGO_URI`

`MONGO_URI_TEST` 

`JWT_SECRET`

`PORT`

</details>


<details>
    <summary>
        Payment envs
    </summary>

`SecretKey`

`PublicKey` 

`PORT`

</details>


## Contributing
Contributions are always welcome!

### Getting Started

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch
5. Make your changes
6. Commit and push your changes
7. Create a pull request
8. Wait for your pull request to be reviewed and merged


# Credits
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Jest docs](https://jestjs.io/docs/getting-started)
- [Stripe docs](https://stripe.com/docs)



---

## License

The Project is open source following [MIT License](https://opensource.org/license/mit/)

---

### Contributers: 
- [Mohamed Khaled](https://github.com/Mohamed-Khaled308)
- [Amir Tarek](https://github.com/amir-awad)
- [Malek Mohamed](https://github.com/malekelkssas)
- [Ahmad Hoseiny](https://github.com/AhmadHoseiny)
- [Mohamed Hassan](https://github.com/mohamedhassans)
- [Abdelrahman Amr](https://github.com/Aelmeky)
- [Yehia Mohamed](https://github.com/YehiaFarghaly)
