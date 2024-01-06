import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { TextField } from '../../../../node_modules/@mui/material/index';
import Spinner from '../Loader/Spinner';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { propertyResponseData, updatePropertyType } from "../../../store/reducers/PropertyType/propertySlice"
import { Pagination } from 'components/Pagination';

export default function TableUnstyled() {
  const [editMode, setEditMode] = React.useState(null);
  const [editedData, setEditedData] = React.useState({ propertyTypeId: '', propertyType: '' });
  const [pageNo, setPageNo] = React.useState(0);
  const [searchInput, setSearchInput] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');


  const dispatch = useDispatch();
  const propertydata = useSelector((state) => state.propertySlice.data);
  var array = new Array((propertydata && propertydata.totalPages) || 1).fill(0);
  const loading = useSelector((state) => state.propertySlice.loading);
  const error = useSelector((state) => state.propertySlice.error);

  useEffect(() => {
    // Dispatch action to fetch data on component mount
    dispatch(propertyResponseData(pageNo));
  }, [pageNo]);

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleEdit = (propertyTypeId) => {
    setEditMode(propertyTypeId);
    const selectedProperty = propertydata.content.find(item => item.propertyTypeId === propertyTypeId);
    if (selectedProperty) {
      setEditedData({ ...selectedProperty });
      return selectedProperty
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updatePropertyType(editedData));
    setEditedData({ propertyTypeId: '', propertyType: '' });
    setTimeout(() => {
      dispatch(propertyResponseData(pageNo));
    }, 500)
    setSuccessMessage('Data updated successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    setEditMode(null)
  };

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
      dispatch(propertyResponseData(0));
    } else if (inputText.length >= 3) {
      dispatch(propertyResponseData(inputText));
    }
  }
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };


  return (
    <div style={{marginTop: '-58px'}} >
      {/* <Box sx={{ width: '100%', m: 2 }}>
        <form>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={9}></Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <FormControl fullWidth>
                    <Link to="/propertytype">
                      {<Button sx={{ width: '20%' }} style={{ margin: "-104px 18px 0px" }} variant="contained" >Add</Button>}
                    </Link>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box> */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <div style={{ display: "flex", flexDirection: 'row-reverse', gap: '15px', marginBottom: '15px' }} >
        <Link to="/propertytype">
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
              {/* <th>Property Type ID</th> */}
              <th>Property Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {propertydata && propertydata.content && propertydata.content.map((item, index) => {
              return (
                <tr key={index.propertyTypeId}>
                  {/* <td style={{ width: 50 }}>{item.propertyTypeId}</td> */}
                  <td style={{ width: 160 }} align="right">
                    {editMode === item.propertyTypeId ? (
                      <TextField
                        type="text"
                        value={editedData.propertyType}
                        onChange={(e) => setEditedData({ ...editedData, propertyType: e.target.value })}
                      />
                    ) : (
                      item.propertyType
                    )}

                  </td>
                  <td style={{ width: 40 }} align="right">
                    {/* <ModeEditIcon style={{ marginRight: "10px" }} /> */}
                    {/* <DeleteIcon /> */}
                    {editMode === item.propertyTypeId ? (
                      <Button onClick={handleSave}><SaveIcon /></Button>
                    ) : (
                      <Button onClick={() => handleEdit(item.propertyTypeId)}><ModeEditIcon /></Button>
                      // <ModeEditIcon style={{ marginRight: "10px" }} onClick={() => handleEdit(item.propertyTypeId)} />
                    )}
                  </td>
                </tr>
              )
            })}


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
      
      <Pagination array = {propertydata.totalPages} pageNo ={pageNo} setPageNo = {setPageNo}  />
    </div>
  );
}

// function createData(srno, type) {
//   return { srno, type };
// }

// const rows = [
//   createData(1, 'Cupcake'),
//   createData(2, 'Donut'),
//   createData(3, 'Eclair'),
//   createData(4, 'Frozen yoghurt'),
//   createData(5, 'Gingerbread'),
//   createData(6, 'Honeycomb'),
//   createData(7, 'Ice cream sandwich'),
//   createData(8, 'Jelly Bean'),
//   createData(9, 'KitKat'),
//   createData(10, 'Lollipop'),
//   createData(11, 'Marshmallow'),
//   createData(12, 'Nougat'),
//   createData(13, 'Oreo'),
// ].sort((a, b) => (a.type < b.type ? -1 : 1));

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