import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './commonLogic/store'
import rootSaga from './commonLogic/rootSaga'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from './commonLogic/history'
import { I18nextProvider } from 'react-i18next'
import RequiredAuth from 'components/auth/verification'
import i18n from 'config/i18n'
import App from 'components/common/app/index'
import Signup from 'components/auth/signup'
import Login from 'components/auth/login'
import ResetPassword from 'components/auth/reset'
import NewPassword from 'components/auth/setNewPassword'
import PageEditorContainer from 'components/pageEditorContainer'
import BlogPostEditor from 'components/blog/blogPostEditor'
import IconColourPicker from 'components/iconColorPicker'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/forgot' component={ResetPassword} />
          <Route path='/reset/:token' component={NewPassword} />
          <Route path='/spaces/:space_id/pages/:page_id/edit' exact component={PageEditorContainer} />
          <Route path='/spaces/:space_id/blog/:page_id/edit' exact component={BlogPostEditor} />
          <Route path='/testIconPicker' component={IconColourPicker} />
          <Route path='/' component={RequiredAuth(App)} />
        </Switch>
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
