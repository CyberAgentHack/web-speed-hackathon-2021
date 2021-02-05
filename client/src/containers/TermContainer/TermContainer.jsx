import React from 'react';
import { Helmet } from 'react-helmet';

import { TermPage } from '../../components/term/TermPage';

/** @type {React.VFC} */
const TermContainer = () => {
  return (
    <>
      <Helmet>
        <title>利用規約 - CAwitter</title>
      </Helmet>
      <TermPage />
    </>
  );
};

export { TermContainer };
