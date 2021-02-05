import React from 'react';

import { ActiveUserContext } from '../contexts/active_user_context';

/**
 * @returns {[*. (user: *) => void]}
 */
function useActiveUser() {
  const [user, setUser] = React.useContext(ActiveUserContext);
  return [user, setUser];
}

export { useActiveUser };
