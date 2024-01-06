import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { builderProjectResponse } from "../../../store/reducers/Booking/createBookingSlice"
import { Pagination } from 'components/Pagination';

export default function BookingList() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState('');
    const [popUpData, setPopUpData] = React.useState('');
    const [pageNo, setPageNo] = React.useState(0);
    const [age, setAge] = React.useState('');

    useEffect(() => {
        dispatch(builderProjectResponse(0));
        // dispatch(builderProjectResponse(pageNo, age));
    }, []);


    const builderdata = useSelector((state) => state.booking.data);

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSearch(searchInput);
    //     }
    // };
    const clearSearch = () => {
        setAge(''),
            setSearchInput(''),
            dispatch(builderProjectResponse(0))
    }
    const handleSearch = (inputText) => {
        if (inputText === '') {
            dispatch(builderProjectResponse(0));
        } else if (inputText.length >= 3) {
            dispatch(builderProjectResponse({ payload: inputText, search: age }))
            // dispatch(builderProjectResponse(inputText, age));
        }
    }
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };


    const handleChange = (event) => {
        setAge(event.target.value);
        setSearchInput('')
    };

    const filterKey = [
        'bookingStatus',
        'bookingType',
        'branch',
        'builderName',
        'projectName',
        'clientName',
        'brokerName',
        'unitNumber',
        'bookingDate'
    ]

    // const [data,setdata] = React.useState(builderdata.bookingId)

    return (
        <div style={{ marginTop: '-58px' }} >
            <div style={{ display: "flex", gap: '15px', marginBottom: '15px', justifyContent: 'flex-end' }} >
                <FormControl style={{ width: "200px" }} >
                    <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        // label="Search By"
                        onChange={handleChange}
                    >
                        {filterKey && filterKey.map((item, idx) => {
                            return (
                                <MenuItem value={item} key={idx}>{item}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <input
                    type={'text'}
                    value={searchInput}
                    onChange={handleSearchChange}
                    // onKeyDown={handleKeyDown}
                    placeholder={age === 'bookingDate' ? 'yyyy-mm or yyyy-mm-dd' : 'Search'}
                    style={{ maxWidth: '200px', width: '100%', borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', paddingLeft: '8px', outline: 'none' }}

                />
                <Button sx={{ width: '200' }} variant="contained" onClick={() => handleSearch(searchInput)} >Search</Button>
                <Button sx={{ width: '200' }} variant="contained" onClick={() => clearSearch()} >Clear</Button>
                <a href="/booking">
                    <Button sx={{ width: '200' }} variant="contained" >Add Booking</Button>
                </a>

            </div>


            <Root sx={{ maxWidth: '100%', width: "100%" }}>

                <table aria-label="custom pagination table">
                    <thead>
                        <tr>
                            <th>Booking TRPL Id</th>
                            <th>Unit Number</th>
                            <th>Area</th>
                            <th>Project</th>
                            <th>Booking Date</th>
                            <th>Booking Type</th>

                            <th>Booking Status </th>
                            <th>Builder By </th>
                            <th>Booking Type </th>
                            <th>Booking Shared By</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {(builderdata && Object.keys(builderdata).length) ? builderdata?.content?.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{item?.bookingTrplId}</td>
                                    <td>{item?.builderProjectUnitDetails?.unitNameText}</td>
                                    <td>{item?.builderProjectUnitDetails?.area}</td>
                                    <td>{item?.builderProjectUnitDetails?.projectNameText}</td>
                                    <td>{item?.bookingDate.split('T')[0]}</td>
                                    <td>{item?.bookingType}</td>

                                    <td>{item.bookingStatus}</td>
                                    <td>{item?.bookingByName}</td>
                                    <td>{item.bookingType}</td>
                                    <td>{item.bookingSharedByName}</td>
                                    <td>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined" style={{ whiteSpace: 'nowrap' }} onClick={() => (setOpen(true), setPopUpData(item))}>
                                                More Detail
                                            </Button>

                                            <Link to="/booking" state={{ some: item }}>
                                                <Button variant="contained">Edit</Button>
                                            </Link>
                                        </Stack>
                                    </td>
                                </tr>
                            )
                        }) : "Loading...."}

                    </tbody>
                </table>
            </Root>
            <Pagination array={builderdata.totalPages} pageNo={pageNo} setPageNo={setPageNo} />

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ fontWeight: 'bold' }} >Booking Details</div>
                    <ul style={{ padding: "5px 0px", listStyle: 'none', fontWeight: 'bold', border: '1px solid #ccc', lineHeight: '25px' }} >
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Total Amount Received: <span style={{ fontWeight: 'normal' }} >{popUpData?.amountReceivedTotal ? popUpData?.amountReceivedTotal : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Client Name: <span style={{ fontWeight: 'normal' }} >{popUpData?.clientDetails?.clientName ? popUpData?.clientDetails?.clientName : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Client Contact No: <span style={{ fontWeight: 'normal' }} >{popUpData?.clientDetails?.clientContactNo ? popUpData?.clientDetails?.clientContactNo : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Broker Name: <span style={{ fontWeight: 'normal' }} >{popUpData?.brokerDetails?.brokerName ? popUpData?.brokerDetails?.brokerName : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Broker Amount: <span style={{ fontWeight: 'normal' }} >{popUpData?.brokerDetails?.brokerAmount ? popUpData?.brokerDetails?.brokerAmount : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Retention Builder: <span style={{ fontWeight: 'normal' }} >{popUpData?.retentionDetails?.builder ? popUpData?.retentionDetails?.builder : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Retention Project: <span style={{ fontWeight: 'normal' }} >{popUpData?.retentionDetails?.project ? popUpData?.retentionDetails?.project : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Welcome Letter: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.welcomeLetter ? popUpData?.agreementDetails?.welcomeLetter : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Welcome Letter Date: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.welcomeLetterDate ? popUpData?.agreementDetails?.welcomeLetterDate : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >BBA: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.bba ? popUpData?.agreementDetails?.bba : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >BBA Date: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.bbaDate ? popUpData?.agreementDetails?.bbaDate : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >RC: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.rc ? popUpData?.agreementDetails?.rc : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >WRA: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.ra ? popUpData?.agreementDetails?.ra : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Registry: <span style={{ fontWeight: 'normal' }} >{popUpData?.agreementDetails?.registry ? popUpData?.agreementDetails?.registry : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Refund Amount: <span style={{ fontWeight: 'normal' }} >{popUpData?.refundDetails?.refundAmount ? popUpData?.refundDetails?.refundAmount : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Refund Date: <span style={{ fontWeight: 'normal' }} >{popUpData?.refundDetails?.refundDate ? popUpData?.refundDetails?.refundDate : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Incentive: <span style={{ fontWeight: 'normal' }} >{popUpData?.miscDetails?.incentive ? popUpData?.miscDetails?.incentive : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >Scheme: <span style={{ fontWeight: 'normal' }} >{popUpData?.miscDetails?.scheme ? popUpData?.miscDetails?.scheme : 'Null'}</span> </li>
                        <li style={{ borderBottom: '1px solid #ccc', padding: '0px 15px' }} >SIF Status: <span style={{ fontWeight: 'normal' }} >{popUpData?.miscDetails?.sifStatus ? popUpData?.miscDetails?.sifStatus : 'Null'}</span> </li>
                        <li style={{ padding: "0px 15px" }}  >SIF Link: <span style={{ fontWeight: 'normal' }} >{popUpData?.miscDetails?.sifLink ? popUpData?.miscDetails?.sifLink : 'Null'}</span> </li>
                    </ul>
                </Box>
            </Modal>



        </div>
    )
}
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}
