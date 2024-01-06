import { useState } from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';



// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable(props) {





  const data = {
    columns: [
      { field: 'bba', headerName: 'BBA', width: 70 },
      { field: 'bookingdate', headerName: 'Booking Date', width: 100 },
      { field: 'bookingtrplid', headerName: 'Booking TRPL Id', width: 150 },
      { field: 'clientname', headerName: 'Client Name', width: 130 },
      { field: 'unitnumber', headerName: 'Unit Number', width: 80 },
      { field: 'area', headerName: 'Area', width: 80 },
      { field: 'projectname', headerName: 'Project Name', width: 130 },
      { field: 'totalcost', headerName: 'Total Cost', width: 130 },
      { field: 'amountreceived', headerName: 'Amount Received', width: 130 },
      { field: 'percentreceived', headerName: 'Percentage Received', width: 130 },
      { field: 'bookingtype', headerName: 'Booking Type', width: 130 },
      { field: 'bookingstatus', headerName: 'Booking Status', width: 130 },
      { field: 'bookingby', headerName: 'Booking By', width: 130 },
    ],
  rows: props?.bookingdata && Object.keys(props?.bookingdata).length ? props?.bookingdata?.content?.map((item, idx) => ({
    id: idx,
    bba: item?.agreementDetails.bba,
    bookingdate: item?.bookingDate,
    bookingtrplid: item?.bookingTrplId,
    clientname: item?.clientDetails.clientName,
    unitnumber: item?.builderProjectUnitDetails?.unitNameText,
    area: item?.builderProjectUnitDetails?.area,
    projectname: item?.builderProjectUnitDetails?.projectNameText,
    totalcost: item?.bookingCostTotal,
    amountreceived: item?.amountReceivedTotal,
    percentreceived: item?.amountReceivedTotalPercentage,
    bookingtype: item?.bookingType,
    bookingstatus: item?.bookingStatus,
    bookingby: item?.bookingByName
  })) : []
}

  

  return (
   <>
   
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        disableRowSelectionOnClick 
        disableDensitySelector
        disableColumnFilter
        slots={{
          toolbar: GridToolbar,
        }}
        pagination
        initialState={{
          ...data.initialState,
          // pagination: { paginationModel: { pageSize: 10 } },
          columns: {
            ...data.initialState?.columns,
            columnVisibilityModel: {
              unitnumber: false,
              projectname:false,
              bookingby:false
            },
          },
        }}
      />
    </div>
   </>
  );
}
