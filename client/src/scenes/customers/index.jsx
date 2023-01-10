import React from 'react'
import { Box , useTheme } from '@mui/material'
import { useGetCustomerQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'



const Customers = () => {
  const theme = useTheme();
  const {data , isLoading} = useGetCustomerQuery();

  const columns =[
     {
        field: '_id',
        headerName: 'ID',
        flex: 1,
      },

      {
        field: 'name',
        headerName: 'Name',
        flex: 0.5,
      },

      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
      },

      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        flex: 0.5,
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        }
      },

      {
        field: 'country',
        headerName: 'Country',
        flex: 0.4,
      },

      {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
      },

      {
        field: "role",
        headerName: "Role",
        flex: 0.5
      }

  ]

  console.log('data', data);
  return (
    <Box m = "1.5rem 2.5rem">
        <Header title= "CUSTOMERS"  subtitle="List of Customers"/>
        <Box sx = {{height: "75vh", width: '100%'}}>
            <DataGrid
                loading = {isLoading || !data}
                rows = {data || []}
                columns = { columns }
                getRowId ={(row) => row._id}

            />
        </Box>
    </Box>
  )
}

export default Customers
