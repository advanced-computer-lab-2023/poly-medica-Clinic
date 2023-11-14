import { Stack, Unstable_Grid2 as Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardHeader, ListItemAvatar, CardActions, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Delete from '@mui/icons-material/Delete';
import { patientAxios } from 'utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
import Loader from 'ui-component/Loader';
import { Attachment } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { downloadDocument } from 'utils/CommonUtils';
import { OK_STATUS_CODE } from 'utils/Constants';

const MedicalHistory = () => {
    const [documents, setDocuments] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        patientAxios.get(`/patient/${user.id}/medical-history`).then((response) => {
            setDocuments(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const handleDocumentClick = async (document) => {
        try {
            const response = await patientAxios.get(`/patient/${user.id}/medical-history/${document._id}`);
            const data = response.data;
            downloadDocument(data);
        } catch (err) {
            console.log('Error downloading docs ', err.message);
        }
    };

    const handleDeleteDocument = (document) => {
        try {
            patientAxios.patch(`/patient/${user.id}/medical-history/${document._id}`).then((response) => {
                if (response.status === OK_STATUS_CODE) {
                    Swal.fire({ title: 'Deleted Successfully', icon: 'success' });
                    setDocuments(documents.filter((doc) => doc._id !== document._id));
                }
            });
        } catch (err) {
            Swal.fire({ title: 'Deletion Failed', icon: 'error' });
        }
    };

    const handleUploadDocument = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', selectedFile);
        patientAxios.patch(`/patient/${user.id}/medical-history`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                setDocuments(response.data.healthRecords);
                setOpenDialog(false);
                setTitle('');
                setSelectedFile(null);
                setUploadedFileName('');
            })
            .catch((error) => {
                console.error('Error uploading document', error);
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUploadedFileName(file.name);
    };

    return loading ? <Loader /> : (
        <>
            <Card
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <CardContent>
                    <Stack spacing={3}>
                        <div>
                            <Grid container spacing={3}>
                                <CardHeader title="Medical History" />
                                <Grid item xs={12}>
                                    <List>
                                        {documents &&
                                            documents.map((document) => (
                                                <ListItem
                                                    key={document._id}
                                                    button
                                                    onClick={() => handleDocumentClick(document)}
                                                    sx={{ marginTop: '2%' }}
                                                >
                                                    <ListItemAvatar>
                                                        <Attachment color="primary" />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={document.recordTitle} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            onClick={() => handleDeleteDocument(document)}
                                                        >
                                                            <Delete color="primary" />
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
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={() => setOpenDialog(true)}>
                        Upload Health Record
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Upload Health Record</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Document
                        <input type="file" accept=".pdf, .doc, .docx" style={{ display: 'none' }} onChange={handleFileChange} />
                    </Button>
                    {uploadedFileName && (
                        <Typography variant='subtitle2'>Uploaded File: {uploadedFileName}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleUploadDocument} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MedicalHistory;
