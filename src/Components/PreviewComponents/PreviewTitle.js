import React from 'react'

const PreviewTitle = ({ title,jsxGenerator }) => {
  return (
    <div>
        {title ? (
          <div id="previewTitle" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(title),
              }}
            />
          </div>
        ) : (
          <header id="previewTitle">Your Website Title</header>
        )}
    </div>
  )
}

export default PreviewTitle