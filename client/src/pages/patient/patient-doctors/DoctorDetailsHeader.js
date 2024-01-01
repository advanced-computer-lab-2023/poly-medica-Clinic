import { Typography } from '@mui/material';
import { calcPrice } from '../../../utils/PriceCalculator.js';
import DoctorPrice from './DoctorPrice.js';
import DoctorIcon from '../../../assets/images/icons/DoctorIcon.png';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import { styled } from '@mui/system';
import { commonStyles } from 'ui-component/CommonStyles.js';

const useStyles = styled(() => commonStyles);

const DoctorDetailsHeader = ({ selectedDoctor, loggedInPatientHealthPackage }) => {
    const classes = useStyles();
    const price = calcPrice(selectedDoctor.hourlyRate, loggedInPatientHealthPackage && loggedInPatientHealthPackage.doctorDiscount);
    return (
        <>
            <div className={classes.container} >
                <img
                    src={DoctorIcon}
                    alt={selectedDoctor.userData.name}
                    width='100'
                    height='100'
                />
                <div className={classes.infoContainer}>
                    <div className={classes.emailContainer}>
                        <CoronavirusIcon style={{ marginRight: '0.4em' }} />
                        <Typography variant='body1'>
                            {`${selectedDoctor.speciality}`}
                        </Typography>
                    </div>
                    <div className={classes.emailContainer}>
                        <WorkIcon style={{ marginRight: '0.4em' }} />
                        <Typography variant='body1'>
                            {`${selectedDoctor.affiliation}`}
                        </Typography>
                    </div>
                    <div className={classes.emailContainer}>
                        <SchoolIcon style={{ marginRight: '0.4em' }} />
                        <Typography variant='body1'>
                            {`${selectedDoctor.educationalBackground}`}
                        </Typography>
                    </div>
                    <div className={classes.emailContainer}>
                        <PaidIcon style={{ marginRight: '0.4em' }} />
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