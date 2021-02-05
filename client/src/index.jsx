import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './containers/AppContainer';
import { ActiveUserProvider } from './providers/ActiveUserProvider';
import { ModalTypeProvider } from './providers/ModalTypeProvider';
import { OnReachBottomProvider } from './providers/OnReachBottomProvider';

window.addEventListener('load', () => {
  ReactDOM.render(
    <ActiveUserProvider>
      <ModalTypeProvider>
        <OnReachBottomProvider>
          <AppContainer />
        </OnReachBottomProvider>
      </ModalTypeProvider>
    </ActiveUserProvider>,
    document.querySelector('#app'),
  );
});
