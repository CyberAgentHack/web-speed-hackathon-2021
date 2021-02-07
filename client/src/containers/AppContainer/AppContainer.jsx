import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useActiveUser } from '../../hooks/use_active_user';
import { useModalType } from '../../hooks/use_modal_type';
import { ModalContainer } from '../ModalContainer';
import { NotFoundContainer } from '../NotFoundContainer';
import { PostContainer } from '../PostContainer';
import { TermContainer } from '../TermContainer';
import { TimelineContainer } from '../TimelineContainer';
import { UserProfileContainer } from '../UserProfileContainer';

/** @type {React.VFC} */
const AppContainer = () => {
  const [_modalType, setModalType] = useModalType();
  const [_activeUser, setActiveUser] = useActiveUser();

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      //const user = await fetchActiveUser();
      //setActiveUser(user);
    })().finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    document.title = "読込中- CAwitter";
    return (<></>)
  }

  return (
    <BrowserRouter>
      <AppPage onOpenModal={setModalType}>
        <Switch>
          <Route exact path="/">
            <TimelineContainer />
          </Route>
          <Route exact path="/users/:userId">
            <UserProfileContainer />
          </Route>
          <Route exact path="/posts/:postId">
            <PostContainer />
          </Route>
          <Route exact path="/terms">
            <TermContainer />
          </Route>
          <Route path="*">
            <NotFoundContainer />
          </Route>
        </Switch>
      </AppPage>

      <ModalContainer />
    </BrowserRouter>
  );
};

export { AppContainer };
