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
        if(res.status === 200)
        {
            let dataArr = [];
            for(let x in data.orders)
            {
                let product = ProductData.find(obj => { return obj.id === data.orders[x].prodid });
                let order = {...product, ...(data.orders[x])}
                dataArr.push(order)
            }
            return dataArr.reverse();
        }
        else {
            if(data.hasOwnProperty('error')) console.log('Request failed with error : '+data.error);
            return [];
        }
    } 
    catch (error) { console.log('Error while getting cart : '+error) }
}

export const addNewOrder = async (order) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/order/addOrder`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
        const data = await res.json();
        if(res.status === 200) {
            // if(data.hasOwnProperty('message')) console.log(data.message);
            return;
        }
        else {
            if(data.hasOwnProperty('error')) console.log('Request failed with error : '+data.error);
            return ;
        }
    } 
    catch (error) { console.log('Error while adding order : ' + error) }
}