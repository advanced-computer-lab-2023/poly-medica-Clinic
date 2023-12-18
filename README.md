# poly-medica-clinic


## Motivation

Welcome to poly-medica, a pioneering virtual clinic system designed to revolutionise healthcare accessibility by providing a seamless platform for patients and healthcare providers. Offering effortless appointment scheduling, online consultations, and streamlined access to medical records, our focus is on empowering patients while enabling healthcare professionals to prioritise patient care over administrative burdens. Join us in redefining the clinic experience, ensuring convenient, patient-centric healthcare services.

## Build Status

[![Authentication CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/authentication-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/authentication-microservice-ci.yml)

[![Clinic CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/clinic-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/clinic-microservice-ci.yml)

[![Frontend CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/client-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/client-ci.yml)

[![Patient CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/patient-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/patient-microservice-ci.yml)

[![Payment CI](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/payment-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/actions/workflows/payment-microservice-ci.yml)


### Planned Features

#### Microservices with Kafka

We're planning to implement a microservices architecture using Kafka as the messaging system. This will enable scalable and decoupled communication between various components of our system, ensuring robustness and flexibility.

#### Frontend Automated Testing with Jest for React MUI

To enhance code quality and ensure a stable frontend, we're working on implementing comprehensive automated tests using Jest for our React application built with Material-UI (MUI). These tests will cover unit testing, integration testing, and UI component testing to guarantee a seamless user experience.

#### AI Models Integration

We're excited to introduce AI models to augment our system's capabilities:

- *Doctor Assistance AI*: This AI model will assist doctors by analyzing symptoms input by the patient, suggesting suitable medicines, and providing dosage recommendations. It will also create reminders for doctors regarding prescribed medications and their quantities.

## Code Style Guide

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



## Screenshots 🖵
<!-- Admin Screenshots-->
<details>
<summary>Admin</summary>

<details>
<summary>Add New Helath Packages</summary>

![WhatsApp Image 2023-12-17 at 5 00 28 AM (1)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/36a7386d-2d20-435c-acc3-349988abeb52)


    
</details>

</details>

<!-- Patient Screenshots-->
<details>
<summary>Patient</summary>

<details>
<summary>Home Page</summary>

![WhatsApp Image 2023-12-17 at 5 00 29 AM (1)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/7fdf73b9-bc45-4f2c-ac3d-3bcbb4abf9a6)

    
</details>

<details>
<summary>View Appointments</summary>

![WhatsApp Image 2023-12-17 at 5 00 28 AM](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/62230d66-c83e-4186-a991-24f3c3879ace)

    
</details>

<details>
<summary>Select a Doctor</summary>

![WhatsApp Image 2023-12-17 at 5 00 29 AM](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/7420601b-bd39-4a8c-9fc0-3338fad3c294)

    
</details>


</details>



<!-- Doctor Screenshots-->

<details>
<summary>Doctor</summary>

<details>
<summary>Follow-up requests</summary>

 ![WhatsApp Image 2023-12-17 at 5 00 28 AM (2)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/51774f22-2b4c-41c1-a073-390703f5b911)


</details>

<details>
<summary>confirmation message </summary>

 ![WhatsApp Image 2023-12-17 at 5 00 29 AM (2)](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/7097c174-83d2-4fd2-8718-669282a5595c)


</details>

</details>
<!-- to be added -->
 
 

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
- [Babel](https://babeljs.io/)


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

<summary> As a Admin I can </summary>

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
    Filter Context
    </summary>

```javascript


import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(
    [
      {
        attribute: '', 
        values: [],  
        selectedValue: '', 
      }
    ]);

  const updateFilter = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <FilterContext.Provider value={{ filterData, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

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
    Side Bar
    </summary>

```javascript
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, useMediaQuery } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import MenuList from './MenuList';
import LogoSection from './LogoSection';
import { drawerWidth } from 'store/constant';
 

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

<details>
    <summary>
    Order API
    </summary>

```javascript

import OrderService from '../service/order-service.js';
import { isValidMongoId } from '../utils/Validation.js';

import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../utils/Constants.js';

export const order = (app) => {
	const service = new OrderService();

	app.get('/order/pending', async (req, res) => {
		try {
			const data = await service.getPendingOrders();
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching orders',
			});
		}
	});

	app.get('/order/:patientId', async (req, res) => {
		const { patientId } = req.params;
		if (!isValidMongoId(patientId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Patient ID is invalid',
			});
		}
		try {
			const data = await service.getOrders(patientId);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching orders',
			});
		}
	});

	app.post('/order', async (req, res) => {
		try {
			const { order } = req.body;
			console.log(order);
			const data = await service.addOrder(order);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while adding order',
				error: err.message,
			});
		}
	});

	app.patch('/order/:orderId', async (req, res) => {
		const { orderId } = req.params;
		if (!isValidMongoId(orderId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Order ID is invalid',
			});
		}
		try {
			const { order } = req.body;
			const data = await service.updateOrder(orderId, order);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while updating order',
				error: err.message,
			});
		}
	});
};


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





 







 




## Installation  

Install my-project with `npm`

```bash
> git clone https://github.com/advanced-computer-lab-2023/poly-medica-Clinic.git
> cd poly-medica-clinic
> cd authentication && npm i && cd..
> cd clinic && npm i && cd..
> cd communication && npm i && cd..
> cd patient && npm i && cd..
> cd payment && npm i && cd..
> cd client && npm i 
```
## API Refrences

 ### Authentication Endpoints


    GET /user/:id/email
    GET /check-user
    GET /remove-cookie
    GET /pharmacists/id
    POST /signup/:request
    POST /doctors
    POST /pharmacists
    POST /admins/:request
    POST /login/:request
    POST /reset-password
    PATCH /users/:id/email/:email
    PATCH /change-password/:userId
    DELETE /users/:id

 ### Clinic Endpoints

    GET /packages
    GET /admins
    GET /doctors/:id/patients
    GET /doctor/:id
    GET /doctors
    GET /patients
    GET /appointments
    GET /doctors/:id/status
    GET /doctors/:id/name
    GET /doctors/:id/slots
    GET /doctors/:id/wallet
    GET /doctor-requests
    GET /doctor-requests/files/:fileName
    GET /appointments/:id
    GET /appointments/follow-up-requests/:id
    POST /packages
    POST /admins
    POST /check-doctor
    POST /doctors
    POST /doctors/:id/status
    POST /doctors/:id/slots
    POST /add-doctor-req
    POST /appointments
    POST /appointments/follow-up-requests
    PATCH /package/:id
    PATCH /doctors/:id
    PATCH /doctors/:doctorId/wallet
    PATCH /appointments/complete/:appointmentId
    PATCH /appointments/reschedule/:appointmentId
    PATCH /appointments/cancel/:appointmentId
    PATCH /appointments/follow-up-requests/handle/:appointmentId
    DELETE /packages/:id
    DELETE /admins/:id
    DELETE /patients/:id
    DELETE /doctors/:id
    DELETE /doctor-requests/:id

 ### Patient Endpoints
    GET /patients
    GET /patients/:id
    GET /family-members/:id
    GET /patient/:id/prescriptions
    GET /patient/:pateintId/prescription/:prescriptionId
    GET /patient/:id/discount
    GET /patient/:id/health-packages
    GET /patient/:id/medical-history
    GET /patient/:id/medical-history/:recordId
    GET /address/:pateintId
    GET /patients/:pateintId/wallet
    GET /order/pending
    GET /order/:patientId
    GET /prescriptions/:prescriptionId/download
    GET /prescriptions/:prescriptionId/medicines
    POST /patients
    POST /signup
    POST /order
    POST /prescriptions
    PATCH /family-members/:id
    PATCH /patient/:id/health-packages
    PATCH /patient/:id/health-packages/:packageId
    PATCH /patient/:id/medical-history
    PATCH /patient/:id/medical-history/:recordId
    PATCH /address/:pateintId
    PATCH /patients/:patientId/wallet
    PATCH /order/:orderId
    PATCH /prescriptions/:prescriptionId
    DELETE /patients/:id

 ### Payment Endpoints

    POST /payment/card
    POST /payment/wallet
    POST /payment-salary/doctor/:doctorId/wallet
<!-- to be added -->
## Tests
<!-- to be added -->

The testing is done using `jest`. To run the tests, run the following command.


```bash
> cd authentication && npm run test
```
```bash
> cd clinic && npm run test
```
```bash
> cd communication && npm run test
```
```bash
> cd patient && npm run test
```
```bash
> cd payment && npm run test
```


![image](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/101880627/3b31ae18-a4af-47ed-aee3-cf8e1be5a2d2)

 
 
### Models tests
`Faker.js` is used to generate data to test different models 

There is tests done for the following models : `User` , `Admin` , `Patient` , `Doctor` , `Appointment` , `Health Package` , `Order` , `Prescription` 





## How to use
To run backend 
#### authentication service
```bash
cd authentication && nodemon start
```
#### clinic service
```bash
cd clinic && nodemon start
```
#### patient service
```bash
cd patient && nodemon start
```
#### patient service
```bash
cd patient && nodemon start
```
#### payment service
```bash
cd patient && nodemon start
```
#### communication service
```bash
cd communication && nodemon start
```

To run frontend
```bash
cd client && npm start
```
 All services and client will be running on the specified ports on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file for all services

<details>
    <summary>
        envs
    </summary>


`MONGO_URI`

`JWT_SECRETABLE_KEY`

`MONGO_URI_TEST` 
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

- [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [RESTful Web API Patterns and Practices Cookbook](https://learning.oreilly.com/library/view/restful-web-api/9781098106737/)
- [Designing Data Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)





## License

#### Stripe License
This project uses Stripe to process payments. By using this project, you agree to be bound by the Stripe Services Agreement.

You can find the full text of the Stripe Services Agreement at the following link:

https://stripe.com/legal

Please make sure to read and understand the Stripe Services Agreement before using this project.

If you have any questions about the Stripe Services Agreement or how it applies to your use of this project, please contact Stripe at support@stripe.com.    