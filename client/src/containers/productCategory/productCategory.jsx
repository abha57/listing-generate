import React, { Component } from "react";
// import _ from "lodash";
// import classnames from 'classnames';
import ProductMetaData, { headers } from "constants/index";
import Dropdown from "components/dropdown";
import Dropzone from "components/dropzone";
import List from "components/List";
import JeansForm from "components/jeansForm";
import ShirtForm from "components/shirtForm";
import auth0Client from 'auth';
// import * as s from "./style.scss";

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
      formattedProducts: {},
      uploadedFileUrl: ''
    };
  }
  componentDidMount() {
    console.log('this.prosp', this.props);
    const { listingActions } = this.props;
    const { productsFetch } = listingActions;
    productsFetch('le le');
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
    // const foundImageTypes = _.intersection(
    //   imageTypes,
    //   formattedProducts[product].imageTypes
    // );
    const foundImageTypes = imageTypes;

    if (foundImageTypes.length !== imageTypes.length) {
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
    const formatProducts = Object.keys(formattedProducts).map(product =>
      this.checkProduct(mandatoryImageTypes, formattedProducts, product)
    );

    this.setState({
      formattedProducts: formatProducts[0]
    });
  };

  onDrop = acceptedFiles => {
    const formattedProducts = {};
    const { listingActions: { uploadFilesFetch } } = this.props;
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
        const { selectedFiles } = this.state;
        // axios
        //   .post("http://localhost:3001/api/uploadFiles", {
        //     files: selectedFiles
        //   })
        //   .then(function(response) {
        //     console.log('response in post', response);
        //   })
        //   .catch(function(error) {
        //     console.log('response in post', error);
        //   });
        const formData = new FormData();
        for(let i = 0; i < selectedFiles.length; i++){
          formData.append('file[]', selectedFiles[i]);
        }
        // formData.append('file', selectedFiles[0]);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        debugger;
        const data = uploadFilesFetch(selectedFiles);
         if(data){
              this.setState({
                uploadedFileUrl: data.Location
              })
            }
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

  onJeansSubmit(values) {
    console.log('submitted jeans', values);
  }

  onShirtsubmit(values){
    console.log('submitted shirt', values);
  }

  createProductTable = () => {
    const { formattedProducts } = this.state;

    return Object.keys(formattedProducts).length > 0 ? (
      <List products={formattedProducts} headers={headers} />
    ) : null;
  };

  render() {
    const {
      selectedFiles,
      fileCountError,
      selectedCategory,
      productMetaData,
      fileUploadInProcess,
      uploadedFileUrl
    } = this.state;
    return (
      <div>
        <Dropdown selectors={productMetaData} onChange={this.handleChange}>
          Select product category
        </Dropdown>
        {

        }
        { (() => {
          switch (selectedCategory.id) {
          case 'jeans':
            return <JeansForm onSubmit={this.onJeansSubmit} />
        
          default:
            return <ShirtForm onSubmit={this.onShirtsubmit} />
        }
        })()

        }
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
        {uploadedFileUrl}
      </div>
    )
  }
}

export default ProductCategory;
