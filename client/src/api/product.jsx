const BASE_URL = '/api';

export const getAllProducts = async () => {
    try 
    {
        const res = await fetch(`${BASE_URL}/product`);
        const data = await res.json();
        if(res.status === 200) return data;
        else {
            if(data.hasOwnProperty('error')) console.log('Request failed with error : '+data.error);
            return ({});
        };
    } 
    catch (error) { console.log('Error while getting products : '+error) }
}