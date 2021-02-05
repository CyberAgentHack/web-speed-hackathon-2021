import React from 'react';

import { Modal } from '../../components/modal/Modal';
import { useModalType } from '../../hooks/use_modal_type';
import { AuthContainer } from '../AuthContainer';
import { NewPostContainer } from '../NewPostContainer';

/** @type {React.VFC} */
const ModalContainer = () => {
  const [modalType, setModalType] = useModalType();
  const onCloseModal = React.useCallback(() => {
    setModalType('none');
  }, []);

  return modalType !== 'none' ? (
    <Modal onClose={onCloseModal}>
      {modalType === 'auth' ? <AuthContainer /> : null}
      {modalType === 'post' ? <NewPostContainer /> : null}
    </Modal>
  ) : null;
};

export { ModalContainer };
