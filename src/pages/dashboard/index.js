import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import {dashboardResponseData} from "../../store/reducers/Dashboard/dashboardSlice";
import { builderProjectResponse } from '../../store/reducers/Booking/createBookingSlice'
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {Button, Grid, Typography } from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');





  useEffect(() => {
    dispatch(dashboardResponseData()),
    dispatch(builderProjectResponse(0));
},[])

const dashboardData = useSelector((state) => state.dashboardSlice.data);
const bookingdata = useSelector((state) => state.booking.data);
// console.log(bookingdata,"dashboardData")


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

const handleSearchChange = (e) => {
  setSearchInput(e.target.value);
};
const handleSearch = (inputText) => {
  if (inputText === '') {
      dispatch(builderProjectResponse(0));
  } else if (inputText.length >= 3) {
      dispatch(builderProjectResponse({ payload: inputText, search: age }))
      // dispatch(builderProjectResponse(inputText, age));
  }
}
const clearSearch = () => {
  setAge(''),
      setSearchInput(''),
      dispatch(builderProjectResponse(0))
}

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Bookings" count={dashboardData?.totalBookings}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Current Month Booking" count={dashboardData?.totalBookings}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Projects" count="18,800"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Unit Category" count="$35,078"/>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      <Grid item lg={12}>
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
                placeholder={age === 'bookingDate' ? 'yyyy-mm or yyyy-mm-dd' : 'Search'}
                style={{ maxWidth: '200px', width: '100%', borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', paddingLeft: '8px', outline: 'none' }}
            />
            <Button sx={{ width: '200' }} variant="contained" onClick={() => handleSearch(searchInput)} >Search</Button>
            <Button sx={{ width: '200' }} variant="contained" onClick={() => clearSearch()} >Clear</Button>

        </div>
        <MainCard content={false}>
          <OrdersTable bookingdata={bookingdata} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
