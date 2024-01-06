import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { TextField, FormControl, Grid, Button } from '@mui/material';

export default function BookingAccordion() {
  const [costData, setcostData] = React.useState({
    bsp: '',
    bookingDiscountId: '',
    bookingId: '',
    discountAmount: '',
    discountType: '',
    effectiveBSP: '',
    bspCost: '',
    bookingOtherChargeid: '',
    bookingOtherid: '',
    otherChargeName: '',
    otherChargeAmount: '',
    gst: '',
    totalCost: ''
  })


  const { bsp, bookingDiscountId, bookingId, discountAmount, discountType, effectiveBSP, bspCost, bookingOtherChargeid, bookingOtherid, otherChargeName, otherChargeAmount, gst, totalCost } = costData

  function handleSubmit(event) {
    event.preventDefault();
    // Access the form data in the `formData` state
  }
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box m={2} textAlign="center">
            <Typography variant="h4">
              Cost Related
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>

            {/* BSP */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>BSP</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <TextField fullWidth label="BSP" type="text" id="fullWidth outlined-error"
                        value={bsp}
                        onChange={(e) => setcostData({ ...costData, bsp: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Discount Filds  */}

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Discount</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth label="Booking Discount Id" type="text" required id="fullWidth outlined-error"
                        value={bookingDiscountId}
                        onChange={(e) => setcostData({ ...costData, bookingDiscountId: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth label="Booking Id" type="text" id="fullWidth outlined-error" required
                        value={bookingId}
                        onChange={(e) => setcostData({ ...costData, bookingId: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth required label="Discount Type" type="text" id="fullWidth outlined-error"
                        value={discountType}
                        onChange={(e) => setcostData({ ...costData, discountType: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                      <TextField fullWidth required label="Discount Amount" type="text" id="fullWidth outlined-error"
                        value={discountAmount}
                        onChange={(e) => setcostData({ ...costData, discountAmount: e.target.value })}
                      />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>


            {/* Effective BSP  */}

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Effective BSP</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <TextField fullWidth label="Effective BSP" type="text" id="fullWidth outlined-error"
                        value={effectiveBSP}
                        onChange={(e) => setcostData({ ...costData, effectiveBSP: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* BSP COST  */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>BSP Cost</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <TextField fullWidth label="BSP Cost" type="text" id="fullWidth outlined-error"
                        value={bspCost}
                        onChange={(e) => setcostData({ ...costData, bspCost: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Other Charges  */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Other Charges</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth label="Booking Other Charge Id" type="text" required id="fullWidth outlined-error"
                        value={bookingOtherChargeid}
                        onChange={(e) => setcostData({ ...costData, bookingOtherChargeid: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth label="Booking Id" type="text" id="fullWidth outlined-error" required
                        value={bookingOtherid}
                        onChange={(e) => setcostData({ ...costData, bookingOtherid: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth required label="Other Charge Name" type="text" id="fullWidth outlined-error"
                        value={otherChargeName}
                        onChange={(e) => setcostData({ ...costData, otherChargeName: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <TextField fullWidth required label="Other Charge Amount" type="text" id="fullWidth outlined-error"
                        value={otherChargeAmount}
                        onChange={(e) => setcostData({ ...costData, otherChargeAmount: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* GST  */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>GST</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <TextField fullWidth label="GST" type="text" id="fullWidth outlined-error"
                        value={gst}
                        onChange={(e) => setcostData({ ...costData, gst: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Total Cost  */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Total Cost</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <TextField fullWidth label="Total  Cost" type="text" id="fullWidth outlined-error"
                        value={totalCost}
                        onChange={(e) => setcostData({ ...costData, totalCost: e.target.value })}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <FormControl fullWidth>
              <Button style={{ margin: "12px 0px 10px 0px" }} variant="contained">Submit</Button>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}