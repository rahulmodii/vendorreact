import  {combineReducers} from 'redux'
import VendorReducer from './vendorReducer'

export default combineReducers({
    vendors:VendorReducer
})   