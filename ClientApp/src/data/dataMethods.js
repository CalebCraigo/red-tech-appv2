import axios from 'axios';

const config = {
  // headers:{
  //   ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4'
  // }
};
const url = 'http://localhost:5000/api/Orders';

function getOrders(callback) {
    return new Promise(resolve => {axios.get(url)
    .then(res=> callback(res))
    .catch(err=> console.log(err))
    resolve('resolved');
    })
}

function getOrdersByType(types, callback){
  axios.get(url, config, types)
  .then(res => callback(res))
  .catch(err => console.log('err', err))
}

function postOrder(order, callback) {
    return new Promise(resolve => {axios.post(url, order)
    .then(res => callback(res))
    .catch(err => console.log('err', err))
    })
}

function deleteOrder(orderIds, callback) {
  const url = `http://localhost:5000/api/Orders/${orderIds}`;
  return new Promise(resolve => {axios.delete(url, orderIds, callback)
    .then(res => callback)
    .catch(err => console.log('err', err))
    resolve('resolved');
  })
}

export { getOrders, getOrdersByType, postOrder, deleteOrder}
