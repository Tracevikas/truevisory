import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Alert from '@mui/material/Alert';
import Spinner from '../Loader/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '../../../../node_modules/@mui/material/index';
import { unitCategoryResponseData, updateUnitCategory } from 'store/reducers/UnitCategory/unitcategorySlice';
import { propertyResponseData } from 'store/reducers/PropertyType/propertySlice';
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
    "unitCategoryId": "",
    "unitCategoryName": "",
    "propertyType": "",
    "areaMeasurementType": "",
    "otherAreaMeasurementType": "",
    "remarks": ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUnitCategory(editedData));
    setEditedData(null);
    setTimeout(() => {
      dispatch(unitCategoryResponseData(pageNo));
    }, 1000)
    setSuccessMessage('Data updated successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    setEditMode(null)
  };
  const dispatch = useDispatch();
  const unitcategoryData = useSelector((state) => state.unitcategorySlice.data);
  var array = new Array((unitcategoryData && unitcategoryData.totalPages) || 1).fill(0);
  const loading = useSelector((state) => state.unitcategorySlice.loading);
  const error = useSelector((state) => state.unitcategorySlice.error);
  const propertydata = useSelector((state) => state.propertySlice.data);

  useEffect(() => {
    // Dispatch action to fetch data on component mount
    dispatch(unitCategoryResponseData(pageNo));
  }, [pageNo]);

  useEffect(() => {
    dispatch(propertyResponseData())
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
      dispatch(unitCategoryResponseData(0));
    } else if (inputText.length >= 3) {
      dispatch(unitCategoryResponseData(inputText));
    }
  }
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div style={{marginTop: '-58px'}} >
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <div style={{ display: "flex", flexDirection: 'row-reverse', gap: '15px', marginBottom: '15px' }} >
        <Link to="/unitcategory">
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
              {/* <th>Unit Category ID</th> */}
              <th>Unit Category</th>
              <th>Property Type</th>
              <th>Area Measurement Type</th>
              <th>Other Area Measurement Type</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unitcategoryData && unitcategoryData.content && unitcategoryData.content.map((item, index) => {
              return (
                <tr key={item.unitCategoryId}>
                  <td style={{ width: 50 }} align="right">
                    {editMode === item.unitCategoryId ? (
                      <TextField
                        type="text"
                        value={editedData.unitCategoryName}
                        onChange={(e) => handleFieldChange('unitCategoryName', e.target.value)}
                      />
                    ) : (
                      item.unitCategoryName
                    )}


                  </td>
                  <td style={{ width: 150 }} align="right">
                    {editMode === item.unitCategoryId ? <FormControl fullWidth required >
                      <Select fullWidth
                        value={editedData.propertyType}
                        onChange={(e) => handleFieldChange('propertyType', e.target.value)} >
                        {propertydata && propertydata.content && propertydata.content.map((item, index) => {
                          return (
                            <MenuItem key={index.propertyTypeId} value={item.propertyTypeId}>{item.propertyType}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                      : item?.propertyType?.propertyType.toString()}
                  </td>
                  <td style={{ width: 150 }} align="right">
                    {editMode === item.unitCategoryId ? <FormControl fullWidth required >
                      <Select
                        fullWidth value={editedData.areaMeasurementType}
                        onChange={(e) => handleFieldChange('areaMeasurementType', e.target.value)}>
                        <MenuItem value='SQYRD'>SQYRD</MenuItem>
                        <MenuItem value='SQFT'>SQFT</MenuItem>
                        <MenuItem value='OTHER'>OTHER</MenuItem>
                      </Select>
                    </FormControl>
                      : item.areaMeasurementType}
                  </td>
                  <td style={{ width: 180 }} align="right">
                    {editMode === item.unitCategoryId ? (
                      <TextField
                        type="text"
                        value={editedData.areaMeasurementType ? '' : editedData.otherAreaMeasurementType} // Consider using controlled components here
                        onChange={(e) => handleFieldChange('otherAreaMeasurementType', e.target.value)}
                      />
                    ) : (
                      item.otherAreaMeasurementType || '-'
                    )}
                  </td>
                  <td style={{ width: 80 }} align="right">
                    {editMode === item.unitCategoryId ? (
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
                    {editMode === item.unitCategoryId ? (
                      <Button onClick={handleSave}><SaveIcon /></Button>
                    ) : (
                      <Button onClick={() => (setEditMode(item.unitCategoryId), setEditedData(
                        {
                          unitCategoryId: item.unitCategoryId,
                          areaMeasurementType: item.areaMeasurementType,
                          otherAreaMeasurementType: item.otherAreaMeasurementType,
                          propertyType: item.propertyType.propertyTypeId,
                          remarks: item.remarks,
                          unitCategoryName: item.unitCategoryName
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
      <Pagination array = {unitcategoryData.totalPages} pageNo ={pageNo} setPageNo = {setPageNo}  />
    </div >
  );
}

// function createData(srno, unit_cat, property_type, area_Measurement, other_area_measurement, remarks) {
//   return { srno, unit_cat, property_type, area_Measurement, other_area_measurement, remarks };
// }

// const rows = [
//   createData(1, 'a', 'A', 'CASH', '2', '3'),
//   createData(2, 'b', 'A', 'CASH', '2', '3'),
//   createData(3, 'c', 'A', 'CASH', '2', '3'),
//   createData(4, 'd', 'A', 'CASH', '2', '3'),
//   createData(5, 'e', 'A', 'CASH', '2', '3'),
//   createData(6, 'f', 'A', 'CASH', '2', '3'),
//   createData(7, 'g', 'A', 'CASH', '2', '3'),
//   createData(8, 'h', 'A', 'CASH', '2', '3'),
//   createData(9, 'i', 'A', 'CASH', '2', '3'),
//   createData(10, 'j', 'A', 'CASH', '2', '3'),
//   createData(11, 'k', 'A', 'CASH', '2', '3'),
//   createData(12, 'm', 'A', 'CASH', '2', '3'),
//   createData(13, 'n', 'A', 'CASH', '2', '3'),
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