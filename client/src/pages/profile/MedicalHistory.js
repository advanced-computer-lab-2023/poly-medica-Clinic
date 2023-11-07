import { Stack, Unstable_Grid2 as Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardHeader } from '@mui/material';
import { useState, useEffect } from 'react';
import Delete from '@mui/icons-material/Delete';
import { patientAxios } from 'utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
import Loader from 'ui-component/Loader';
const MedicalHistory = () => {

    const [documents, setDocuments] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    useEffect(
        () => {
            patientAxios.get(`/patient/${user.id}/medical-history`).then((response) => {
                console.log('response = ', response);
                setDocuments(response.data);
                setLoading(false);
            });

        }
        , []);

    const handleDocumentClick = (document) => {
        setDocuments(null);
        console.log(`Download document: ${document.title}`);
    };

    const handleDeleteDocument = (document) => {
        console.log(`Delete document: ${document.title}`);
    };

    return loading? (<Loader/>): (
        <>
            <Card
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <CardContent >
                    <Stack spacing={3}>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                <CardHeader title='Medical History'></CardHeader>
                                <Grid item xs={12}>
                                    <List>
                                        {console.log('docuemnts ======== ', documents)}
                                        {documents && documents.map((document) => (
                                            <ListItem key={document._id} button onClick={() => handleDocumentClick(document)}>
                                                {console.log('doc = ',document)}
                                                <ListItemText primary={document.recordTitle} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDocument(document)}>
                                                        <Delete />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};


export default MedicalHistory;
