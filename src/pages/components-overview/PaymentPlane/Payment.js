import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToPaymentPlane } from 'store/reducers/PaymentPlane/paymentSlice';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


export default function PaymentPlan() {
    const [paymentPlan, setpaymentPlan] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const paymentPlanData = useSelector((state) => state.paymentSlice.data);
    const loading = useSelector((state) => state.paymentSlice.loading)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to send data to API
        dispatch(sendDataToPaymentPlane(paymentPlan));
        setpaymentPlan('')
        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/paymentplanlist')
        }, 1000);
    };
    console.log(111, loading, paymentPlanData)


    return (

        <Box sx={{ flexGrow: 1 }}>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Card>
                <CardContent>
                    <Grid container spacing={2} columns={16} >
                        <Grid item xs={16}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth required>
                                    <TextField
                                        required
                                        id="paymentPlan "
                                        type="text"
                                        value={paymentPlan}
                                        onChange={(e) => setpaymentPlan(e.target.value)}
                                        label="Payment Plan"
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Button style={{ margin: "12px 0px 10px 0px" }} disabled={paymentPlan.length === 0} variant="contained" onClick={handleSubmit}>Submit</Button>
                                </FormControl>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>


    );


}