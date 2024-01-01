import React, { useState } from 'react';
import {
  Drawer,
  Typography,
  Card,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Slide,
  TextField
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FilterDropdown = ({ filterData, onChange, isDrawerOpen, handleDrawerClose }) => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setActiveFilterIndex((prevIndex) => (prevIndex - 1 + filterData.length) % filterData.length);
    } else if (direction === 'right') {
      setActiveFilterIndex((prevIndex) => (prevIndex + 1) % filterData.length);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{ style: { height: 'calc(100% - 80px)', overflow: 'hidden', backgroundColor: '#4527a0', borderRadius: '30px' } }}
    >
      <Slide direction="left" in={isDrawerOpen} mountOnEnter unmountOnExit>
        {filterData.length > 0 ? (
          <Grid container spacing={2} sx={{ padding: '4%', width: 300, height: '100%' }}>
            <Grid item xs={12}>
              <Typography align={'center'} sx={{ color: 'white ' }}>
                Apply Filters:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Grid container justifyContent="space-between">
                  <IconButton onClick={() => handleArrowClick('left')}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ mb: 1, color: '#b39ddb' }}>
                    {filterData[activeFilterIndex].attribute}
                  </Typography>
                  <IconButton onClick={() => handleArrowClick('right')}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
                {filterData[activeFilterIndex].attribute === 'Available Slots' ? (
                  <TextField
                    type="datetime-local"
                    value={filterData[activeFilterIndex].selectedValue}
                    onChange={(event) => onChange(activeFilterIndex, event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={filterData[activeFilterIndex].selectedValue}
                      onChange={(event) => onChange(activeFilterIndex, event.target.value)}
                    >
                      {filterData[activeFilterIndex].values.map((value) => (
                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" sx={{ color: '#4527a0', textAlign: 'center', padding: '2%' }}>
            No Filter Data on this page
          </Typography>
        )}
      </Slide>
    </Drawer>
  );
};

export default FilterDropdown;
