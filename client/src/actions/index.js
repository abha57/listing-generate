export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = (payload) => {
    return {
        type: FETCH_PRODUCTS,
        payload
    };
};
