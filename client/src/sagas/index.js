import { takeLatest, all, call, put } from 'redux-saga/effects';
import { types, actions } from 'reducers';
import { makeApiCall } from "services";

function* productFetchWorker({ payload }){
    const { productsSuccess, productsError } = actions;
    try {
        const resp = yield call(makeApiCall, payload);
        if(resp){
            yield put(productsSuccess, resp);
        }
    }
    catch(error){
        yield put(productsError, error);
    }
    
}

function* uploadFilesWorker({ payload }){
    const { uploadFilesSuccess, uploadFilesError } = actions;
    try {
        const resp = yield call(makeApiCall, payload);
        if(resp){
            yield put(uploadFilesSuccess, resp);
        }
    }
    catch(error){
        yield put(uploadFilesError, error);
    }
}
export function* listings() {
    yield takeLatest(types.PRODUCT_TYPES.FETCH, productFetchWorker);
    yield takeLatest(types.UPLOAD_FILES.FETCH, uploadFilesWorker);
}

export default function* rootSaga() {
  yield all([listings()]);
}