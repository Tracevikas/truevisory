import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Broker() {
    const [formData, setFormData] = React.useState({
        broker_id: '',
        broker_name: '',
        broker_email: '',
        broker_contact: '',
        broker_pan: '',
        broker_aadhaar: '',
        broker_remarks: ''
    });

    // const [error, setError] = React.useState('');
    const { broker_id, broker_name, broker_email, broker_contact, broker_pan, broker_aadhaar, broker_remarks } = formData;

    function handleSubmit(event) {
        event.preventDefault();
        // Access the form data in the `formData` state
    }




    return (

        <Box
            sx={{ flexGrow: 1 }}

        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} columns={16} >
                    <Grid item xs={8}>

                        <TextField fullWidth label="Broker Id" type="text" required id="fullWidth outlined-error"
                            value={broker_id}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Broker Name" type="text" required id="fullWidth"
                            value={broker_name}
                            onChange={(e) => setFormData({ ...formData, broker_name: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField fullWidth label="Broker Email" type="email" required id="fullWidth"
                            value={broker_email}
                            onChange={(e) => setFormData({ ...formData, broker_email: e.target.value })} />

                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Broker Contact No" type="text" required id="fullWidth"
                            value={broker_contact}
                            onChange={(e) => setFormData({ ...formData, broker_contact: e.target.value })} />

                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Broker Pan No" type="text" required id="fullWidth"
                            value={broker_pan}
                            onChange={(e) => setFormData({ ...formData, broker_pan: e.target.value })} />

                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Broker Aadhaar No" type="text" required id="fullWidth"
                            value={broker_aadhaar}
                            onChange={(e) => setFormData({ ...formData, broker_aadhaar: e.target.value })} />

                    </Grid>

                    <Grid item xs={8}>

                        <TextField fullWidth label="Broker Remarks" type="text" id="fullWidth"
                            value={broker_remarks}
                            onChange={(e) => setFormData({ ...formData, broker_remarks: e.target.value })} />

                    </Grid>
                </Grid>
                <Stack spacing={2} style={{ marginTop: "10px" }} direction="row">
                    <Button variant="contained" >Submit</Button>
                </Stack>
            </form>
        </Box>
    );
}