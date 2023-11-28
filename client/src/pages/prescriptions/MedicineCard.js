import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton } from '@mui/material';
import { PHARMACY_BASE_URL } from '../../utils/Constants';
import { Add, Close } from '@mui/icons-material';
import { IconMinus } from '@tabler/icons';
import { updatePrescription } from 'utils/PrescriptionUtils';
export default function MedicineCard({ medicine, selectedPrescription, setSelectedPrescription }) {

    const handleMedicineAmount = (value) => {
        medicine.amount += value;
        if (medicine.amount < 1) medicine.amount = 1;
        const medicineIndex = selectedPrescription.medicines.findIndex(
            (prescriptionMedicine) => prescriptionMedicine.medicineId.toString() === medicine._id.toString()
        );
        if (medicineIndex !== -1) {
            selectedPrescription.medicines[medicineIndex].amount = medicine.amount;
            updatePrescription(selectedPrescription, setSelectedPrescription);
        }
    };

    const handleMedicineDelete = () => {
        const updatedMedicines = selectedPrescription.medicines.filter(
            (prescriptionMedicine) => prescriptionMedicine.medicineId.toString() !== medicine._id.toString()
        );
        selectedPrescription.medicines = updatedMedicines;
        updatePrescription(selectedPrescription, setSelectedPrescription);
    };

    return (
        <Card sx={{ maxWidth: 250, margin: '2%', padding: '4%', border:'2px solid black', background: '#F5F5F5' }}>
            <CardActionArea>
                <IconButton onClick={() => handleMedicineDelete()} >
                    <Close />
                </IconButton>
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
                        <Grid item xs={3}>
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
