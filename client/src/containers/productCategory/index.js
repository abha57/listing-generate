import { connect } from 'react-redux';
// import reducer from '../reducers';
import { fetchProducts } from "actions";
import ProductCategory from './productCategory';

const bindActionCreator = (action, dispatch) => {
    return function(){
        return dispatch(action.apply(this, arguments));
    }
}

const mapStateToProps = (state) => state.products;

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreator(fetchProducts, dispatch)
    };
};

const ProductCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(ProductCategory);

export default ProductCategoryContainer;