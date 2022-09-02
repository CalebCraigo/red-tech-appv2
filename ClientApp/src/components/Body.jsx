import React, { useState, useEffect }  from 'react';
import Table from './Table.jsx'
import CreateOrder from './CreateOrder.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";
import Chip from '@mui/material/Chip';

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getOrders, deleteOrder } from '../data/dataMethods';
import { connect } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/body.css';


const Body = (props) => {
    const [searchText, setSearchText] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [listData, setListData] = useState([])
    const [selectedOrderTypes, setSelectOrderTypes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [listSelection, setListSelection] = useState([]);

    const orderTypes = [
        'Standard',
        'SaleOrder', 
        'PurchaseOrder', 
        'TransferOrder', 
        'ReturnOrder'
    ]

    async function setData () {
        const handleDataFetch = (res) => {
            console.log("res.data", res.data)
            setListData(res.data);
        }
        await getOrders(handleDataFetch)
    }
    useEffect(() => {
        if(props.results && props.results.length > 0){
            setMasterData(props.results);
            setListData(props.results);
        }
    }, [props.results], masterData, listData);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const filterBySearch = (text) => {
        let newArr = [];;
        console.log(masterData.filter((item) => item.orderId.includes(text)))
        newArr.push(masterData.filter((item) => item.orderId.includes(text)))
        setListData(...newArr);
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        filterBySearch(event.target.value)
    }

    //Handles order type filter
    useEffect(() => {
        setListData(masterData.filter(res => selectedOrderTypes.includes(res.orderType)));
    }, [selectedOrderTypes])
    
    const handleOrderTypeFilter = (event) => {
        const {
            target: { value },
        } = event;
        setSelectOrderTypes(
            typeof value === 'string' ? value.split(',') : value,
        );
        //clears filter if all items deselected
        if(event.target.value.length === 0){
            setListData(masterData);
        }
    };

    const handleModalOpen= () => {
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    async function handleDelete() {
        await deleteOrder(listSelection)
        let newArr = [...listData];
        listData.forEach(item => {
            if(listSelection.indexOf(item.orderId) !== -1){
                newArr.splice(newArr.indexOf(item), 1);
            }
        })
        
        setListData(newArr);
        setMasterData(newArr);
    }

    return(
        <ThemeProvider theme={props.theme}>
        <div>
            {!props.isDrafts ?
                <div>
                    <Box
                        bgcolor="primary.light"
                        component="form"
                        sx={{
                            flexGrow: 1
                        }}
                        noValidate
                        autoComplete="off"
                        className="formBox"
                    >
                        <div className="searchForm">
                            <TextField
                                id="search-bar"
                                className="text"
                                onChange={handleSearch}
                                label="Search By Id"
                                variant="outlined"
                                size="small"
                                value={searchText}
                            />
                            <IconButton 
                                type="submit" 
                                aria-label="search" 
                                style={{ 
                                    backgroundColor: "#3872b4",
                                    borderRadius: "10%"
                                }}>
                                <SearchIcon style={{ fill: "#fff" }} />
                            </IconButton>
                        </div>
                        <Button 
                            variant="contained"
                            className="createOrderButton" 
                            onClick={handleModalOpen}
                            color="info"
                        >
                            <AddIcon />
                            Create Order
                        </Button>
                        <Button 
                            variant="contained"
                            className="deleteSelectedButton"
                            onClick={handleDelete}
                            color="info"
                        >
                            <DeleteIcon />
                            Delete Selected
                        </Button>
                        <FormControl sx={{ m: 1.9, width: 250}} size="small" className="orderTypeForm">
                            <InputLabel id="order-type-label" className="orderTypeLabel">Order Type</InputLabel>
                            <Select
                                labelId="order-type-label"
                                className="selectionBox"
                                id="order-type"
                                multiple
                                value={selectedOrderTypes}
                                onChange={handleOrderTypeFilter}
                                input={<OutlinedInput label="orderType" />}
                                renderValue={(selected) => (
                                <Box className="chipOuterBox" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip className="valueChip" key={value} label={value} />
                                ))}
                                </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                            {orderTypes.map((orderType) => (
                                <MenuItem
                                key={orderType}
                                value={orderType}

                                >
                                {orderType}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Table theme={props.theme} results= {listData} setListSelection={setListSelection} isDrafts={props.isDrafts}/>
                </div>
                :
                <Table theme={props.theme} results= {props.draftOrders} setListSelection={setListSelection} isDrafts={props.isDrafts}/>
            }
            {modalOpen ?
                <CreateOrder 
                    open={modalOpen}
                    handleClose={handleModalClose}
                    orderTypes={orderTypes}
                    setData={setData}
                    listData={listData}
                />
                :
                <div />
            }
        </ div>
        </ThemeProvider>
    )
};

const mapStateToProps = state => {
    return {
        draftOrders: state.draftOrders
    }
}
export default connect(mapStateToProps)(Body);