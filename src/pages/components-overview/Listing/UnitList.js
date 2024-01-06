import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Spinner from '../Loader/Spinner';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unitsResponseData, updateUnits } from 'store/reducers/Units/unitSlice';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '../../../../node_modules/@mui/material/index';
import { unitCategoryResponseData } from 'store/reducers/UnitCategory/unitcategorySlice';
import { projectResponseData } from 'store/reducers/Project/projectSlice';
import { Pagination } from 'components/Pagination';

export default function TableUnstyled() {
    const [editMode, setEditMode] = React.useState(null);
    // State to hold edited values
    const [pageNo, setPageNo] = React.useState(0);
    const [searchInput, setSearchInput] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    // Function to handle the change in text field
    const handleFieldChange = (field, value) => {
        const newData = { ...editedData };
        newData[field] = value;
        setEditedData(newData);
    };

    const [editedData, setEditedData] = React.useState({
        "unitCategoryId": "",
        "projectId": "",
        "unitId": "",
        "unitNumber": "",
        "tower": "",
        "unitStatus": "",
        "floorNumber": "",
        "area": 0,
        "remarks": ""
    });
    const handleSave = (e) => {
        e.preventDefault();
        const payload = {
            "unitCategoryId": editedData.unitCategoryId,
            "projectId": editedData.projectId,
            "units": [
                {
                    "unitId": editedData.unitId,
                    "unitNumber": editedData.unitNumber,
                    "tower": editedData.tower,
                    "unitStatus": editedData.unitStatus,
                    "floorNumber": editedData.floorNumber,
                    "area": editedData.area,
                    "remarks": editedData.remarks
                }
            ]
        }
        dispatch(updateUnits(payload));
        setEditedData({
            "unitCategoryId": "",
            "projectId": "",
            "unitId": "",
            "unitNumber": "",
            "tower": "",
            "unitStatus": "",
            "floorNumber": "",
            "area": 0,
            "remarks": ""
        });
        setTimeout(() => {
            dispatch(unitsResponseData(pageNo));
        }, 500)
        setSuccessMessage('Data updated successfully');
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
        setEditMode(null)
    };


    const dispatch = useDispatch();
    const unitsdata = useSelector((state) => state.unitSlice.data);
    var array = new Array((unitsdata && unitsdata.totalPages) || 1).fill(0);
    let projectData = useSelector((state) => state.projectSlice.data);
    const loading = useSelector((state) => state.unitSlice.loading);
    const unitcategoryData = useSelector((state) => state.unitcategorySlice.data);

    useEffect(() => {
        // Dispatch action to fetch data on component mount
        dispatch(unitsResponseData(pageNo));
    }, [pageNo]);
    useEffect(() => {
        dispatch(unitCategoryResponseData())
        dispatch(projectResponseData())
    }, [])
    if (loading) {
        return <Spinner />
    }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }
    const PageNo = (idx) => {
        setPageNo(idx)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput);
        }
    };
    const handleSearch = (inputText) => {
        if (inputText === '') {
            dispatch(unitsResponseData(0));
        } else if (inputText.length >= 3) {
            dispatch(unitsResponseData(inputText));
        }
    }
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    return (
        <div style={{marginTop: '-58px'}} >
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <div style={{ display: "flex", flexDirection: 'row-reverse', gap: '15px', marginBottom: '15px' }} >
                <Link to="/units">
                    {<Button sx={{ width: '20%' }} variant="contained" >Add</Button>}
                </Link>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder='Search'
                    style={{ maxWidth: '200px', width: '100%', borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', paddingLeft: '8px', outline: 'none' }}
                />
            </div>


            <Root sx={{ maxWidth: '100%', width: "100%" }}>
                <table aria-label="custom pagination table">
                    <thead>
                        <tr>
                            {/* <th>Sr. No.</th> */}
                            <th>Unit Name</th>
                            <th>Project Name</th>
                            <th>Unit Category</th>
                            <th>Tower</th>
                            <th>Status</th>
                            <th>Floor Number</th>
                            <th>Area</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unitsdata && unitsdata.content && unitsdata.content.map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? (
                                            <TextField
                                                value={editedData.unitNumber}
                                                onChange={(e) => handleFieldChange('unitNumber', e.target.value)}
                                            />) :
                                            item.unitNumber
                                        }
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ?
                                            <FormControl fullWidth required >
                                                <Select fullWidth required
                                                    value={editedData.projectId}
                                                    onChange={(e) => handleFieldChange('projectId', e.target.value)} >
                                                    {projectData && projectData.content && projectData.content.map((itemm, index) => {
                                                        return (
                                                            <MenuItem key={index.projectId} value={itemm.projectId}>{itemm.projectName}</MenuItem>
                                                        )
                                                    })}

                                                </Select>
                                            </FormControl> :
                                            item.project ? item.project.projectName : ""
                                        }
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? <FormControl fullWidth required >
                                            <Select fullWidth required
                                                value={editedData.unitCategoryId}
                                                onChange={(e) => handleFieldChange('unitCategoryId', e.target.value)} >
                                                {unitcategoryData && unitcategoryData.content && unitcategoryData.content.map((itemm, index) => {
                                                    return (<MenuItem key={index} value={itemm.unitCategoryId}>{itemm.unitCategoryName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                            : item.unitCategory.unitCategoryName
                                        }

                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? (
                                            <TextField
                                                value={editedData.tower}
                                                onChange={(e) => handleFieldChange('tower', e.target.value)}
                                            />
                                        ) : (
                                            item.tower
                                        )}
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ?
                                            <FormControl fullWidth required >
                                                <Select
                                                    name="unitStatus"
                                                    value={editedData.unitStatus}
                                                    onChange={(e) => handleFieldChange('unitStatus', e.target.value)}>
                                                    <MenuItem value='HOLD'>HOLD</MenuItem>
                                                    <MenuItem value='SOLD'>SOLD</MenuItem>
                                                    <MenuItem value='VACANT'>VACANT</MenuItem>
                                                </Select>
                                            </FormControl> :
                                            item.unitStatus}
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? (
                                            <TextField
                                                value={editedData.floorNumber}
                                                onChange={(e) => handleFieldChange('floorNumber', e.target.value)}
                                            />
                                        ) : (
                                            item.floorNumber
                                        )}

                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? (
                                            <TextField
                                                value={editedData.area}
                                                onChange={(e) => handleFieldChange('area', e.target.value)}
                                            />
                                        ) : (
                                            item.area
                                        )}

                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.unitId ? (
                                            <Button onClick={handleSave}><SaveIcon /></Button>
                                        ) : (
                                            <Button onClick={() => (setEditMode(item.unitId), setEditedData({
                                                unitCategoryId: item.unitCategory.unitCategoryId,
                                                projectId: item.project.projectId,
                                                unitId: item.unitId,
                                                unitNumber: item.unitNumber,
                                                tower: item.tower,
                                                unitStatus: item.unitStatus,
                                                floorNumber: item.floorNumber,
                                                area: item.area,
                                                remarks: item.remarks
                                            }))}><ModeEditIcon /></Button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </Root>
            <Pagination array = {unitsdata.totalPages} pageNo ={pageNo} setPageNo = {setPageNo}  />
        </div >
    );
}

