// assets
// import {
//   AppstoreAddOutlined,
//   AntDesignOutlined,
//   BarcodeOutlined,
//   BgColorsOutlined,
//   FontSizeOutlined,
//   LoadingOutlined
// } from '@ant-design/icons';

// icons
// const icons = {
//   FontSizeOutlined,
//   BgColorsOutlined,
//   BarcodeOutlined,
//   AntDesignOutlined,
//   LoadingOutlined,
//   AppstoreAddOutlined
// };

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  // title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'booking',
      title: 'Booking',
      type: 'item',
      url: '/bookinglist',
    },
    {
      id: 'builderlist',
      title: 'Builder',
      type: 'item',
      url: '/builderlist',
    },
    {
      id: 'propertytypelist',
      title: 'Property Type',
      type: 'item',
      url: '/propertytypelist',
    },
    {
      id: 'unitcategorylist',
      title: 'Unit Category',
      type: 'item',
      url: '/unitcategorylist',
    },
    {
      id: 'projectlist',
      title: 'Projects',
      type: 'item',
      url: '/projectlist',
    },
    {
      id:'unitlist',
      title:"Units",
      type:'item',
      url:'/unitlist'
    },
    {
      id:'paymentplanlist',
      title:"Payment Plan",
      type:'item',
      url:'/paymentplanlist'
    }
  ]
};

export default utilities;
