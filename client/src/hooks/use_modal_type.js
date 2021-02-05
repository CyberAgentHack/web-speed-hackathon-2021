import React from 'react';

import { ModalTypeContext } from '../contexts/modal_type_context';

/**
 * @returns {[string, (type: string) => void]}
 */
function useModalType() {
  const [modalType, setModalType] = React.useContext(ModalTypeContext);
  return [modalType, setModalType];
}

export { useModalType };
