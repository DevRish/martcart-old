import { ProductData } from './../helpers/ProductData'

const BASE_URL = '/api';

export const getCart = async (currUser) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/cart/getCart`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ currUser })
        });
        const data = await res.json();
        let dataArr = [];
        for(let x in data.cart)
        {
            let product = ProductData.find(obj => { return obj.id === data.cart[x]});
            dataArr.push(product)
        }
        return dataArr.reverse();
    } 
    catch (error) { console.log('Error while getting cart : '+error) }
}

export const addCartItem = async (data) => {
    try 
    {
        fetch(`${BASE_URL}/cart/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    } 
    catch (error) { console.log('Error while adding item to cart : ' + error ) }
}

export const removeCartItem = async (data) => {
    try 
    {
        fetch(`${BASE_URL}/cart/removeItem`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    } 
    catch (error) { console.log('Error while removing item from cart : ' + error) }
}