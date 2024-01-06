import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, FormControl } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { FormHelperText } from '../../../../node_modules/@mui/material/index';


export default function RetentionProperty(props) {
    const { builder,
        project,
        selfPaidAmount,
        unitNo,
        loanAmount,
        otherAmount,
        oldPropertyPaperStatus,
        propertyTransferType,
        oldPropertyLink,
        caseStudyApprovalLink,
        retentionRemarks } = props.currentRetentionDetails;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!Object.keys(props.currentRetentionDetailsErrors).includes(name)) {
            props.setCurrentRetentionDetails({ ...props.currentRetentionDetails, [name]: value });
        } else {
            props.setCurrentRetentionDetails({ ...props.currentRetentionDetails, [name]: value });
            props.setCurrentRetentionDetailsErrors({ ...props.currentRetentionDetailsErrors, [name]: "" });
        }
    }
    return (
        <Box sx={{ width: '100%', m: 2 }}>
            <form >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Builder  */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <TextField type="text" label="Builder" value={builder} name="builder" onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    {/* Project */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <TextField required type="text" label="Project" value={project} name="project" onChange={handleChange} />
                        </FormControl>
                        {props.currentRetentionDetailsErrors.project && (
                            <FormHelperText error>{props.currentRetentionDetailsErrors.project}</FormHelperText>
                        )}
                    </Grid>

                    {/* Unit No */}
                    <Grid item xs={6}>
                        <FormControl fullWidth >
                            <TextField
                                required id="unitNo" type="text" label="Unit No" value={unitNo} name="unitNo" onChange={handleChange} />
                        </FormControl>
                        {props.currentRetentionDetailsErrors.unitNo && (
                            <FormHelperText error>{props.currentRetentionDetailsErrors.unitNo}</FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <TextField id="self" type="text" label="Self Paid Amount" value={selfPaidAmount} name="selfPaidAmount" onChange={handleChange} />
                        </FormControl>
                    </Grid>


                    {/* Loan Amount */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <TextField id="loan" type="text" label="Loan Amount" value={loanAmount} name="loanAmount" onChange={handleChange} />
                        </FormControl>
                    </Grid>

                    {/* Old Property Paper Status  */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Old Property Paper Status</InputLabel>
                            <Select
                                value={oldPropertyPaperStatus}
                                name="oldPropertyPaperStatus"
                                onChange={handleChange}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="received">Received</MenuItem>
                            </Select>
                        </FormControl>
                        {props.currentRetentionDetailsErrors.oldPropertyPaperStatus && (
                            <FormHelperText error>{props.currentRetentionDetailsErrors.oldPropertyPaperStatus}</FormHelperText>
                        )}
                    </Grid>


                    {/* Propert Transfer type  */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Property Transfer Type</InputLabel>
                            <Select
                                value={propertyTransferType}
                                name="propertyTransferType"
                                onChange={handleChange}
                            >
                                <MenuItem value="truevisory">Truevisory</MenuItem>
                                <MenuItem value="builder">Builder</MenuItem>
                                <MenuItem value="others">Others</MenuItem>
                            </Select>
                        </FormControl>
                        {props.currentRetentionDetailsErrors.propertyTransferType && (
                            <FormHelperText error>{props.currentRetentionDetailsErrors.propertyTransferType}</FormHelperText>
                        )}
                    </Grid>

                    {/* Old Property Paper Link  */}
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <TextField type="text" label="Old Property Paper Link" value={oldPropertyLink} name="oldPropertyLink" onChange={handleChange} />
                        </FormControl>
                    </Grid>

                    {/* Cash Study Approval  */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <TextField type="text" label="Case Study link" value={caseStudyApprovalLink} name="caseStudyApprovalLink" onChange={handleChange} />
                        </FormControl>
                        {props.currentRetentionDetailsErrors.caseStudyApprovalLink && (
                            <FormHelperText error>{props.currentRetentionDetailsErrors.caseStudyApprovalLink}</FormHelperText>
                        )}
                    </Grid>

                    {/* Remark  */}
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <TextareaAutosize style={{ height: '40px' }}
                                minRows={3} // You can adjust the minimum and maximum number of rows
                                maxRows={6} value={retentionRemarks} onChange={handleChange} placeholder="Remarks" />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}