import {
    Autocomplete,
    Avatar,
    TextField,
    Grid,
    Button
} from '@mui/material';
import { PHARMACY_BASE_URL } from 'utils/Constants';

export const AddMedicine = ({ medicines, setSelectedMedicine, selectedMedicine, handleSaveClick, handleCancelClick }) => {

    return (<Grid item xs={4}>
        <Grid container spacing={2} sx={{ padding: '2%' }}>
            <Grid item xs={12}>
                <Autocomplete
                    value={selectedMedicine ? selectedMedicine : medicines[0]}
                    onChange={(event, newValue) => setSelectedMedicine(newValue)}
                    options={medicines}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <Avatar
                                alt={option.name}
                                src={`${PHARMACY_BASE_URL}/medicines/${option._id}/pictures`}
                            />
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Choose a medicine" />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleSaveClick} color="primary">
                    Save
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleCancelClick} color="primary">
                    Cancel
                </Button>
            </Grid>
        </Grid>
    </Grid>
    );
};
