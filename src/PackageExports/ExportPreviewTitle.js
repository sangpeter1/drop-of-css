import React from 'react'
import PreviewTitle from '../Components/PreviewComponents/PreviewTitle'
import { PreviewPaneConfig } from '../Components/PreviewPane'


const ExportPreviewTitle = ({ componentConfig }) => {
    const { title,jsxGenerator } = componentConfig;
  return (
    <PreviewTitle title={title} jsxGenerator={jsxGenerator}/>
  )
}

export const ExportPreviewTitleConfig = {
    "title": PreviewPaneConfig.title,
    "jsxGenerator":PreviewPaneConfig.jsxGenerator
}
export default ExportPreviewTitle

