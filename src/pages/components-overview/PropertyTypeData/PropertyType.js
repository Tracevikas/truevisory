import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { TextField, FormControl, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import { sendDataToPropertyType } from 'store/reducers/PropertyType/propertySlice';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

export default function PropertyType() {
    const dispatch = useDispatch();
    const [propertyType, setpropertyType] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();
      
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to send data to API
        dispatch(sendDataToPropertyType(propertyType));
        setpropertyType('')
        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/propertytypelist')
        }, 1000);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div spacing={2}>{successMessage && <Alert severity="success">{successMessage}</Alert>}</div>
            <Card>
                <CardContent>
                    <Grid container spacing={2} columns={16} >
                        <Grid item xs={16}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth required>
                                    <TextField
                                        required
                                        id="Property Type"
                                        type="text"
                                        value={propertyType}
                                        onChange={(e) => setpropertyType(e.target.value)}
                                        label="Property Type"
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Button style={{ margin: "12px 0px 10px 0px" }} disabled={propertyType.length === 0} variant="contained" onClick={handleSubmit}>Submit</Button>
                                </FormControl>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}