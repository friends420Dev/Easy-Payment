import React, { Suspense, useEffect, useReducer, useState, useContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react-pro'
import Authmiddleware from './components/Authmiddleware'

import './scss/style.scss'
import './assets/max.css'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

import type { State } from './store'
import Apibank from './api/Apibank'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Announcement = React.lazy(() => import('./views/pages/announcement/announcement'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Verify = React.lazy(() => import('./views/pages/verify/Verify'))
const Change_password = React.lazy(() => import('./views/pages/change_password/change_password'))

interface ColorModeResult {
  isColorModeSet: any;
  setColorMode: (mode: string) => void;
}
// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))
// import { AddLoadding } from './components';
const App = () => {
  const { isColorModeSet, setColorMode }: ColorModeResult = useColorModes(
    'coreui-pro-react-admin-template-theme-modern',
  );
  const storedTheme = useSelector((state: State) => state?.theme)
  const urlParams1 = new URLSearchParams(window.location.href.split('?')[1])
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    let theme = urlParams.get('theme')
    if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
      theme = theme.match(/^[A-Za-z0-9\s]+/)![0]
    }
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense

        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="info" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* <Route path={`/getlogin`} element={<Change_password />} /> */}
          <Route path="/login" element={<Login old_username={urlParams1.get('username')} old_password={urlParams1.get('password')}  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/apps/email/*" element={<EmailApp />} />
          <Route
            path="*"
            element={
              <Authmiddleware>
                <DefaultLayout />
              </Authmiddleware>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
export default App
