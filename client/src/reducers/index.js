import { FETCH_PRODUCTS } from 'actions';

const initialState = {
    products: {
        loading: false,
        error: null,
        data: null
    }
}

const fetchListingReducer = ( state = initialState, action ) => {
    switch (action.key) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: true
                }
            };
    
        default:
            return state;
    }
}

export default fetchListingReducer;