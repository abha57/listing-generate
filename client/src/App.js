import React, { Component } from "react";
import axios from 'axios';
import ProductCategory from './components/productCategory';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  fetchDataFromDB = () => {
    axios.get('http://localhost:3001/api/getData')
      // .then((data) => data.json())
      .then((res) => {
        console.log('resepep', res);
        this.setState({ data: res.data })
      });
  }
  
  componentDidMount(){
   this.fetchDataFromDB();
  }
  render() {
    return (
      <div>
        <ProductCategory />
      </div>
    );
  }
}

export default App;
