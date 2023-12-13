import { Radio, FormControlLabel  , RadioGroup, FormLabel, FormControl } from '@mui/material';

const FamilyMemberOptions = ({ handleChange, value }) => {
    

    return (
        <FormControl>
            <FormLabel>Add Family Memeber Option</FormLabel>
            <RadioGroup
                defaultValue='Registered-Family-Member'
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}
                sx={{ my: 1 }}
            >
                <FormControlLabel  value='Unregistered-Family-Member' control={<Radio />} label='Unregistered Family Member' />
                <FormControlLabel  value='Registered-Family-Member' control={<Radio />} label='registered Family Member' />
            </RadioGroup>
        </FormControl>
    );
};

export default FamilyMemberOptions;