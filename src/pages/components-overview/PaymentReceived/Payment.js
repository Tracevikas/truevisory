import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Grid } from '@mui/material';
import { InputLabel, Select, MenuItem } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FormHelperText } from '../../../../node_modules/@mui/material/index';


export default function RefundStatus(props) {
    const { amountReceived, paymentMode, paymentTransactionNumber, bankName, date, receipt, receiptDate, paymentStatus, paymentStatusComment } = props.currentPaymentRecievedDetails;
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!Object.keys(props.currentPaymentRecievedDetailsErros).includes(name)) {
            props.setCurrentPaymentRecvedDetails({ ...props.currentPaymentRecievedDetails, [name]: value });
        } else {
            props.setCurrentPaymentRecvedDetails({ ...props.currentPaymentRecievedDetails, [name]: value });
            props.setCurrentPaymentRecvedDetailsErros({ ...props.currentPaymentRecievedDetailsErros, [name]: "" });
        }
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <form action="">
                <Card >
                    <CardContent>
                        <Grid container spacing={2} columns={16}>
                            {/* amount_received */}
                            <Grid item xs={8}>
                                <TextField fullWidth label="Amount Received" type="text" required id="fullWidth" name='amountReceived'
                                    value={amountReceived}
                                    onChange={handleChange}
                                />
                                {props.currentPaymentRecievedDetailsErros.amountReceived && (
                                    <FormHelperText error>{props.currentPaymentRecievedDetailsErros.amountReceived}</FormHelperText>
                                )}
                            </Grid>
                            {/* payment_mode */}
                            <Grid item xs={8}>
                                <FormControl fullWidth required>
                                    {/* <h4>Payment Method</h4> */}
                                    <InputLabel>Payment Method</InputLabel>
                                    <Select
                                        value={paymentMode}
                                        name='paymentMode'
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='CARD_SWIPE'>Card Swipe</MenuItem>
                                        <MenuItem value="RTGS">RTGS</MenuItem>
                                        <MenuItem value="NEFT_IMPS">NEFT / IMPS</MenuItem>
                                        <MenuItem value="CHEQUE">Cheque</MenuItem>
                                        <MenuItem value="UPI">UPI</MenuItem>
                                        <MenuItem value="CASH">CASH</MenuItem>
                                        <MenuItem value="DEPOSIT_SLIP">Deposit Slip</MenuItem>
                                    </Select>
                                </FormControl>
                                {props.currentPaymentRecievedDetailsErros.paymentMode && (
                                    <FormHelperText error>{props.currentPaymentRecievedDetailsErros.paymentMode}</FormHelperText>
                                )}
                            </Grid>

                            {/* payment_transaction_number */}
                            <Grid item xs={8}>
                                <TextField fullWidth label="Payment Transaction Number" type="text" id="fullWidth"
                                    value={paymentTransactionNumber}
                                    name="paymentTransactionNumber"
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* bank_name */}
                            <Grid item xs={8}>
                                <TextField fullWidth label="Bank Name" type="text" id="fullWidth"
                                    value={bankName}
                                    name='bankName'
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* date */}
                            <Grid item xs={8}>
                                <TextField style={{ width: '100%' }} label="Payment Date" type="date" value={date} name="date" onChange={handleChange}
                                    InputLabelProps={{ shrink: true, }} />
                                {props.currentPaymentRecievedDetailsErros.date && (
                                    <FormHelperText error>{props.currentPaymentRecievedDetailsErros.date}</FormHelperText>
                                )}
                            </Grid>

                            {/* receipt  */}
                            <Grid item xs={8}>
                                <FormControl fullWidth required>
                                    <InputLabel>Builder Receipt</InputLabel>
                                    <Select value={receipt} name="receipt" onChange={handleChange}>
                                        <MenuItem value="true">Yes</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                </FormControl>
                                {props.currentPaymentRecievedDetailsErros.receipt && (
                                    <FormHelperText error>{props.currentPaymentRecievedDetailsErros.receipt}</FormHelperText>
                                )}
                            </Grid>
                            {/* receipt_date */}
                            <Grid item xs={8}>
                                <TextField style={{ width: '100%' }} label="Builder Receipt Date" name="receiptDate" type="date" value={receiptDate} onChange={handleChange}
                                    InputLabelProps={{ shrink: true, }} />
                            </Grid>

                            {/* payment_status */}
                            <Grid item xs={8}>
                                <FormControl fullWidth required>
                                    {/* <h4>payment_status</h4> */}
                                    <InputLabel>Payment Status</InputLabel>
                                    <Select value={paymentStatus} name="paymentStatus" onChange={handleChange}>
                                        <MenuItem value="CLEARED">Cleared</MenuItem>
                                        <MenuItem value="NOT_CLEARED">Not Cleared</MenuItem>
                                    </Select>
                                </FormControl>
                                {props.currentPaymentRecievedDetailsErros.paymentStatus && (
                                    <FormHelperText error>{props.currentPaymentRecievedDetailsErros.paymentStatus}</FormHelperText>
                                )}
                            </Grid>

                            {/* remarks */}
                            <Grid item xs={16}>
                                <TextareaAutosize color="success" placeholder={"Remarks"} minRows={8} style={{
                                    height: '62px', width: '100%'
                                }} value={paymentStatusComment}
                                    name="paymentStatusComment"
                                    onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </Box>
    );
}