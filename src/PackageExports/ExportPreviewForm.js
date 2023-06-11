import React from 'react'
import PreviewForm from '../Components/PreviewComponents/PreviewForm'
import { PreviewPaneConfig } from '../Components/PreviewPane'

const ExportPreviewForm = ({ componentConfig }) => {
    const { form,jsxGenerator } = { componentConfig };
  return (
    <div>
        {form ? (
            <PreviewForm form={form} jsxGenerator={jsxGenerator}/>
          ) : (
            <div id="previewForm">form</div>
          )}
    </div>
  )
}

export const ExportPreviewFormConfig = {
    "form": PreviewPaneConfig.form,
    "jsxGenerator":PreviewPaneConfig.jsxGenerator
  }

export default ExportPreviewForm