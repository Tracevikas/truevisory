import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


//add style for grid layout


export default function FullWidthTextField() {
    const [formData, setFormData] = React.useState({
        id: '',
        name: '',
        email: '',
        contact: '',
        pan: '',
        aadhaar: '',
        applicant: '',
        remarks: ''
    });

    // const [error, setError] = React.useState('');
    const { id, name, email, contact, pan, aadhaar, applicant, remarks } = formData;

    function handleSubmit(event) {
        event.preventDefault();
        // Access the form data in the `formData` state
        alert("Hii")
    }


    /* return (
         <Box
             sx={{
                 width: 500,
                 maxWidth: '100%',
                 margin: "0px 10px 10px 20px"
             }}
         >
             <form onSubmit={handleSubmit}>
                 <Grid container spacing={2}>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Id" type="text" required id="fullWidth outlined-error"
                             value={id}
                             onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                         />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Name" type="text" required id="fullWidth"
                             value={name}
                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Email" type="email" required id="fullWidth"
                             value={email}
                             onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Contact No" type="text" required id="fullWidth"
                             value={contact}
                             onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Pan No" type="text" required id="fullWidth"
                             value={pan}
                             onChange={(e) => setFormData({ ...formData, pan: e.target.value })} />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Aadhaar No" type="text" required id="fullWidth"
                             value={aadhaar}
                             onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })} />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Co-Applicant" type="text" id="fullWidth"
                             value={applicant}
                             onChange={(e) => setFormData({ ...formData, applicant: e.target.value })} />
                     </Grid>
                     <Grid item xs={12}>
                         <TextField fullWidth label="Client Remarks" type="text" id="fullWidth"
                             value={remarks}
                             onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
                     </Grid>
                 </Grid>
                 <Stack spacing={2} style={{ marginTop: "10px" }} direction="row">
                     <Button variant="contained" onSubmit={handleSubmit}>Submit</Button>
                 </Stack>
             </form>
         </Box>
     ); */


    return (

        <Box
            sx={{ flexGrow: 1 }}

        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Id" type="text" required id="fullWidth outlined-error"
                            value={id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Name" type="text" required id="fullWidth"
                            value={name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Email" type="email" required id="fullWidth"
                            value={email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Contact No" type="text" required id="fullWidth"
                            value={contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Pan No" type="text" required id="fullWidth"
                            value={pan}
                            onChange={(e) => setFormData({ ...formData, pan: e.target.value })} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Aadhaar No" type="text" required id="fullWidth"
                            value={aadhaar}
                            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })} />

                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Co-Applicant" type="text" id="fullWidth"
                            value={applicant}
                            onChange={(e) => setFormData({ ...formData, applicant: e.target.value })} />

                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Client Remarks" type="text" id="fullWidth"
                            value={remarks}
                            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />

                    </Grid>
                </Grid>
                <Stack spacing={2} style={{ marginTop: "10px" }} direction="row">
                    <Button variant="contained" >Submit</Button>
                </Stack>
            </form>
        </Box>


    );
}