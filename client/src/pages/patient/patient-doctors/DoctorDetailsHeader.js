import { Typography } from '@mui/material';
import { calcPrice } from '../../../utils/PriceCalculator.js';
import DoctorPrice from './DoctorPrice.js';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';


const DoctorDetailsHeader = ({ selectedDoctor, loggedInPatientHealthPackage }) => {
    const price = calcPrice(selectedDoctor.hourlyRate, loggedInPatientHealthPackage && loggedInPatientHealthPackage.doctorDiscount); 
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: '5em',
                }}
            >
                <img
                    src={DoctorIcon}
                    alt={selectedDoctor.userData.name}
                    width='100'
                    height='100'
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <CoronavirusIcon style={{ marginRight: '0.4em' }}/>
                        <Typography variant='body1'>
                            {`${selectedDoctor.speciality}`}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <WorkIcon style={{ marginRight: '0.4em' }}/>
                        <Typography variant='body1'>
                            {`${selectedDoctor.affiliation}`}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <SchoolIcon style={{ marginRight: '0.4em' }}/>
                        <Typography variant='body1'>
                            {`${selectedDoctor.educationalBackground}`}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <PaidIcon style={{ marginRight: '0.4em' }}/>
                        <Typography variant='body1'>
                        <DoctorPrice
                            priceBeforeDiscount={selectedDoctor.hourlyRate}
                            priceAfterDiscount={price}
                            margin={10}
                        />
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDetailsHeader;