import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchProducts } from "actions";
import { actions } from 'reducers';
import ProductCategory from './productCategory';


const mapStateToProps = (state) => state.products;

const mapDispatchToProps = (dispatch) => {
    return {
        listingActions: bindActionCreators(actions, dispatch)
    };
};

const ProductCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(ProductCategory);

export default ProductCategoryContainer;