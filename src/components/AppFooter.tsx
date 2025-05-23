import React from 'react'
import { CFooter } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import config from 'src/config/app.config'
const AppFooter = () => {
    const { t } = useTranslation()
  
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1" style={{textTransform:"capitalize"}}> version : {config?.version}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1" style={{textTransform:"capitalize"}}>Powered by {config?.web_name.toLocaleLowerCase()} support team.</span>
       
      </div>
    </CFooter>
  )
}

export default AppFooter
