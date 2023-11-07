import { Typography } from '@mui/material';
import { calcPrice } from '../../utils/PriceCalculator.js';
import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DoctorDetailsHeader = ({ selectedDoctor }) => {
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
                        <AttachMoneyIcon style={{ marginRight: '0.4em' }}/>
                        <Typography variant='body1'>
                            {`${calcPrice(selectedDoctor.hourlyRate)}`}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDetailsHeader;