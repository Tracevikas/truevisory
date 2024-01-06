import * as React from 'react';
import { TextField, FormControl, Grid, Button } from '@mui/material';
import { Select, InputLabel, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { propertyResponseData } from 'store/reducers/PropertyType/propertySlice';
import { useEffect } from 'react';
import { sendDataToUnitCategory } from 'store/reducers/UnitCategory/unitcategorySlice';
import { unitCategoryResponseData } from 'store/reducers/UnitCategory/unitcategorySlice';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


export default function Unit() {
    const dispatch = useDispatch();
    const [unitCategoryName, setUnitCategoryName] = React.useState("");
    const [areaMeasurementType, setAreaMeasurementType] = React.useState("");
    const [otherAreaMeasurementType, setOtherAreaMeasurementType] = React.useState("");
    const [propertyType, setPropertyType] = React.useState("");
    const [remarks, setRemarks] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();

// const disabledCondition={}

    const unitareaMeasure = useSelector((state) => state.unitcategorySlice.data)

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            unitCategoryName: unitCategoryName,
            propertyType: propertyType,
            otherAreaMeasurementType: otherAreaMeasurementType,
            areaMeasurementType: areaMeasurementType,
            remarks: remarks
        }

        dispatch(sendDataToUnitCategory(payload));
        setUnitCategoryName('')
        setAreaMeasurementType('')
        setOtherAreaMeasurementType('')
        setPropertyType('')
        setRemarks('')

        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/unitcategorylist')
        }, 1000);
    };

    console.log(1111, unitareaMeasure)


    // Implement Property Type API

    const propertydata = useSelector((state) => state.propertySlice.data);
    // const loading = useSelector((state) => state.propertySlice.loading);
    // const error = useSelector((state) => state.propertySlice.error);

    useEffect(() => {
        // Dispatch action to fetch data on component mount

        dispatch(propertyResponseData());
        dispatch(unitCategoryResponseData())
    }, []);

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }


    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <TextField required
                                        label="Unit Category Name"
                                        value={unitCategoryName}
                                        onChange={(e) => setUnitCategoryName(e.target.value)}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <InputLabel>Property Type</InputLabel>
                                    <Select fullWidth
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)} >
                                        {propertydata && propertydata.content && propertydata.content.map((item, index) => {
                                            return (
                                                <MenuItem key={index.propertyTypeId} value={item.propertyTypeId}>{item.propertyType}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <FormControl fullWidth >
                                    <InputLabel>Area Measurement Type</InputLabel>
                                    <Select fullWidth value={areaMeasurementType}
                                        onChange={(e) => setAreaMeasurementType(e.target.value)}>
                                        {unitareaMeasure && unitareaMeasure.map((item, index) => {
                                            return (
                                                <MenuItem key={index.unitCategoryId} value={item.areaMeasurementType}>{item.areaMeasurementType}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                                <FormControl fullWidth required >
                                    <InputLabel>Area Measurement Type</InputLabel>
                                    <Select
                                        fullWidth value={areaMeasurementType}
                                        onChange={(e) => setAreaMeasurementType(e.target.value)}>
                                        <MenuItem value='SQYRD'>SQYRD</MenuItem>
                                        <MenuItem value='SQFT'>SQFT</MenuItem>
                                        <MenuItem value='OTHER'>OTHER</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <TextField fullWidth disabled={areaMeasurementType==="SQYRD"||areaMeasurementType==="SQFT"||areaMeasurementType===""}
                                        label="Other Area Measurement Type"
                                        value={otherAreaMeasurementType} 
                                        onChange={(e) => setOtherAreaMeasurementType(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Remarks"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
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