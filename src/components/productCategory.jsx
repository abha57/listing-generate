import React, { Component } from "react";
import _ from "lodash";
import ProductMetaData, { headers } from "../constants";
import Dropdown from "./dropdown";
import Dropzone from "./dropzone";
import List from "./List";

class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productMetaData: [],
      category: "",
      selectedCategory: ProductMetaData[0] || {},
      selectedFiles: [],
      fileUploadInProcess: false,
      fileCountError: false,
      formattedProducts: {}
    };
  }
  componentDidMount() {
    this.setState({
      productMetaData: ProductMetaData
    });
  }
  handleChange = id => {
    const { productMetaData } = this.state;

    const selectedProduct = productMetaData.find(product => product.id === id);
    this.setState({
      selectedCategory: selectedProduct
    });
  };

  createFormattedNames = () => {
    const { selectedFiles } = this.state;
    if (selectedFiles.length > 0) {
    }
  };

  productIdAlreadyPresent = (products, productId) => {
    return Object.keys(products).indexOf(productId) >= 0;
  };

  checkProduct = (imageTypes, formattedProducts, product) => {
    let mandatoryImageTypeNotFound = false;
    const foundImageTypes = _.intersection(
      imageTypes,
      formattedProducts[product].imageTypes
    );

    if (
      foundImageTypes.length !== imageTypes.length
    ) {
      mandatoryImageTypeNotFound = true;
    }
    if (mandatoryImageTypeNotFound) {
      formattedProducts[product].fileTypesMissing = true;
    }
    return formattedProducts;
  };

  checkRequiredFilesInEveryProduct = formattedProducts => {
    const { selectedCategory } = this.state;
    const mandatoryImageTypes = selectedCategory.imageTypes;

    // Object.keys(formattedProducts).map( function(product){
    //     let mandatoryImageTypeNotFound = false;
    //     const foundImageTypes = _.intersection(mandatoryImageTypes, formattedProducts[product].imageTypes);
    //
    //     if(foundImageTypes.length !== formattedProducts[product].imageTypes.length){
    //         mandatoryImageTypeNotFound = true;
    //     }
    //     if(mandatoryImageTypeNotFound){
    //         formattedProducts[product].fileTypesMissing = true;
    //     }
    // }.call(this, mandatoryImageTypes, formattedProducts));
    const formatProducts = Object.keys(formattedProducts).map(product =>
      this.checkProduct(mandatoryImageTypes, formattedProducts, product)
    );

    this.setState({
      formattedProducts: formatProducts[0]
    });
  };

  onDrop = acceptedFiles => {
    setTimeout(() => {}, 5000);
    const formattedProducts = {};
    for (let i = 0; i < acceptedFiles.length; i++) {
      const fileName = acceptedFiles[i].name.split(".")[0];
      const formattedName = fileName.split("_");
      const product = formattedName[0];
      const productId = formattedName[1];
      const imageType = formattedName[2];
      if (this.productIdAlreadyPresent(formattedProducts, productId)) {
        formattedProducts[productId].imageTypes.push(imageType);
      } else {
        formattedProducts[productId] = {
          id: productId,
          imageTypes: [],
          product
        };
        formattedProducts[productId].imageTypes.push(imageType);
      }
    }

    this.checkRequiredFilesInEveryProduct(formattedProducts);

    this.setState(
      {
        selectedFiles: acceptedFiles
      },
      () => {
        this.createFormattedNames();
      }
    );
  };

  isMinimumFileTypesError = () => {
    const { formattedProducts } = this.state;
    if (formattedProducts) {
      const errorHtml = Object.keys(formattedProducts).map(product => {
        if (
          formattedProducts[product] &&
          formattedProducts[product].fileTypesMissing
        ) {
          return (
            <div>
              Mandatory File types for {formattedProducts[product].product} with
              id: {formattedProducts[product].id} is missing.
            </div>
          );
        } else {
          return null;
        }
      });
      return errorHtml;
    }
    return null;
  };

  createProductTable = () => {
    const { formattedProducts } = this.state;

    return Object.keys(formattedProducts).length > 0 ?  <List products={formattedProducts} headers={headers} /> : null;
  };

  render() {
    const {
      selectedFiles,
      fileCountError,
      selectedCategory,
      productMetaData,
      fileUploadInProcess
    } = this.state;
    return (
      <div>
        <Dropdown selectors={productMetaData} onChange={this.handleChange}>
          Select product category
        </Dropdown>
        <Dropzone 
        data={{
          title: `Upload File`,
          initialStatus: undefined 
        }}
        actions={{
          onDrop: this.onDrop
        }}
        />
        {fileUploadInProcess && <div>Uploading files</div>}
        {!fileUploadInProcess && (
          <div>
            {selectedFiles.length > 0 && (
              <div>
                Files uploaded successfully:
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={`${file.name}${index}`}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {this.isMinimumFileTypesError()}
        {this.createProductTable()}
      </div>
    );
  }
}

export default ProductCategory;
