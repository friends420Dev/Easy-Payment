import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'

import AppBreadcrumb from './AppBreadcrumb'
import Authmiddleware from './Authmiddleware'
// routes config
import routes from '../routes'
import { Alert, Flex } from 'antd';
import Marquee from 'react-fast-marquee';
import { StarOutlined, StarFilled, StarTwoTone, MutedOutlined } from '@ant-design/icons';
const AppContent = () => {
  return (
    <>
    
      <CContainer fluid>
        
        <AppBreadcrumb />
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && <Route key={idx} path={route.path} element={<Authmiddleware><route.element /></Authmiddleware>} />
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}

export default AppContent
