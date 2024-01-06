// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import projectSlice from './Project/projectSlice';
import builderSlice from './Builder/builderSlice';
import propertySlice from './PropertyType/propertySlice';
import paymentSlice from './PaymentPlane/paymentSlice';
import unitcategorySlice from './UnitCategory/unitcategorySlice';
import unitSlice from './Units/unitSlice';
import booking from './Booking/createBookingSlice';
import usersSlice from './Users/users';
import dashboardSlice from './Dashboard/dashboardSlice';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, projectSlice, builderSlice, propertySlice, paymentSlice, unitcategorySlice, unitSlice, booking, usersSlice, dashboardSlice });

export default reducers;
