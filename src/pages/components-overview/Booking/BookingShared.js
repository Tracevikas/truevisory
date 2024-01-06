import * as React from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, Grid,InputLabel} from '@mui/material';

export default function FullWidthTextField() {
    // const [formData, setFormData] = React.useState({
    //     emp_id: '',
    //     emp_name: '',
    //     emp_password: '',
    //     emp_email: '',
    //     emp_code: '',
    //     emp_designation: '',
    //     emp_head: '',
    //     emp_status: '',
    // });

    // const [error, setError] = React.useState('');
    // const { emp_id, emp_name, emp_password, emp_email, emp_code, emp_designation, emp_head, emp_status } = formData;

    function handleSubmit(event) {
        event.preventDefault();
        // Access the form data in the `formData` state
    }




    return (

        <Box
            sx={{ flexGrow: 1 }}

        >
            <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
            <InputLabel required>Booking SharedBy</InputLabel>
                    <Select fullWidth required
                    >
                      <MenuItem value="bookingstatus">1</MenuItem>
                      <MenuItem value="live">2</MenuItem>
                      <MenuItem value="underprocess">3</MenuItem>
                      <MenuItem value="clientcancel">4</MenuItem>
                      <MenuItem value="buildercancel">5</MenuItem>
                      <MenuItem value="transferproperty">6</MenuItem>
                    </Select>
                  </Grid>
            </form>
        </Box>


    );
}