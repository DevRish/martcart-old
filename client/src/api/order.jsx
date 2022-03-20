import { ProductData } from './../helpers/ProductData'

const BASE_URL = '/api';

export const getOrderData = async (currUser) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/order/getorderdata`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ currUser })
        });
        const data = await res.json();
        let dataArr = [];
        for(let x in data.orders)
        {
            let product = ProductData.find(obj => { return obj.id === data.orders[x].prodid });
            let order = {...product, ...(data.orders[x])}
            dataArr.push(order)
        }
        return dataArr.reverse();
    } 
    catch (error) { console.log('Error while getting cart : '+error) }
}

export const addNewOrder = async (order) => {
    try 
    {
        fetch(`${BASE_URL}/order/addOrder`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
    } 
    catch (error) { console.log('Error while adding order : ' + error) }
}