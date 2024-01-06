import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Booking = Loadable(lazy(() => import('pages/components-overview/Booking/Booking')));
const BookingList = Loadable(lazy(() => import('pages/components-overview/Listing/BookingList')));
const Builder = Loadable(lazy(() => import('pages/components-overview/Builder/Builder')));
const PropertyType = Loadable(lazy(() => import('pages/components-overview/PropertyTypeData/PropertyType')))
const UnitCatergory = Loadable(lazy(() => import('pages/components-overview//UnitCategory/UnitCategoryData')))
const Projects = Loadable(lazy(() => import('pages/components-overview/ProjectData/Project')))
const Units = Loadable(lazy(() => import("pages/components-overview/UnitsData/Unit")))
const Payment =Loadable(lazy(()=>import("pages/components-overview/PaymentPlane/Payment")))
const BuilderList =Loadable(lazy(()=>import("pages/components-overview/Listing/BuilderList")))
const ProjectList=Loadable(lazy(()=>import("pages/components-overview/Listing/ProjectList")))
const PropertyTypeList=Loadable(lazy(()=>import("pages/components-overview/Listing/PropertyTypeList")))
const UnitCategoryList=Loadable(lazy(()=>import("pages/components-overview/Listing/UnitCategoryList")))
const UnitList=Loadable(lazy(()=>import("pages/components-overview/Listing/UnitList")))
const PaymentPlan=Loadable(lazy(()=>import("pages/components-overview/Listing/PaymentPlan")))
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
    {
      path: 'bookinglist',
      element: <BookingList />
    },

    {
      path: 'booking',
      element: <Booking />
    },
    {
      path: 'builder',
      //title: 'Builder',
      element: <Builder />
    },
    {
      path: 'propertytype',
      element: <PropertyType />
    },
    {
      path: 'unitcategory',
      element: <UnitCatergory />
    },
    {
      path: 'projectdata',
      element: <Projects />
    },
    {
      path:'units',
      element:<Units/>
    },
    {
      path:'paymentplan',
      element:<Payment/>
    },
    {
      path:'builderlist',
      element:<BuilderList/>
    },
    {
      path:'paymentplanlist',
      element:<PaymentPlan/>
    },
    {
      path:'projectlist',
      element:<ProjectList/>
    },
    {
      path:'propertytypelist',
      element:<PropertyTypeList/>
    },
    {
      path:'unitcategorylist',
      element:<UnitCategoryList/>
    },
    {
      path:'unitlist',
      element:<UnitList/>
    },
    
  ]
};

export default MainRoutes;


