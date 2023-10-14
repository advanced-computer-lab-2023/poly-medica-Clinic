
import {
  Drawer,
  Select,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Grid,
  TextField,
} from '@mui/material';

const FilterDropdown = ({ filterData, onChange, isDrawerOpen, handleDrawerClose }) => {

  return (
    <Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
      <Grid container spacing={2} sx={{ padding: '2%' }}>
        {filterData.map((filter, index) => (
          <Grid item xs={4} key={index}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Filter By {filter.attribute}
              </Typography>
              {filter.attribute === 'Available Slots' ? (
                <TextField
                  type="datetime-local"
                  value={filter.selectedValue}
                  onChange={(event) => onChange(index, event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select...</InputLabel>
                  <Select
                    value={filter.selectedValue}
                    onChange={(event) => onChange(index, event.target.value)}
                  >
                    <MenuItem value="">
                      <em>Select...</em>
                    </MenuItem>
                    {filter.values.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};

export default FilterDropdown;
