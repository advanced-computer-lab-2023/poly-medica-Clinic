import { useState, useEffect } from 'react';
import { clinicAxios } from 'pages/utilities/AxiosConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { List } from '@mui/material';
import FollowUpRequestCard from './FollowUpRequestCard.js';
import NoDataFound from '../NoDataFound.js';
import { useSelector } from 'react-redux';
const FollowUpRequests = () => {

    const [followUpRequests, setFollowUpRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        clinicAxios
            .get(`/appointments/follow-up-requests/${user.id}`)
            .then((response) => {
                const resFollowUpRequests = response.data;
                setFollowUpRequests(resFollowUpRequests);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleUpdateFollowUpRequest = (updatedFollowUpRequest) => {
        const updatedFollowUpRequests = followUpRequests.map((followUpRequest) =>
            followUpRequest._id === updatedFollowUpRequest._id ? updatedFollowUpRequest : followUpRequest
        );
        setFollowUpRequests(updatedFollowUpRequests);
    };
    return (
        <>
            {
                isLoading
                &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            }
            {
                !isLoading
                    &&
                    followUpRequests.length == 0 ? <NoDataFound itemName={'Requests'} /> :
                    <List>
                        {Array.isArray(followUpRequests) &&
                            followUpRequests.map((followUpRequest, index) => (
                                <div key={index}>
                                    <FollowUpRequestCard
                                        followUpRequest={followUpRequest}
                                        handleUpdateFollowUpRequest={handleUpdateFollowUpRequest}
                                    ></FollowUpRequestCard>
                                </div>
                            ))}
                    </List>
            }
        </>
    );
};

export default FollowUpRequests;