import { Stack, Unstable_Grid2 as Grid, List, ListItemButton, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardHeader, ListItemAvatar, CardActions, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Delete from '@mui/icons-material/Delete';
import { patientAxios } from 'utils/AxiosConfig';
import Loader from 'ui-component/Loader';
import { Attachment } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { PATIENT_BASE_URL } from 'utils/Constants';
import { showFailureAlert, showSuccessAlert } from 'utils/swal';
import { useSelector } from 'react-redux';

const MedicalHistory = ({ patientId }) => {
    const [documents, setDocuments] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    const userId = patientId ? patientId : user.id;
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        patientAxios.get(`/patient/${userId}/medical-history`).then((response) => {
            setDocuments(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const createDocumentLink = (document) => {
        return `${PATIENT_BASE_URL}/patient/${userId}/medical-history/${document._id}`;
    };

    const handleDeleteDocument = (event, document) => {
        event.preventDefault();
        event.stopPropagation();
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    patientAxios.patch(`/patient/${userId}/medical-history/${document._id}`)
                        .then(() => {
                            showSuccessAlert('Deleted Successfully', '');
                                setDocuments(documents.filter((doc) => doc._id !== document._id));
                        });
                } catch (err) {
                    showFailureAlert('Deletion Failed', '');
                }
            }
        });
    };

    const handleUploadDocument = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', selectedFile);
        patientAxios.patch(`/patient/${userId}/medical-history`, formData, {
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
                                                <ListItemButton
                                                    key={document._id}
                                                    sx={{ marginTop: '2%' }}
                                                    href={createDocumentLink(document)}
                                                >
                                                    <ListItemAvatar>
                                                        <Attachment color="primary" />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={document.recordTitle} />
                                                    <ListItemSecondaryAction>
                                                        {!patientId &&
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={(e) => handleDeleteDocument(e, document)}
                                                            >
                                                                <Delete color="primary" />
                                                            </IconButton>
                                                        }
                                                    </ListItemSecondaryAction>
                                                </ListItemButton>
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
                        <input type="file" accept=".pdf, .jpg, .png, .jpeg" style={{ display: 'none' }} onChange={handleFileChange} />
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
