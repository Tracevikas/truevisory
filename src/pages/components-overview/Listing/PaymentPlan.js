import * as React from 'react';
import { styled } from '@mui/system';
import { TextField } from '../../../../node_modules/@mui/material/index';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { paymentResponseData, updatePaymentPlane } from 'store/reducers/PaymentPlane/paymentSlice';
import Spinner from '../Loader/Spinner';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Pagination } from 'components/Pagination';


export default function TableUnstyled() {
    const [editMode, setEditMode] = React.useState(null);
    const [editedData, setEditedData] = React.useState({ paymentPlanId: '', paymentPlan: '' });
    const [pageNo, setPageNo] = React.useState(0);
    const [searchInput, setSearchInput] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const dispatch = useDispatch();
    const paymentListdata = useSelector((state) => state.paymentSlice.data);
    const loading = useSelector((state) => state.paymentSlice.loading);
    const error = useSelector((state) => state.paymentSlice.error);

    useEffect(() => {
        dispatch(paymentResponseData(pageNo));
    }, [pageNo]);

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

 
    const handleEdit = (paymentPlanId) => {
        setEditMode(paymentPlanId);
        const selectedPaymentPlan = paymentListdata.content.find(item => item.paymentPlanId === paymentPlanId);
        if (selectedPaymentPlan) {
            setEditedData({ ...selectedPaymentPlan });
            return selectedPaymentPlan
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updatePaymentPlane(editedData));
        setEditedData({ paymentPlanId: '', paymentPlan: '' });
        setTimeout(() => {
            dispatch(paymentResponseData(pageNo));
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
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = (inputText) => {
        if (inputText === '') {
            dispatch(paymentResponseData(0));
        } else if (inputText.length >= 3) {
            dispatch(paymentResponseData(inputText));
        }
    }


    return (
        <div style={{marginTop: '-58px'}} >
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <div style={{ display: "flex", flexDirection: 'row-reverse', gap: '15px', marginBottom: '15px' }} >
                <Link to="/paymentplan">
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
                            {/* <th>Payment ID</th> */}
                            <th>Payment Plan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentListdata && paymentListdata.content && paymentListdata.content.map((item, index) =>
                            <tr key={index.paymentPlanId}>
                                {/* <td style={{ width: 50 }}>{item.paymentPlanId}</td> */}
                                <td style={{ width: 160 }} align="right">
                                    {editMode === item.paymentPlanId ? (
                                        <TextField
                                            value={editedData.paymentPlan}
                                            onChange={(e) => setEditedData({ ...editedData, paymentPlan: e.target.value })}
                                        />
                                    ) : (
                                        item.paymentPlan
                                    )}

                                </td>
                                <td style={{ width: 40 }} align="right">
                                    {editMode === item.paymentPlanId ? (
                                        <Button onClick={handleSave}><SaveIcon /></Button>
                                    ) : (
                                        <Button onClick={() => handleEdit(item.paymentPlanId)}><ModeEditIcon /></Button>
                                    )}
                                </td>
                            </tr>)}

                    </tbody>

                    {/* <tfoot>
                        <tr>
                            <CustomTablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
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
            <Pagination array = {paymentListdata.totalPages} pageNo ={pageNo} setPageNo = {setPageNo}  />

        </div>
    );
}

// function createData(srno, payment) {
//     return { srno, payment };
// }

// const rows = [
//     createData(1, 'Cash'),
//     createData(2, 'Credit Card'),
//     createData(3, 'Debit Card'),
//     createData(4, 'Net Banking'),
//     createData(5, 'Villa'),
//     createData(6, 'Studio'),
//     createData(7, 'Office Space'),
//     createData(8, 'Virtual Space'),
//     createData(9, 'KitKat'),
//     createData(10, 'Lollipop'),
//     createData(11, 'Marshmallow'),
//     createData(12, 'Nougat'),
//     createData(13, 'Oreo'),
// ].sort((a, b) => (a.payment < b.payment ? -1 : 1));


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