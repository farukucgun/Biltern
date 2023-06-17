import React, { Fragment } from 'react';
import spinner from './spinner.gif';

/**
 * @author Faruk Uçgun
 * @date 09.05.2023
 * @abstract: This component is responsible for displaying a spinner for loading state
 */

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;