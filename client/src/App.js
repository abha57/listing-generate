import React from "react";
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import ProductCategory from 'containers/productCategory';

const App = () => (
  <div>
  <nav>
    <Link to='/listing'>Go to listing</Link>
  </nav>
    <Route path='/listing' component={ProductCategory} />
  </div>
);

export default App;
