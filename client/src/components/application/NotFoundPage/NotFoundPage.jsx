import React from 'react';

/** @type {React.VFC} */
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-3xl">Not Found</p>
    </div>
  );
};

export { NotFoundPage };
