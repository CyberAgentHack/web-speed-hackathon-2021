import React from 'react';

import { OnReachBottomHandlerContext } from '../contexts/on_reach_bottom_handler_context';

/**
 * @param {() => void} handler
 * @param {Array<*>} deps
 */
function useRegisterOnReachBottom(handler, deps) {
  const { handlers } = React.useContext(OnReachBottomHandlerContext);

  const memoizedHandler = React.useCallback(handler, deps);

  React.useEffect(() => {
    handlers.add(memoizedHandler);
    return () => handlers.delete(memoizedHandler);
  }, [memoizedHandler]);
}

export { useRegisterOnReachBottom };
