import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getDay, getTime } from '../../utils/DateFormatter.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
const LIMIT_PER_PAGE = 4;

const availableSlotsTable = ({ availableSlots } ) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const randomNumberInRange = (min, max) => { 
        return Math.floor(Math.random()  
                * (max - min + 1)) + min; 
    }; 
    return (
        <>
            <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: theme.palette.secondary.light }}>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>Until</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(availableSlots) &&
                                availableSlots
                                    .slice(page*LIMIT_PER_PAGE, page*LIMIT_PER_PAGE + LIMIT_PER_PAGE)
                                    .map((slot) => (
                                        <TableRow hover key={() => randomNumberInRange(1e7, 2e7)}>
                                            <TableCell> 
                                                {`${getDay(slot.from)} at ${getTime(slot.from)}`}
                                            </TableCell>
                                            <TableCell>
                                                {`${getDay(slot.until)} at ${getTime(slot.until)}`}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                        </TableBody>
                    </Table>

                                    
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={LIMIT_PER_PAGE}
                    rowsPerPage={LIMIT_PER_PAGE}
                    count={availableSlots.length}
                    page={page}
                    onPageChange={handleChangePage}
                />
        </>
            
    );
};

export default availableSlotsTable;