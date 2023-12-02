import React from 'react';
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
  Slide,
} from '@mui/material';

const FilterDropdown = ({ filterData, onChange, isDrawerOpen, handleDrawerClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{ style: { height: '100%', overflow: 'hidden' } }}
    >
      <Slide direction="left" in={isDrawerOpen} mountOnEnter unmountOnExit>
        {filterData.length > 0 ? (
          <Grid container spacing={2} sx={{ padding: '4%', backgroundColor: '#f0f0f0', width: 300, height: '100%' }}>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="h5" sx={{ marginBottom: '2%', color: '#333' }}>
                Apply Filters on this page:
              </Typography>
            </Grid>
            {filterData.map((filter, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{ p: 2, backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, color: '#555' }}>
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
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Select...</InputLabel>
                      <Select value={filter.selectedValue} onChange={(event) => onChange(index, event.target.value)}>
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
        ) : (
          <Typography variant="body2" sx={{ color: '#555', textAlign: 'center', padding: '2%' }}>
            No Filter Data on this page
          </Typography>
        )}
      </Slide>
    </Drawer>
  );
};

export default FilterDropdown;
