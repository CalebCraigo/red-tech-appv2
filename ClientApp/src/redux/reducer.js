import { combineReducers } from 'redux';

const draftOrdersReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_ORDER":
            return[
                ...state, 
                {  
                    orderId: action.payload.orderId,
                    orderType: action.payload.orderType, 
                    customerName: action.payload.customerName, 
                    createdDate: action.payload.createdDate, 
                    createdByUserName: action.payload.createdByUserName
                }
            ]
        default: return state
    }
}

const rootReducer = combineReducers({
    draftOrders: draftOrdersReducer
});

export default rootReducer;