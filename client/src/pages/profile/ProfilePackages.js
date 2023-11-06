import { List, Card, CardContent, ListItem, ListItemText, CardHeader } from '@mui/material';
import { useState, useEffect } from 'react';
import { patientAxios } from 'utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
import { HEALTH_PACKAGE_STATUS } from 'utils/Constants';
export const ProfilePackages = () => {

    const [packages, setPackages] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        patientAxios.get(`/patient/${user.id}/health-packages`).then((response) => setPackages(response.data.healthPackages));
    }, []);

    return (
        <Card align={'center'}>
            <CardHeader title='My Health Packages' />
            <CardContent>
                <List>
                    {packages && packages.map(healthPackage => (
                        <ListItem key={healthPackage._id} sx={{ background: healthPackage.status === HEALTH_PACKAGE_STATUS[1] ? 'gold' : '#ED2939', borderRadius: '20px', marginBottom: '2%' }}>
                            <ListItemText primary={healthPackage.name} secondary={healthPackage.status}
                                primaryTypographyProps={{ style: { color: 'white' } }}
                                secondaryTypographyProps={{ style: { color: 'white' } }} />
                        </ListItem>))
                    }
                </List>
            </CardContent>
        </Card>
    );
};