// function createData(srno, project_name, unit_cat, unit_name, tower, status, floor_number, area) {
//     return { srno, project_name, unit_cat, unit_name, tower, status, floor_number, area };
// }

// const rows = [
//     createData(1, 'a', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(2, 'b', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(3, 'c', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(4, 'd', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(5, 'e', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(6, 'f', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(7, 'g', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(8, 'h', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(9, 'i', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(10, 'j', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(11, 'k', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(12, 'm', 'A', 'CASH', 'q', '2', '3', '1'),
//     createData(13, 'n', 'A', 'CASH', 'q', '2', '3', '1'),
// ].sort((a, b) => (a.project_name < b.project_name ? -1 : 1));

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Root = styled('div')(
    ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }
  td,
  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

// const CustomTablePagination = styled(TablePagination)`
//   & .${classes.toolbar} {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//     @media (min-width: 768px) {
//       flex-direction: row;
//       align-items: center;
//     }
//   }
//   & .${classes.selectLabel} {
//     margin: 0;
//   }
//   & .${classes.displayedRows} {
//     margin: 0;
//     @media (min-width: 768px) {
//       margin-left: auto;
//     }
//   }
//   & .${classes.spacer} {
//     display: none;
//   }
//   & .${classes.actions} {
//     display: flex;
//     gap: 0.25rem;
//   }
// `;
