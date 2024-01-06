import * as React from 'react';
import { TextField, FormControl, Button, Select, InputLabel, MenuItem, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import { builderResponseData } from 'store/reducers/Builder/builderSlice';
import { unitCategoryResponseData } from 'store/reducers/UnitCategory/unitcategorySlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToUnits } from 'store/reducers/Units/unitSlice';
import { projectResponseData } from 'store/reducers/Project/projectSlice';
import { unitsResponseData } from 'store/reducers/Units/unitSlice';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


import { DataGridPremium } from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';

// import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



export default function Unit() {

    const initialUnitState = {
        unitNumber: '',
        tower: '',
        unitStatus: '',
        floorNumber: '',
        area: '',
        remarks: ''
    };

    const [unitData, setunitData] = React.useState([initialUnitState]);
    const [successMessage, setSuccessMessage] = React.useState('');
    const navigate = useNavigate();


    const [newId, setId] = React.useState(1)
    const [unitCategoryId, setUnitCategoryId] = React.useState('');
    const [projectId, setProject] = React.useState("");

    const handleAddForm = () => {
        const newForm = {
            id: unitData.length + 1,
            data: { unitNumber: '', tower: '', floorNumber: '', area: '', status: '', remarks: '' },
        };
        setId(newId + 1);
        setunitData([...unitData, newForm]);
    };

    // const handleDelete = (index) => {
    //     const updatedUnits = unitData.filter((unit, i) => i !== index);
    //     setunitData(updatedUnits);
    // };
    const handleDelete = (index) => {
        if (unitData.length > 1) {
            const updatedUnits = unitData.filter((_, i) => i !== index);
            setunitData(updatedUnits);
        }
    };
    // const addUnit = () => {
    //     setUnits([...unitData, initialUnitState]);
    // };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newUnits = [...unitData];
        newUnits[index][name] = value;
        setunitData(newUnits);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            unitCategoryId: unitCategoryId,
            projectId: projectId,
            units: unitData.map(unit => ({
                unitNumber: unit.unitNumber,
                tower: unit.tower,
                unitStatus: unit.unitStatus,
                floorNumber: unit.floorNumber,
                area: parseInt(unit.area), // Assuming area is a number
                remarks: unit.remarks
            })),
        }

        dispatch(sendDataToUnits(payload));
        setunitData([initialUnitState])
        setProject("")
        setUnitCategoryId('')
        setSuccessMessage('Data added successfully');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/unitlist')
        }, 1000);

    };


    // API Implement for Show the Builder ID 
    const dispatch = useDispatch();
    // const unitsdata = useSelector((state) => state.unitSlice.data);
    const projectdata = useSelector((state) => state.projectSlice.data);
    const unitCategoryData = useSelector((state) => state.unitcategorySlice.data)
    // const loading = useSelector((state) => state.projectSlice.loading);
    // const error = useSelector((state) => state.projectSlice.error);

    useEffect(() => {
        // Dispatch action to fetch data on component mount
        dispatch(unitCategoryResponseData());
        dispatch(projectResponseData());
        dispatch(unitsResponseData());
    }, []);




    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 10,
    //     maxColumns: 20,
    //   });
    
    //   const [copiedData, setCopiedData] = React.useState('');
    
    //   const initialState = {
    //     ...data.initialState,
    //     columns: {
    //       columnVisibilityModel: {
    //         id: false,
    //         desk: false,
    //       },
    //     },
    //   };

    return (
        <div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <InputLabel>Project Name</InputLabel>
                                    <Select fullWidth required
                                        value={projectId}
                                        onChange={(e) => setProject(e.target.value)} >
                                        {projectdata && projectdata.content && projectdata.content.map((item, index) => {
                                            return (
                                                <MenuItem key={index.projectId} value={item.projectId}>{item.projectName}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required >
                                    <InputLabel>Unit Category</InputLabel>
                                    <Select fullWidth required
                                        value={unitCategoryId}
                                        onChange={(e) => setUnitCategoryId(e.target.value)}>
                                        {unitCategoryData && unitCategoryData.content && unitCategoryData.content.map((item, index) => {
                                            return (<MenuItem key={index.unitCategoryId} value={item.unitCategoryId}>{item.unitCategoryName}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {unitData.map((unit, index) => (

                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={16}>
                                        <Grid container spacing={2} columns={16} style={{ marginTop: "5px" }}>
                                            <Grid item xs={2} style={{ marginLeft: "13px" }}>
                                                <FormControl fullWidth required>
                                                    <TextField fullWidth required label="Unit Name" type="text" id="fullWidth outlined-error"
                                                        name="unitNumber"
                                                        value={unit.unitNumber}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <FormControl fullWidth>
                                                    <TextField fullWidth label="Tower" type="text" id="fullWidth outlined-error"
                                                        name="tower"
                                                        value={unit.tower}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <FormControl fullWidth required >
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        name="unitStatus"
                                                        value={unit.unitStatus}
                                                        onChange={(event) => handleInputChange(index, event)}>
                                                        <MenuItem value='HOLD'>HOLD</MenuItem>
                                                        <MenuItem value='SOLD'>SOLD</MenuItem>
                                                        <MenuItem value='AVAILABLE'>AVAILABLE</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={2}>
                                                <FormControl fullWidth >
                                                    <TextField fullWidth label="Floor Number" type="text" id="fullWidth outlined-error"
                                                        name="floorNumber"
                                                        value={unit.floorNumber}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={2}>
                                                <FormControl fullWidth required>
                                                    <TextField fullWidth required label="Area" type="text" id="fullWidth outlined-error"
                                                        name="area"
                                                        value={unit.area}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl fullWidth>
                                                    <TextField fullWidth label="Unit Remark" type="text" id="fullWidth outlined-error"
                                                        name="remarks"
                                                        value={unit.remarks}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl fullWidth required >
                                                    <Button variant="contained" style={{ height: '41px' }} onClick={handleAddForm}>Add More</Button>
                                                </FormControl>
                                            </Grid>

                                            {unitData.index !== 1 &&
                                                <Grid item xs={1} key={index}>
                                                    <Button variant="contained" disabled={index === newId} style={{ height: '41px', width: '100%' }} onClick={() => handleDelete(index)}>Delete</Button>
                                                </Grid>
                                            }

                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid item xs={12} >
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </CardContent>
            </Card>

            {/* <div style={{ width: '100%' }}>
                <div style={{ height: 400 }}>
                    <DataGridPremium
                    {...data}
                    initialState={initialState}
                    checkboxSelection
                    disableRowSelectionOnClick
                    unstable_cellSelection
                    onClipboardCopy={(copiedString) => setCopiedData(copiedString)}
                    unstable_ignoreValueFormatterDuringExport
                    />
                </div>
                <Alert severity="info" sx={{ width: '100%', mt: 1 }}>
                    <AlertTitle>Copied data:</AlertTitle>
                    <code
                    style={{
                        display: 'block',
                        maxHeight: 200,
                        overflow: 'auto',
                        whiteSpace: 'pre-line',
                    }}
                    >
                    {copiedData}
                    </code>
                </Alert>
                </div>  */}
        </div >
    );
}