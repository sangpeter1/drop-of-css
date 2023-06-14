import React from 'react'

const PreviewSideNav = ({sideNav,jsxGenerator}) => {
  return (
    <div>
        {sideNav ? (
          <div
            id="previewSideNav"
            style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
            dangerouslySetInnerHTML={{
              __html: jsxGenerator(sideNav),
            }}
          />
        ) : (
          <div id="previewSideNav">Side Nav</div>
        )}
    </div>
  )
}

export default PreviewSideNav