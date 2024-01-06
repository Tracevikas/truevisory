import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { Button, FormControl } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function RefundStatus() {
    const [refundData, setrefundData] = React.useState({
        refund_amount: 0,
        refund_reason_amount: '',
        refund_date: new Date().toLocaleDateString()
    });

    // const [error, setError] = React.useState('');
    const { refund_amount, refund_date, refund_reason_amount } = refundData;

    function handleSubmit(event) {
        event.preventDefault();
        // Access the form data in the `refundData` state
    }




    return (

        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSubmit}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Refund</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <TextField fullWidth label="Refund Amount" type="text" required id="fullWidth outlined-error"
                                    value={refund_amount}
                                    onChange={(e) => setrefundData({ ...refundData, refund_amount: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField fullWidth label="Refund Reason Amount" type="text" required id="fullWidth"
                                    value={refund_reason_amount}
                                    onChange={(e) => setrefundData({ ...refundData, refund_reason_amount: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField fullWidth disabled label="Refund Reason Date" type="text" required id="fullWidth"
                                    value={refund_date}
                                />
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <FormControl fullWidth>
                    <Button style={{ margin: "12px 0px 10px 0px" }} variant="contained">Submit</Button>
                </FormControl>
            </form>
        </Box>


    );
}