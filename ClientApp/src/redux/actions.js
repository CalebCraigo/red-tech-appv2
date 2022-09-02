function addDraftOrder(order) {
    return {
        type: "ADD_ORDER",
        payload: {
            orderId: order.orderId,
            orderType: order.orderType, 
            customerName: order.customerName, 
            createdDate: order.createdDate, 
            createdByUserName: order.createdByUserName
        }
    }
}

export { addDraftOrder }