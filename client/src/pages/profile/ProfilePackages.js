import { List, Card, CardContent, ListItem, ListItemText, CardHeader } from '@mui/material';
import { useState, useEffect } from 'react';
import { patientAxios } from 'utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
export const ProfilePackages = () => {

    const [packages, setPackages] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        patientAxios.get(`/patient/${user.id}/health-packages`).then((response) => setPackages(response.data.healthPackages));
    }, []);

    return (
        <Card align={'center'}>
            <CardHeader title='My Health Packages'/>
            <CardContent>
                <List>
                    {packages && packages.map(healthPackage => (<ListItem key={healthPackage._id}>
                        <ListItemText primary={healthPackage.name} secondary={healthPackage.status} />
                    </ListItem>))
                    }
                </List>
            </CardContent>
        </Card>
    );
};
