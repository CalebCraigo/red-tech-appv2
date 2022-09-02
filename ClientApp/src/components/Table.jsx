import React, { useState, useEffect }  from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import "../styles/table.css";

const Table = (props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        if(props.results && props.results.length > 0){
            setData(props.results)
        }
    })
    let columns = {}

    if(props.isDrafts){
        columns = [
            { 
                field: 'createdDate', 
                headerName: 'Draft Creation Date', 
                sortable: true,
                flex: 1
            },
            { 
                field: 'createdByUserName', 
                headerName: 'Created By', 
                sortable: true,
                flex: .5
            },
            {
                field: 'orderType',
                headerName: 'Order Type',
                sortable: true,
                flex: 1
            },
            {
                field: 'customerName',
                headerName: 'Customer',
                sortable: true,
                flex:3
            }
        ];
    }else{
        columns = [
        { 
            field: 'id', 
            headerName: 'Order Id',
            sortable: true,
            flex: 1.5
        },
        { 
            field: 'createdDate', 
            headerName: 'Creation Date', 
            sortable: true,
            flex: 1
        },
        { 
            field: 'createdByUsername', 
            headerName: 'Created By', 
            sortable: true,
            flex: .5
        },
        {
            field: 'type',
            headerName: 'Order Type',
            sortable: true,
            flex: 1
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            sortable: true,
            flex:3
        }
    ];
    }

    const selection = (event) =>{
        props.setListSelection(event)
    }

    return(
        <ThemeProvider theme={props.theme}>
            <div style={{ height: '900px', width: '100%' }}>
                <DataGrid
                    getRowId={(data) => data.id}
                    rows={data}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={selection}
                    disableSelectionOnClick={true}
                    sx={{
                        backgroundColor: 'primary.light'
                    }}
                    hideFooter={true}
                />
            </div>
        </ThemeProvider>
    )
}

export default Table;