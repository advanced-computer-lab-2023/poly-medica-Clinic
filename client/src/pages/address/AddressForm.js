import {
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const AddressForm = ({
    handleFormInputChange,
    handleSubmit,
    object,
    objectAttributes,
}) => {
    return (
        <form onSubmit={(e) => handleSubmit(e)} id='addressForm'>
            {objectAttributes.map((attribute, index) => (
                <FormControl required fullWidth key={index}>
                    <TextField
                        name={attribute}
                        label={attribute}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={object[attribute]}
                        onChange={handleFormInputChange}
                        required
                    />
                </FormControl>
            ))}
            <FormControl required fullWidth key={'primaryAddress'}>
                <FormControlLabel
                    onChange={(e) => {
                        object.primary = true;
                        handleFormInputChange(e);
                    }}
                    checked={object.primary}
                    control={<Checkbox />}
                    label='primary'
                />
            </FormControl>
        </form>
    );
};
export default AddressForm;
