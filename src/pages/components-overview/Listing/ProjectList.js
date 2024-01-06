import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import Spinner from '../Loader/Spinner';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectResponseData, updateProject } from '../../../store/reducers/Project/projectSlice';
import { TextField } from '../../../../node_modules/@mui/material/index';
import { builderResponseData } from 'store/reducers/Builder/builderSlice';
import { paymentResponseData } from 'store/reducers/PaymentPlane/paymentSlice';
import { FormControl, InputLabel, MenuItem, Select } from '../../../../node_modules/@mui/material/index';
import { Pagination } from 'components/Pagination';

export default function TableUnstyled() {
    const [editMode, setEditMode] = React.useState(null);
    const [pageNo, setPageNo] = React.useState(0);
    const [searchInput, setSearchInput] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const handleFieldChange = (field, value) => {
        const newData = { ...editedData };
        newData[field] = value;
        setEditedData(newData);
    };
    const [editedData, setEditedData] = React.useState({
        projectId: '',
        builderId: '',
        projectName: '',
        paymentPlanId: '',
        rc: '',
        ra: '',
        remarks: ''
    });
    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateProject(editedData));
        setEditedData(null);
        setTimeout(() => {
            dispatch(projectResponseData(pageNo));
        }, 500)
        setSuccessMessage('Data updated successfully');
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
        setEditMode(null)
    };

    const dispatch = useDispatch();
    const projectdata = useSelector((state) => state.projectSlice.data);
    var array = new Array((projectdata && projectdata.totalPages) || 1).fill(0);
    const loading = useSelector((state) => state.projectSlice.loading);
    const error = useSelector((state) => state.projectSlice.error);
    const paymentPlansData = useSelector((state) => state.paymentSlice.data);
    const buildersData = useSelector((state) => state.builderSlice.data);

    useEffect(() => {
        dispatch(projectResponseData(pageNo));
    }, [pageNo]);

    useEffect(() => {
        dispatch(builderResponseData())
        dispatch(paymentResponseData())
    }, [])

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


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
        <div style={{ marginTop: '-58px' }} >
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {/* <Box sx={{ width: '100%', m: 2 }}>
                <form>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={9}></Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <FormControl>
                                        <Link to="/projectdata">
                                            {<Button sx={{ width: '20%' }} style={{ margin: "-104px 18px 0px" }} variant="contained" >Add</Button>}
                                        </Link>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box> */}
            <div style={{ display: "flex", flexDirection: 'row-reverse', gap: '15px', marginBottom: '15px' }} >
                <Link to="/projectdata">
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
                            {/* <th>Builder ID</th> */}
                            <th>Builder Name</th>
                            <th>Project Name</th>
                            <th>Payment Plan</th>
                            <th>RC</th>
                            <th>RA</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectdata && projectdata.content && projectdata.content.map((item, index) => {
                            return (
                                <tr key={item.builderId}>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.projectId ?
                                            <FormControl fullWidth required >
                                                <Select fullWidth required
                                                    value={editedData.builderId}
                                                    onChange={(e) => handleFieldChange('builderId', e.target.value)} >
                                                    {buildersData && buildersData.content && buildersData.content.map((itemm, index) => {
                                                        return (
                                                            <MenuItem key={index.builderId} value={itemm.builderId}>{itemm.builderName}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl> :
                                            item.builder.builderName}
                                    </td>

                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.projectId ? (
                                            <TextField
                                                type="text"
                                                value={editedData.projectName} // Consider using controlled components here
                                                onChange={(e) => handleFieldChange('projectName', e.target.value)}
                                            />
                                        ) : (
                                            item.projectName
                                        )}

                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {editMode === item.projectId ?
                                            <FormControl fullWidth required >
                                                <Select fullWidth required
                                                    value={editedData.paymentPlanId}
                                                    onChange={(e) => handleFieldChange('paymentPlanId', e.target.value)} >
                                                    {paymentPlansData && paymentPlansData.content && paymentPlansData.content.map((itemm, index) => {
                                                        return (
                                                            <MenuItem key={index.paymentPlanId} value={itemm.paymentPlanId}>{itemm.paymentPlan}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                            : item.paymentPlans.length ? item.paymentPlans.map((items, index) => {
                                                const isCommaNeeded = item.paymentPlans.length - 1 === index;
                                                return (
                                                    <span key={index}>{items ? `${!isCommaNeeded ? `${items.paymentPlan},` : items.paymentPlan}` : ""}</span>
                                                )
                                            }) : <span> - </span>
                                        }
                                    </td>

                                    <td style={{ width: 160 }} align="right">
                                        {/* {item.rc} */}
                                        {editMode === item.projectId ? (
                                            <TextField
                                                type="number"
                                                value={editedData.rc} // Consider using controlled components here
                                                onChange={(e) => handleFieldChange('rc', (Number(e.target.value) > 100 ? '100' : e.target.value))}
                                            />
                                        ) : (
                                            item.rc
                                        )}
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {/* {item.ra} */}
                                        {editMode === item.projectId ? (
                                            <TextField
                                                type="number"
                                                value={editedData.ra} // Consider using controlled components here
                                                onChange={(e) => handleFieldChange('ra', (Number(e.target.value) > 100 ? '100' : e.target.value))}
                                            />
                                        ) : (
                                        item.ra
                                        )}
                                    </td>
                                    <td style={{ width: 160 }} align="right">
                                        {/* {item.remarks} */}
                                        {editMode === item.projectId ? (
                                            <TextField
                                                type="text"
                                                value={editedData.remarks} // Consider using controlled components here
                                                onChange={(e) => handleFieldChange('remarks', e.target.value)}
                                            />
                                        ) : (
                                            item.remarks
                                        )}
                                    </td>
                                    <td style={{ width: 40 }} align="right">
                                        {editMode === item.projectId ? (
                                            <Button onClick={handleSave}><SaveIcon /></Button>
                                        ) : (
                                            <Button onClick={() => (setEditMode(item.projectId), setEditedData({
                                                projectId: item.projectId,
                                                builderId: item.builder.builderId,
                                                paymentPlanId: item.paymentPlans[0].paymentPlanId,
                                                projectName: item.projectName,
                                                ra: item.ra,
                                                rc: item.rc,
                                                remarks: item.remarks
                                            }))}><ModeEditIcon /></Button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}


                        {/* {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                                <td colSpan={3} aria-hidden />
                            </tr>
                        )} */}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <CustomTablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={0}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        'aria-label': 'rows per page',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr>
                    </tfoot> */}
                </table>
            </Root>
            <Pagination array={projectdata.totalPages} pageNo={pageNo} setPageNo={setPageNo} />
        </div >
    );
}

// function createData(srno, name, type, plan, rc, ra) {
//     return { srno, name, type, plan, rc, ra };
// }

// const rows = [
//     createData(1, 'a', 'A', 'CASH', '2', '3'),
//     createData(2, 'b', 'A', 'CASH', '2', '3'),
//     createData(3, 'c', 'A', 'CASH', '2', '3'),
//     createData(4, 'd', 'A', 'CASH', '2', '3'),
//     createData(5, 'e', 'A', 'CASH', '2', '3'),
//     createData(6, 'f', 'A', 'CASH', '2', '3'),
//     createData(7, 'g', 'A', 'CASH', '2', '3'),
//     createData(8, 'h', 'A', 'CASH', '2', '3'),
//     createData(9, 'i', 'A', 'CASH', '2', '3'),
//     createData(10, 'j', 'A', 'CASH', '2', '3'),
//     createData(11, 'k', 'A', 'CASH', '2', '3'),
//     createData(12, 'm', 'A', 'CASH', '2', '3'),
//     createData(13, 'n', 'A', 'CASH', '2', '3'),
// ].sort((a, b) => (a.name < b.name ? -1 : 1));


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