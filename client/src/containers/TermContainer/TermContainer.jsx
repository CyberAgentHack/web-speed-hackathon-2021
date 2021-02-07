import React from 'react';
import { TermPage } from '../../components/term/TermPage';

/** @type {React.VFC} */
const TermContainer = () => {
  document.title = "利用規約- CAwitter";
  return (
    <>
      <TermPage />
    </>
  );
};

export { TermContainer };
