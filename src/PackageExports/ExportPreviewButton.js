import React from 'react'
import PreviewButton from '../Components/PreviewComponents/PreviewButton'
import { PreviewPaneConfig } from '../Components/PreviewPane'

const ExportPreviewButton = ({ componentConfig }) => {
    const { button,jsxGenerator } = componentConfig;
  return (
    <div>
        {button ? (
        <PreviewButton button={button} jsxGenerator={jsxGenerator}/>) : (<div id="previewButton">Button</div>)}
    </div>
  )
}

export const ExportPreviewButtonConfig = {
  "button": PreviewPaneConfig.button,
  "jsxGenerator":PreviewPaneConfig.jsxGenerator
}

export default ExportPreviewButton