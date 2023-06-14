import React from 'react'

const PreviewButton = ({button,jsxGenerator}) => {
  return (
    <div>
      <div id="previewButton">
        <div dangerouslySetInnerHTML={{__html: jsxGenerator(button),}}/>
      </div>
    </div>
  )
}

export default PreviewButton