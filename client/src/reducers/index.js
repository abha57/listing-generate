import { typeCreator, apiTypeCreator, actionCreator } from 'utils/reducer';

const initialState = {
  products: {
    loading: false,
    error: null,
    data: null
  },
  uploadFiles :{
      loading: false,
      data: null,
      error: null
  }
};

const LISTING_TYPES = 'LISTING_TYPES';
const PRODUCT_TYPES = 'PRODUCT_TYPES';
const UPLOAD_FILES = 'UPLOAD_FILES';

const types = {
    ...typeCreator(LISTING_TYPES, ['']),
    ...apiTypeCreator(PRODUCT_TYPES),
    ...apiTypeCreator(UPLOAD_FILES)
};

const actions = {
    productsFetch: actionCreator(types.PRODUCT_TYPES.FETCH),
    productsSuccess: actionCreator(types.PRODUCT_TYPES.SUCCESS),
    productsError: actionCreator(types.PRODUCT_TYPES.ERROR),

    uploadFilesFetch: actionCreator(types.UPLOAD_FILES.FETCH),
    uploadFilesSuccess: actionCreator(types.UPLOAD_FILES.SUCCESS),
    uploadFilesError: actionCreator(types.UPLOAD_FILES.ERROR),
}

const fetchListingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PRODUCT_TYPES.FETCH:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true
        }
      };

    case types.PRODUCT_TYPES.SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: payload.data
        }
      };

    case types.PRODUCT_TYPES.ERROR:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: null,
          error: payload.error
        }
      };

      case types.PRODUCT_TYPES.RESET:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: null,
          error: null
        }
      };

      case types.UPLOAD_FILES.FETCH:
      return {
        ...state,
        uploadFiles: {
          ...state.uploadFiles,
          loading: true
        }
      };

    case types.UPLOAD_FILES.SUCCESS:
      return {
        ...state,
        uploadFiles: {
          ...state.uploadFiles,
          loading: false,
          data: payload.data
        }
      };

    case types.UPLOAD_FILES.ERROR:
      return {
        ...state,
        uploadFiles: {
          ...state.uploadFiles,
          loading: false,
          data: null,
          error: payload.error
        }
      };

      case types.UPLOAD_FILES.RESET:
      return {
        ...state,
        uploadFiles: {
          ...state.uploadFiles,
          loading: false,
          data: null,
          error: null
        }
      };

    default:
      return state;
  }
};

export default fetchListingReducer;
export {
    actions,
    types
}
