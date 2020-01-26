const initialState = {
    vendor: [],
    singlevendor:[],
    country:[]
}


export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_VENDOR':
            return {
                ...state,
                vendor: action.payload
            }
        case 'FETCH_SINGLE_VENDOR':
            return {
                ...state,
                singlevendor: action.payload
            }
        case 'FETCH_SEARCH_VENDOR':
            return {
                ...state,
                vendor: action.payload
            }
        case 'FETCH_COUNTRIES':
            return {
                ...state,
                country: action.payload
            }
        default:
            return state;
    }
}