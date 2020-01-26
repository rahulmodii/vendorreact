import axios from 'axios'

// const baseurl = 'http://127.0.0.1:8000/api/'

export const fetchVendor= () => dispatch => {
    axios.get(`http://127.0.0.1:8000/api/v1/vendors`)
    .then(vendor=>dispatch({
        type:'FETCH_VENDOR',
        payload:vendor.data.data
    }))
    
} 
export const fetchSingleVendor= (id) => dispatch => {
    axios.get(`http://127.0.0.1:8000/api/v1/vendor/${id}`)
    .then(vendor=>dispatch({
        type:'FETCH_SINGLE_VENDOR', 
        payload:vendor.data.data
    }))
} 
export const fetchSearchVendor= (query) => dispatch => {
    axios.get(`http://127.0.0.1:8000/api/v1/search/${query}`)
    .then(vendor=>dispatch({
        type:'FETCH_SEARCH_VENDOR', 
        payload:vendor.data.data
    }))
}

export const fetchCountries = () => dispatch =>{
    axios.get(`http://127.0.0.1:8000/api/v1/countries`)
    .then(response=>dispatch({
        type:'FETCH_COUNTRIES',
        payload:response.data.data
    }));

}