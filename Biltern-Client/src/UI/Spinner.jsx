import React, { Fragment } from 'react';
import spinner from './spinner.gif';

/**
 * @author Faruk Uçgun
 * @date 09.05.2023
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