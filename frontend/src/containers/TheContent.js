import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const hasLogged = (localStorage.getItem('token') && localStorage.getItem('role') && localStorage.getItem('userID'));
if(!hasLogged) {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('role');
}
const home = hasLogged ? ((localStorage.getItem('role') === '1') ? '/admin/users' : '/files') : '/login';

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/admin" to={home} />
            <Redirect from="/" to={home} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
