import React from 'react';
import _ from 'lodash';
// import PropTypes from 'prop-types';
// import NoRecordsFound from 'components/no-records-found';

const List = ({ products, headers }) => (
  <table className="table table-striped">
    <thead>
      <tr>{headers.map(header => <td key={`${header.label}`}>{header.label}</td>)}</tr>
    </thead>
    {
      _.isEmpty(products) ?
        null :
        <tbody>
          {
            /* eslint react/no-array-index-key: 0 */
            Object.keys(products).map((product, i) => (
              <tr key={`g_${i}`}>
              <td>
                {products[product].product}
              </td>
              <td>
                {products[product].id}
              </td>
                {products[product].imageTypes && products[product].imageTypes.length > 0 && (
                    products[product].imageTypes.map(fileType => (
                        <td key={fileType}>{fileType}</td>
                    ))
                )

                }
              </tr>
            ))
          }
        </tbody>
    }
  </table>
);

// List.propTypes = {
//   headers: PropTypes.array,
//   data: PropTypes.oneOfType([PropTypes.object,
//     PropTypes.array])
// };

export default List;
