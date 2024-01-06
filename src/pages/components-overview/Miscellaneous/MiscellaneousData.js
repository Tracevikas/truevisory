import * as React from 'react';
import Grid from '@mui/material/Grid';
import { TextField, FormControl, Select, InputLabel, MenuItem, TextareaAutosize, Button } from '@mui/material';

export default function BookingSharedBy() {
    const [miscellaneousData, setForBuilder] = React.useState({

        Incentive_Status: '',
        SIF_Status: '',
        SIF_Link: '',
        miscelleous_Remarks: ''

    })

    const { Incentive_Status, SIF_Status, SIF_Link, miscelleous_Remarks } = miscellaneousData;

    const handleChanged = () => {
        alert("Hii")
    }
    return (
        <form action="">


            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <FormControl fullWidth required>
                        <InputLabel>Incentive Status</InputLabel>
                        <Select
                            id="Incentive_Status"
                            value={Incentive_Status}
                            onChange={(e) => setForBuilder({ ...miscellaneousData, Incentive_Status: e.target.value })}
                        >
                            <MenuItem value="yes">YES</MenuItem>
                            <MenuItem value="no">NO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <TextField fullWidth
                        required
                        id="SIF_Status"
                        type="text"
                        value={SIF_Status}
                        onChange={(e) => setForBuilder({ ...miscellaneousData, SIF_Status: e.target.value })}
                        label="SIF Status"
                    />
                </Grid>
                <Grid item xs={16}>
                    <TextField required fullWidth id="SIF_Link" type="text" value={SIF_Link}
                        onChange={(e) => setForBuilder({ ...miscellaneousData, SIF_Link: e.target.value })}
                        label="SIF Link"
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextareaAutosize style={{ width: '203%' }} color="success" placeholder={"Type Something Remarks"} value={miscelleous_Remarks} minRows={6} onChange={(e) => setForBuilder({ ...miscellaneousData, miscelleous_Remarks: e.target.value })} />
                </Grid>
            </Grid>
            <Button onClick={handleChanged} variant="conatined">Submit</Button>
        </form>
    );
}