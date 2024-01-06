// third-party
import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './reducers/Project/projectSlice'; // Replace with your slice file
import builderSlice from './reducers/Builder/builderSlice';
import propertySlice from './reducers/PropertyType/propertySlice';
import paymentSlice from './reducers/PaymentPlane/paymentSlice';
import unitcategorySlice from './reducers/UnitCategory/unitcategorySlice';
import unitSlice from './reducers/Units/unitSlice';
import bookingSlice from './reducers/Booking/createBookingSlice';
import usersSlice from './reducers/Users/users';
import dashboardSlice from './reducers/Dashboard/dashboardSlice';
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  project: projectSlice,
  builder: builderSlice,
  property: propertySlice,
  payment: paymentSlice,
  unitcaterory: unitcategorySlice,
  unit: unitSlice,
  booking: bookingSlice, 
  users:usersSlice,
  dashboard: dashboardSlice,
});
const { dispatch } = store;

export { store, dispatch };
