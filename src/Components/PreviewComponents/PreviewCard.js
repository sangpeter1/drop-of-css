import React from 'react'

const PreviewCard = ({card,jsxGenerator}) => {
  console.log(card);
  return (
    <div>
      <div id="previewCard" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
      dangerouslySetInnerHTML={{__html: jsxGenerator(card),}}/>
    </div>
  )
}

export default PreviewCard