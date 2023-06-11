import React from 'react'
import PreviewCard from '../Components/PreviewComponents/PreviewCard'
import { PreviewPaneConfig } from '../Components/PreviewPane'

const ExportPreviewCard = ({ componentConfig }) => {
  const { card,jsxGenerator } = componentConfig;
  return (
    <div>
        {card ? (
              <PreviewCard card={card} jsxGenerator={jsxGenerator}/>
            ) : (
              <div id="previewCard">Card</div>
              )
        }
    </div>
  )
}

export const ExportPreviewCardConfig = {
    "card": PreviewPaneConfig.card,
    "jsxGenerator":PreviewPaneConfig.jsxGenerator
}

export default ExportPreviewCard


