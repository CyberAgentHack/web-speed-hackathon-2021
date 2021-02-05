import _ from 'lodash';
import React from 'react';

import { ModalTypeContext } from '../../contexts/modal_type_context';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 */

/** @type {React.VFC<Props>} */
const ModalTypeProvider = ({ children }) => {
  const store = React.useState('none');
  return <ModalTypeContext.Provider value={store}>{children}</ModalTypeContext.Provider>;
};

export { ModalTypeProvider };
