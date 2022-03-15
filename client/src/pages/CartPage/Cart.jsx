import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from './../../config/keys';
import Spinner from './../../components/Spinner/Spinner';
import "./Cart.css";
import "./../ProductPage/Product.css";

//import { cartdata } from '../Helpers/TestSampleData/CartData';
import { ProductData } from './../../helpers/ProductData';
import Visa from './../../assets/visa.svg';
import MasterCard from './../../assets/mastercard.svg';
import Paypal from './../../assets/paypal.svg';

const stateList = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telengana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

const cityList = ['Adilabad','Agra','Ahmedabad','Ahmednagar','Aizawl','Ajmer','Akola','Alappuzha','Aligarh','Alirajpur','Allahabad','Almora','Alwar',
'Ambala','Ambedkar Nagar','Amravati','Amreli district','Amritsar','Anand','Anantapur','Anantnag','Angul','Anjaw','Anuppur','Araria','Ariyalur','Arwal',
'Ashok Nagar','Auraiya','Aurangabad','Aurangabad','Azamgarh','Badgam','Bagalkot','Bageshwar','Bagpat','Bahraich','Baksa','Balaghat','Balangir','Balasore',
'Ballia','Balrampur','Banaskantha','Banda','Bandipora','Bangalore Rural','Bangalore Urban','Banka','Bankura','Banswara','Barabanki','Baramulla',
'Baran','Bardhaman','Bareilly','Bargarh (Baragarh)','Barmer','Barnala','Barpeta','Barwani','Bastar','Basti','Bathinda','Beed','Begusarai','Belgaum','Bellary','Betul','Bhadrak','Bhagalpur','Bhandara','Bharatpur','Bharuch','Bhavnagar','Bhilwara','Bhind','Bhiwani','Bhojpur','Bhopal','Bidar','Bijapur','Bijapur','Bijnor','Bikaner','Bilaspur','Bilaspur','Birbhum','Bishnupur','Bokaro','Bongaigaon','Boudh (Bauda)','Budaun','Bulandshahr','Buldhana','Bundi','Burhanpur','Buxar','Cachar','Central Delhi','Chamarajnagar','Chamba','Chamoli','Champawat','Champhai','Chandauli','Chandel','Chandigarh','Chandrapur','Changlang','Chatra','Chennai','Chhatarpur','Chhatrapati Shahuji Maharaj Nagar','Chhindwara','Chikkaballapur','Chikkamagaluru','Chirang','Chitradurga','Chitrakoot','Chittoor','Chittorgarh','Churachandpur','Churu','Coimbatore','Cooch Behar','Cuddalore','Cuttack','Dadra and Nagar Haveli','Dahod','Dakshin Dinajpur','Dakshina Kannada','Daman','Damoh','Dantewada','Darbhanga','Darjeeling','Darrang','Datia','Dausa','Davanagere','Debagarh (Deogarh)','Dehradun','Deoghar','Deoria','Dewas','Dhalai','Dhamtari','Dhanbad','Dhar','Dharmapuri','Dharwad','Dhemaji','Dhenkanal','Dholpur','Dhubri','Dhule','Dibang Valley','Dibrugarh','Dima Hasao','Dimapur','Dindigul','Dindori','Diu','Doda','Dumka','Dungapur','Durg','East Champaran','East Delhi','East Garo Hills','East Khasi Hills','East Siang','East Sikkim','East Singhbhum','Eluru','Ernakulam','Erode','Etah','Etawah','Faizabad','Faridabad','Faridkot','Farrukhabad','Fatehabad','Fatehgarh Sahib','Fatehpur','Fazilka','Firozabad','Firozpur','Gadag','Gadchiroli','Gajapati','Ganderbal','Gandhinagar','Ganganagar','Ganjam','Garhwa','Gautam Buddh Nagar','Gaya','Ghaziabad','Ghazipur','Giridih','Goalpara','Godda','Golaghat','Gonda','Gondia','Gopalganj','Gorakhpur','Gulbarga','Gumla','Guna','Guntur','Gurdaspur','Gurgaon','Gwalior','Hailakandi','Hamirpur','Hamirpur','Hanumangarh','Harda','Hardoi','Haridwar','Hassan','Haveri district','Hazaribag','Hingoli','Hissar','Hooghly','Hoshangabad','Hoshiarpur','Howrah','Hyderabad','Hyderabad','Idukki','Imphal East','Imphal West','Indore','Jabalpur','Jagatsinghpur','Jaintia Hills','Jaipur','Jaisalmer','Jajpur','Jalandhar','Jalaun','Jalgaon','Jalna','Jalore','Jalpaiguri','Jammu','Jamnagar','Jamtara','Jamui','Janjgir-Champa','Jashpur','Jaunpur district','Jehanabad','Jhabua','Jhajjar','Jhalawar','Jhansi','Jharsuguda','Jhunjhunu','Jind','Jodhpur','Jorhat','Junagadh','Jyotiba Phule Nagar','Kabirdham (formerly Kawardha)','Kadapa','Kaimur','Kaithal','Kakinada','Kalahandi','Kamrup','Kamrup Metropolitan','Kanchipuram','Kandhamal','Kangra','Kanker','Kannauj','Kannur','Kanpur','Kanshi Ram Nagar','Kanyakumari','Kapurthala','Karaikal','Karauli','Karbi Anglong','Kargil','Karimganj','Karimnagar','Karnal','Karur','Kasaragod','Kathua','Katihar','Katni','Kaushambi','Kendrapara','Kendujhar (Keonjhar)','Khagaria','Khammam','Khandwa (East Nimar)','Khargone (West Nimar)','Kheda','Khordha','Khowai','Khunti','Kinnaur','Kishanganj','Kishtwar','Kodagu','Koderma','Kohima','Kokrajhar','Kolar','Kolasib','Kolhapur','Kolkata','Kollam','Koppal','Koraput','Korba','Koriya','Kota','Kottayam','Kozhikode','Krishna','Kulgam','Kullu','Kupwara','Kurnool','Kurukshetra','Kurung Kumey','Kushinagar','Kutch','Lahaul and Spiti','Lakhimpur','Lakhimpur Kheri','Lakhisarai','Lalitpur','Latehar','Latur','Lawngtlai','Leh','Lohardaga','Lohit','Lower Dibang Valley','Lower Subansiri','Lucknow','Ludhiana','Lunglei','Madhepura','Madhubani','Madurai','Mahamaya Nagar','Maharajganj','Mahasamund','Mahbubnagar','Mahe','Mahendragarh','Mahoba','Mainpuri','Malappuram','Maldah','Malkangiri','Mamit','Mandi','Mandla','Mandsaur','Mandya','Mansa','Marigaon','Mathura','Mau','Mayurbhanj','Medak','Meerut','Mehsana','Mewat','Mirzapur','Moga','Mokokchung','Mon','Moradabad','Morena','Mumbai City','Mumbai suburban','Munger','Murshidabad','Muzaffarnagar','Muzaffarpur','Mysore','Nabarangpur','Nadia','Nagaon','Nagapattinam','Nagaur','Nagpur','Nainital','Nalanda','Nalbari','Nalgonda','Namakkal','Nanded','Nandurbar','Narayanpur','Narmada','Narsinghpur','Nashik','Navsari','Nawada','Nawanshahr','Nayagarh','Neemuch','Nellore','New Delhi','Nilgiris','Nizamabad','North 24 Parganas','North Delhi','North East Delhi','North Goa','North Sikkim','North Tripura','North West Delhi','Nuapada','Ongole','Osmanabad','Pakur','Palakkad','Palamu','Pali','Palwal','Panchkula','Panchmahal','Panchsheel Nagar district (Hapur)','Panipat','Panna','Papum Pare','Parbhani','Paschim Medinipur','Patan','Pathanamthitta','Pathankot','Patiala','Patna','Pauri Garhwal','Perambalur','Phek','Pilibhit','Pithoragarh','Pondicherry','Poonch','Porbandar','Pratapgarh','Pratapgarh','Pudukkottai','Pulwama','Pune','Purba Medinipur','Puri','Purnia','Purulia','Raebareli','Raichur','Raigad','Raigarh','Raipur','Raisen','Rajauri','Rajgarh','Rajkot','Rajnandgaon','Rajsamand','Ramabai Nagar (Kanpur Dehat)','Ramanagara','Ramanathapuram','Ramban','Ramgarh','Rampur','Ranchi','Ratlam','Ratnagiri','Rayagada','Reasi','Rewa','Rewari','Ri Bhoi','Rohtak','Rohtas','Rudraprayag','Rupnagar','Sabarkantha','Sagar','Saharanpur','Saharsa','Sahibganj','Saiha','Salem','Samastipur','Samba','Sambalpur','Sangli','Sangrur','Sant Kabir Nagar','Sant Ravidas Nagar','Saran','Satara','Satna','Sawai Madhopur','Sehore','Senapati','Seoni','Seraikela Kharsawan','Serchhip','Shahdol','Shahjahanpur','Shajapur','Shamli','Sheikhpura','Sheohar','Sheopur','Shimla','Shimoga','Shivpuri','Shopian','Shravasti','Sibsagar','Siddharthnagar','Sidhi','Sikar','Simdega','Sindhudurg','Singrauli','Sirmaur','Sirohi','Sirsa','Sitamarhi','Sitapur','Sivaganga','Siwan','Solan','Solapur','Sonbhadra','Sonipat','Sonitpur','South 24 Parganas','South Delhi','South Garo Hills','South Goa','South Sikkim','South Tripura','South West Delhi','Sri Muktsar Sahib','Srikakulam','Srinagar','Subarnapur (Sonepur)','Sultanpur','Sundergarh','Supaul','Surat','Surendranagar','Surguja','Tamenglong','Tarn Taran','Tawang','Tehri Garhwal','Thane','Thanjavur','The Dangs','Theni','Thiruvananthapuram','Thoothukudi','Thoubal','Thrissur','Tikamgarh','Tinsukia','Tirap','Tiruchirappalli','Tirunelveli','Tirupur','Tiruvallur','Tiruvannamalai','Tiruvarur','Tonk','Tuensang','Tumkur','Udaipur','Udalguri','Udham Singh Nagar','Udhampur','Udupi','Ujjain','Ukhrul','Umaria','Una','Unnao','Upper Siang','Upper Subansiri','Uttar Dinajpur','Uttara Kannada','Uttarkashi','Vadodara','Vaishali','Valsad','Varanasi','Vellore','Vidisha','Viluppuram','Virudhunagar','Visakhapatnam','Vizianagaram','Vyara','Warangal','Wardha','Washim','Wayanad','West Champaran','West Delhi','West Garo Hills','West Kameng','West Khasi Hills','West Siang','West Sikkim','West Singhbhum','West Tripura','Wokha','Yadgir','Yamuna Nagar','Yanam','Yavatmal','Zunheboto']

