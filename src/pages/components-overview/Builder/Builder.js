import * as React from 'react';
import Grid from '@mui/material/Grid';
import { TextField, FormControl, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToBuilder } from 'store/reducers/Builder/builderSlice';
import { useNavigate } from "react-router-dom";

export default function Builder() {
    const dispatch = useDispatch();
    const [builderName, setBuilderName] = React.useState('');
    const builderdata = useSelector((state) => state.builderSlice.data);
    const loading = useSelector((state) => state.builderSlice.loading)
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to send data to API
        dispatch(sendDataToBuilder(builderName));
        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate("/builderlist")
        }, 1000);
        setBuilderName('')
    };
    console.log(111, loading, builderdata)
    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Card>
                <CardContent>
                    <Grid container spacing={2} columns={16} >
                        <Grid item xs={16}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth required>
                                    <TextField required
                                        id="builderName "
                                        type="text"
                                        value={builderName}
                                        onChange={(e) => setBuilderName(e.target.value)}
                                        label="Builder Name"
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Button style={{ margin: "12px 0px 10px 0px" }} disabled={builderName.length === 0} variant="contained" onClick={handleSubmit}>Submit</Button>
                                </FormControl>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}