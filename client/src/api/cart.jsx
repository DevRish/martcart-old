import { getAllProducts } from "./product";

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
        const productData = await getAllProducts();
        if(res.status === 200)
        {
            let dataArr = [];
            // console.log(data);
            for(let x in data.cart)
            {
                // console.log(data.cart[x]);
                let item = productData.products.find(product => { return product._id === data.cart[x].prodid });
                item = { ...item, quantity: data.cart[x].quantity };
                // console.log(product);
                dataArr.push(item)
            }
            return dataArr.reverse();
        }
        else {
            if(data.hasOwnProperty('error')) console.log('Request failed with error : '+data.error);
            return [];
        };
    } 
    catch (error) { console.log('Error while getting cart : '+error) }
}

export const addCartItem = async (itemdata) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/cart/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(itemdata)
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
    catch (error) { console.log('Error while adding item to cart : ' + error ) }
}

export const removeCartItem = async (itemdata) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/cart/removeItem`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(itemdata)
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
    catch (error) { console.log('Error while removing item from cart : ' + error) }
}