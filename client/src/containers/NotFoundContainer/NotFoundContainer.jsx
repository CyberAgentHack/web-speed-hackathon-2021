import React from 'react';
// import { Helmet } from 'react-helmet';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  React.useEffect(() => {
    document.title = `ページが見つかりません- CAwitter`;
  }, []);

  return (
    <>
      {/*
      <Helmet>
        <title>ページが見つかりません- CAwitter</title>
      </Helmet>
      */}
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
