import {
    Card,
    CardHeader,
    CardContent,
    ListItem,
    ListItemText,
    Button,
    Tooltip,
    IconButton,
    Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { useUserContext } from 'hooks/useUserContext';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import { PATIENT_TYPE_ENUM } from 'utils/Constants';
import { clinicAxios } from 'utils/AxiosConfig.js';
import Swal from 'sweetalert2';
import '../../assets/css/swalStyle.css';


const FollowUpRequestCard = ({
     followUpRequest,
     handleUpdateFollowUpRequest
}) => {
    const theme = useTheme();
    const { user } = useUserContext();
    const titleName = user.type=='patient' ? `Dr. ${followUpRequest.doctorName}` : `Mr/Miss ${followUpRequest.patientName}`;
    let followUpStatus = '';
    if(followUpRequest.followUpData.handled){
        if(followUpRequest.followUpData.accepted){
            followUpStatus = 'Accepted';
        }
        else{
            console.log('heeeeeere!!!');
            followUpStatus = 'Rejected';
        }
    }
    else{
        followUpStatus = 'Pending';
    }
    const handleUpdate = (isAccepted) => {
        const updateData = { accepted: isAccepted };
        if(!isAccepted){
            updateData.appointmentData = followUpRequest.date;
            updateData.doctorId = followUpRequest.doctorId;
        }
        clinicAxios
            .patch(`/appointments/follow-up-requests/handle/${followUpRequest._id}`, updateData)
            .then((response) => {
                const updatedFollowUpRequest = response.data;
                handleUpdateFollowUpRequest(updatedFollowUpRequest);
            });
    };
    const handleUpdateConfirmation = (isAccepted) => {
        const confirmationTitle = isAccepted ? 'Acceptance' : 'Rejection';
        const confirmationText = isAccepted ? 'accept' : 'reject';
        Swal.fire({
			title: `Confirm ${confirmationTitle}`,
			text: `Are you sure you want to ${confirmationText} this request?`,
			icon: 'question',
			confirmButtonText: 'Yes',
			showCancelButton: 'true',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result['isConfirmed']) {
				handleUpdate(isAccepted);
			}
		});
    };
    let patientFamilyMember, familyMemberText;
    if(followUpRequest){
        patientFamilyMember = followUpRequest.patientFamilyMember;
        familyMemberText = (user.type=='patient')? 
            'your family member Mr/Miss ' :
            `Mr/Miss ${followUpRequest.patientName}'s family member: Mr/Miss `;
    }
    return(
        <>
            <Card
					sx={{
						width: '80%',
						margin: '20px auto',
						marginBottom: '0px',
						border: '2px solid',
						borderColor: theme.palette.primary.light,
						':hover': {
							boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
						},
					}}
            >
                <CardHeader
						sx={{ padding: 3 }}
						avatar={<AccountCircleIcon />}
                        title={titleName}
				/>
                <Divider
						sx={{
							opacity: 1,
							borderColor: theme.palette.primary,
						}}
				/>
                <CardContent sx={{ padding: 2 }}>
						<ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <section>
                                    <ListItemText
                                        primary='Date'
                                        secondary={ `${getDay(followUpRequest.date)} at ${getTime(followUpRequest.date)}` }
                                        xs={20}
                                        sx = {{ marginRight: '2em' }}
                                    />
                                </section>
                                {
                                    patientFamilyMember
                                    &&
                                    <section>
                                        <ListItemText
                                            primary='Notes'
                                            secondary={ 
                                                `This follow-up request is for ${familyMemberText} ${patientFamilyMember.name}`
                                            }
                                            xs={20}
                                            sx={{ maxWidth: '70%' }}
                                        />
                                    </section>
                                }
                            </div>
                            {
                                followUpStatus == 'Accepted' 
                                &&
                                <>
                                    <Tooltip title='Accepted'>
                                        <CheckCircleIcon fontSize='large' color='success' />
                                    </Tooltip>
                                </>
                            }
                            {
                                followUpStatus == 'Rejected' 
                                &&
                                <>
                                    <Tooltip title='Rejected'>
                                        <CancelIcon fontSize='large' color='error' />
                                    </Tooltip>
                                </>
                            }
                            {
                                followUpStatus == 'Pending' && user.type == PATIENT_TYPE_ENUM
                                &&
                                <>
                                    <Tooltip title={'Pending Doctor\'s Response'}>
                                       <PendingIcon fontSize='large' color='secondary' />
                                    </Tooltip>
                                </>
                            }
                            {
                                followUpStatus == 'Pending' && user.type == 'doctor'
                                &&
                                <div>
                                    <Button onClick={() => handleUpdateConfirmation(true)}>
                                        <Tooltip title='Accept'>
                                            <IconButton color='success'>
                                                <CheckIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Button>
                                    <Button onClick={() => handleUpdateConfirmation(false)}>
                                        <Tooltip title='Reject'>
                                            <IconButton color='error'>
                                                <ClearIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Button>
                                </div>
                            }
							
						</ListItem>
					</CardContent>
            </Card>
        </>
    );
    

};

export default FollowUpRequestCard;