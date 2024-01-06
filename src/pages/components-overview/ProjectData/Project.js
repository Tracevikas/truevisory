import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { paymentResponseData } from 'store/reducers/PaymentPlane/paymentSlice';
import { sendDataToProject } from 'store/reducers/Project/projectSlice';
import { builderResponseData } from 'store/reducers/Builder/builderSlice';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";



export default function Project() {
    const dispatch = useDispatch()
    const [projectName, setProjectName] = React.useState("");
    const [builder, setBuilder] = React.useState("")
    const [paymentPlans, setPaymentPlan] = React.useState([]);
    const [rc, setRC] = React.useState("");
    const [ra, setRA] = React.useState("");
    const [remarks, setRemarks] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            projectName: projectName,
            builder: builder,
            paymentPlans: paymentPlans,
            rc: rc,
            ra: ra,
            remarks: remarks
        }
        setProjectName('')
        setBuilder('')
        setPaymentPlan('')
        setRA('')
        setRC('')
        setRemarks('')
        dispatch(sendDataToProject(payload));
        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/projectlist')
        }, 1000);
    };


    // implement Payment Plan API 
    const builderdata = useSelector((state) => state.builderSlice.data);
    const paymentPlanData = useSelector((state) => { state.projectSlice.data })
    const paymentData = useSelector((state) => state.paymentSlice.data);
    // const loading = useSelector((state) => state.paymentSlice.loading);
    // const error = useSelector((state) => state.paymentSlice.error);

    useEffect(() => {
        // Dispatch action to fetch data on component mount
        dispatch(builderResponseData())
        dispatch(paymentResponseData());
    }, []);


    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <InputLabel>Builder</InputLabel>
                                    <Select fullWidth
                                        value={builder}
                                        onChange={(e) => setBuilder(e.target.value)} >
                                        {builderdata && builderdata.content && builderdata.content.map((item, index) => {
                                            return (
                                                <MenuItem key={index.builderId} value={item.builderId}>{item.builderName}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <TextField required
                                        label="Project Name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <InputLabel>Payment Plan</InputLabel>
                                    <Select fullWidth

                                        multiple // Enable multiple selection
                                        value={paymentPlans || []}
                                        onChange={(e) => setPaymentPlan(e.target.value)}
                                    >
                                        {paymentData && paymentData.content && paymentData.content.map((item, index) => {
                                            return (
                                                <MenuItem key={index.paymentPlanId} value={item.paymentPlanId}>{item.paymentPlan}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <TextField required label="RC" type="number" value={rc} onChange={(e) => setRC(Number(e.target.value) > 100 ? '100' : e.target.value)} fullWidth
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <TextField required label="RA" type="number" value={ra} onChange={(e) => setRA(Number(e.target.value) > 100 ? '100' : e.target.value)} fullWidth
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth  >
                                    <TextField label="Remark" value={remarks} onChange={(e) => setRemarks(e.target.value)} fullWidth
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

        </div>
    );

}