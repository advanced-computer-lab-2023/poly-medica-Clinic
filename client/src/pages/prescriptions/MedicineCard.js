import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton } from '@mui/material';
import { OK_STATUS_CODE, PHARMACY_BASE_URL } from '../../utils/Constants';
import { Add } from '@mui/icons-material';
import { IconMinus } from '@tabler/icons';
import { patientAxios } from 'utils/AxiosConfig';
export default function MedicineCard({ medicine, selectedPrescription, setSelectedPrescription }) {

    const handleMedicineAmount = (value) => {
        medicine.amount += value;
        if (medicine.amount < 1) medicine.amount = 1;
        const medicineIndex = selectedPrescription.medicines.findIndex(
            (prescriptionMedicine) => prescriptionMedicine.medicineId.toString() === medicine._id.toString()
        );
        if (medicineIndex !== -1) {
            selectedPrescription.medicines[medicineIndex].amount = medicine.amount;
            patientAxios.patch(`/prescriptions/${selectedPrescription._id}`, { prescription: selectedPrescription })
                .then(response => {
                    if (response.status === OK_STATUS_CODE) {
                        setSelectedPrescription(response.data);
                    }
                });
        }
    };

    return (
        <Card sx={{ maxWidth: 250, margin: '2%', padding: '2%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
                    alt="green iguana"
                    sx={{ objectFit: 'contain', cursor: 'default' }}
                />
                <CardContent sx={{ cursor: 'default', textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {medicine.name}
                    </Typography>
                    <Grid container alignItems="center" maxHeight={50}>
                        <Grid item xs={6}>
                            <Typography variant='h2' color="text.secondary">
                                {medicine.amount}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton onClick={() => handleMedicineAmount(1)}>
                                <Add />
                            </IconButton>
                            <IconButton onClick={() => handleMedicineAmount(-1)} >
                                <IconMinus />
                            </IconButton>
                        </Grid>
                    </Grid>



                </CardContent>
            </CardActionArea>
        </Card >
    );
}
