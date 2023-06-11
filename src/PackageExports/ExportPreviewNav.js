import React from 'react'
import PreviewNav from '../Components/PreviewComponents/PreviewNav'
import { PreviewPaneConfig } from '../Components/PreviewPane'

const ExportPreviewNav = ({ componentConfig }) => {
  const { nav,jsxGenerator } = componentConfig;
  return (
    <PreviewNav nav={nav} jsxGenerator={jsxGenerator}/>
  )
}
export const ExportPreviewNavConfig = {
  "nav": PreviewPaneConfig.nav,
  "jsxGenerator":PreviewPaneConfig.jsxGenerator
}

export default ExportPreviewNav