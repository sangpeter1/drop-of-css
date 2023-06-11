import React from 'react'
import PreviewSideNav from '../Components/PreviewComponents/PreviewSideNav'
import { PreviewPaneConfig } from '../Components/PreviewPane'

const ExportPreviewSideNav = ({ componentConfig }) => {
    const {sideNav,jsxGenerator} = componentConfig;
  return (
    <PreviewSideNav sideNav={sideNav} jsxGenerator={jsxGenerator} />
  )
}

export const ExportPreviewSideNavConfig = {
    "sideNav": PreviewPaneConfig.sideNav,
    "jsxGenerator":PreviewPaneConfig.jsxGenerator
}

export default ExportPreviewSideNav