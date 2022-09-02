import React, { useState }  from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import { postOrder } from '../data/dataMethods';
import { connect } from 'react-redux';
import { addDraftOrder } from '../redux/actions';

import '../styles/createOrder.css';


const CreateOrder = (props) => {
    const [type, setType] = useState('');
    const [customerName, setCustomerName] = useState('');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
    };

    const orderTypes = [
        'Standard',
        'SaleOrder', 
        'PurchaseOrder', 
        'TransferOrder', 
        'ReturnOrder'
    ]

    const handleCustomerName = (event) => {
        setCustomerName(event.target.value);
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };
    const monthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);

        return date.toLocaleString([], {
            month: 'long',
        });
    }
    const dayName = (dayNumber) => {
        const names = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]

        return names[dayNumber]
    }

    const handleCreate = () => {
        const d = new Date()
        const date = dayName(d.getDay()) + ", "+ d.getDate() + " " + monthName(d.getMonth()) + " " + d.getFullYear();
        let newOrder = {}
        newOrder = {
            //UserName hardcode until OAuth connected
            createdByUserName: 'Caleb',
            customerName: customerName,
            orderType: type,
            createdDate: date,
        }
        postOrder(newOrder, props.setData)
        props.handleClose();
    }
    
    const handleDraft = () => {
        const d = new Date()
        const orderId = Math.random()
        const date = dayName(d.getDay()) + ", "+ d.getDate() + " " + monthName(d.getMonth()) + " " + d.getFullYear();
        let newOrder = {}
        newOrder = {
            //UserName hardcode until OAuth connected
            orderId: orderId,
            createdByUserName: 'Caleb',
            customerName: customerName,
            orderType: type,
            createdDate: date,
        }
        props.addDraftOrder(newOrder);
        props.handleClose();
    }

    const handleCancel = () => {
        setCustomerName('');
        setType('');
        props.handleClose();
    }

    return(
        <React.Fragment>
        <ThemeProvider theme={props.theme}>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} bgcolor="primary.light">
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" color="secondary.main">
                        Create Order
                    </Typography>
                        <Box
                            component="form"
                            sx
                        >
                            <TextField 
                                id="customer" 
                                label="Customer" 
                                variant="outlined"
                                value={customerName}
                                onChange={handleCustomerName}
                                className="customer"
                                style={{width: '100%', paddingBottom:'10px', paddingTop:'10px'}}
                            />
                        </Box>
                    <FormControl fullWidth style={{paddingBottom: '20px'}}>
                        <InputLabel id="type" className="orderTypeLabel">Order Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={type}
                            label="Order Type"
                            onChange={handleChange}
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
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button 
                            variant="contained"
                            className="createButton"
                            onClick={handleCreate}
                            color="info"
                        >
                            Create
                        </Button>
                        <Button
                            variant="contained"
                            className="createButton"
                            onClick={handleDraft}
                            color="info"
                        >
                            Save Draft
                        </Button>
                        <Button 
                            variant="contained"
                            className="cancelButton"
                            onClick={handleCancel}
                            color="info"
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            </ThemeProvider>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addDraftOrder: order => dispatch(addDraftOrder(order))
    }
}

export default connect(null, mapDispatchToProps)(CreateOrder);