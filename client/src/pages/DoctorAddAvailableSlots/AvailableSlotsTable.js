
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';






const availableSlotsTable = ({ availableSlots } ) => {

    return (
        <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>From</TableCell>
                            <TableCell>Until</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(availableSlots) &&
                            availableSlots.map((slot) => (
                                <TableRow key={slot.from}>
                                    <TableCell> 
                                        {new Date(slot.from).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(slot.until).toLocaleString()}
                                    </TableCell>
                                </TableRow>

                            ))}

                    </TableBody>
                </Table>

                                
            </TableContainer>
    );
};

export default availableSlotsTable;