import React from 'react';

const OnReachBottomHandlerContext = React.createContext({
  handlers: new Set(),
});

export { OnReachBottomHandlerContext };