const CartCheckout = (props) => {
    const [userData, setUserData] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [payChosen, setPayChosen] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        fetch(`${SERVER_URL}/getUserData`, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                currUser: props.currUser
            })
        }).then(res=>res.json()).then(data => {
            setUserData(data);
            setIsFetched(true);
        });
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const addOrder = async () => {
        if((address === '')||(city === '')||(state === '')||(pin === '')||(!payChosen)) setIsEmpty(true);
        else
        {
            //let delItems = [];
            for(let x in props.cartdata)
            {
                let item = props.cartdata[x];
                //delItems.push(item.id);
                fetch(`${SERVER_URL}/addOrder`, {
                    method: 'post',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        prodid: item.id,
                        date: date,
                        time: time,
                        quantity: 1,
                        totalPrice: (item.priceNew), 
                        address: (address+', '+city+', '+state+' - '+pin),
                        currUser: props.currUser
                    })
                }).then( async (res) => {
                    //console.log(`${item.id} added to orders`);
                    await props.removeFromCart(item.id);
                    //console.log(`${item.id} removed from cart`);
                })
            }
            // then() part was not previously getting executed as there was no response from /addOrders
            // then() part gets executed only if it ges a response
            //console.log('DelItems:');
            //console.log(delItems);
            //for(let y in delItems) props.removeFromCart(delItems[y])
            navigate('/myorders');
        }
    }
    return(
        <div className={ (props.checkoutVis) ? "checkoutCard checkoutVis" : "checkoutCard" }>
            { (!isFetched) && <Spinner /> }
            {
                isFetched &&
                <>
                <h1 style={{ width: "100%", textAlign: "center", color: "black" }}>ORDER DETAILS: </h1>
                <div className='order_info_outer'>
                    <div className='order_info_container'>
                        <p><b>Name:</b> {userData.firstname} {userData.lastname}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Phone:</b> {userData.phone}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Email:</b> {userData.email}</p> 
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_address"><b>Address:</b> </label>
                        <input type="text" id="cart_order_address" onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_city"><b>City:</b> </label>
                        <select id="cart_order_city" onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select City</option>
                            {
                                cityList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_state"><b>State:</b> </label>
                        <select id="cart_order_state" onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            {
                                stateList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='order_info_container'>
                        <label htmlFor="cart_order_pin"><b>Pin:</b>   </label>
                        <input type="text" id="cart_order_pin" onChange={(e) => setPin(e.target.value)} style={{ width: "50%" }} placeholder='Enter pin'/>
                    </div>
                    <div className='order_info_container'>
                        <p><b>Price:</b> Rs. {props.price}</p> 
                    </div>
                    <div className='order_info_container'>
                        <p><b>Choose payment method:</b></p>
                        <input type="radio" name="pay_methods" id="cart_pay_cash" style={{ width: "fit-content" }} onChange={() => setPayChosen(true)}/>
                        <label htmlFor="cart_pay_cash"> Cash on delivery</label><br />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_visa" style={{ 
                                width: "fit-content", 
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_visa"> <img src={Visa} alt='Visa'/> </label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_mastercard" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_mastercard"> <img src={MasterCard} alt='MasterCard'/></label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" name="pay_methods" id="cart_pay_paypal" style={{ 
                                width: "fit-content",
                                marginRight: "1rem" }} onChange={() => setPayChosen(true)}/>
                            <label htmlFor="cart_pay_paypal"> <img src={Paypal} alt='Paypal'/></label><br />
                        </div>
                    </div>
                    { isEmpty && <p style={{ color: 'red', fontSize: '1.5rem', margin: '1rem 4rem' }}>*Please specify all fields</p> }
                    <button className='order_paybtn' onClick={addOrder} style={{ 
                        color: "white", 
                        backgroundColor: "#230033",
                        paddingTop: "1rem",
                        paddingBottom: "1rem"
                    }}>Proceed</button>
                </div>
                </>
            }
        </div>
    )
}

const Cart = (props) => {
    const [cartdata, setCartData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [checkoutVis, setCheckoutVis] = useState(false);
    useEffect(() => {
        fetchCartData();
    }, [cartdata]);
    const fetchCartData = async () => {
        if(props.currUser !== '')
        {
            fetch(`${SERVER_URL}/getcartdata`, {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ currUser: props.currUser })
            }).then(res=>res.json()).then(data=>{
                //console.log('data.cart in then: ');
                //console.log(data.cart);
                let dataArr = [];
                for(let x in data.cart)
                {
                    //console.log(data.cart[x]);
                    //setCartData(cartdata.concat(ProductData.find(obj => { return obj.id === data.cart[x]})));
                    let product = ProductData.find(obj => { return obj.id === data.cart[x]});
                    //console.log(product);
                    dataArr.push(product)
                }
                //console.log(dataArr);
                setCartData(dataArr.reverse());
                setIsFetched(true);
            })
        }
    }
    const totalFunc = () => {
        var total = 0;
        for(let i=0; i<cartdata.length; i++) total += parseInt(cartdata[i].priceNew);
        return total;
    }
    const removeFromCart = async (id) => {
        fetch(`${SERVER_URL}/removeFromCart`, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prodid: id,
                currUser: props.currUser
            })
        })
        props.setCartCount(props.cartCount - 1)
    }
    return (
        <>
        {
            (props.currUser !== '') ?
            <div className="cartContainer">
                { (!isFetched) && <Spinner /> }
                {
                    (cartdata.length !== 0) && isFetched && 
                    <span><h1>Total Price : Rs { totalFunc() }</h1><button onClick={() => setCheckoutVis(!checkoutVis)}>Buy Now</button></span>
                }
                {
                    (checkoutVis && (props.currUser !== '')) && 
                    <CartCheckout currUser={props.currUser} checkoutVis={checkoutVis} cartdata={cartdata} price={totalFunc()} removeFromCart={removeFromCart}/>
                }
                {
                    ((cartdata.length !== 0) && isFetched) ?
                    cartdata.map((data, index) => {
                        return (
                            <div className="cartCard">
                                <div className="cartImg" style={{
                                    backgroundImage: `url(${data.img})`
                                }}></div>
                                <div className="cartDesc">
                                    <h4>{data.heading}</h4>
                                    <div style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                                        <p>
                                            <b> Rs {data.priceNew}  </b>
                                        </p>
                                        <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                                        <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                                    </div>
                                    <button onClick={() => removeFromCart(data.id)}>Remove From Cart</button>
                                </div>
                            </div>
                        )
                    }) :
                    isFetched && <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>No items to display in cart</h2>
                }
            </div> :
            <div className="cartContainer">
                <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>Please signin to view your cart</h2>
            </div>
        }
        </>
    )
}

export default Cart