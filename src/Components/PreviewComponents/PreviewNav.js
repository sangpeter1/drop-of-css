import React from 'react'

const PreviewNav = ({nav,jsxGenerator}) => {
  console.log(nav);
  return (
    <div>
        {nav ? (
          <div id="previewNav">
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            />
            {/* <Navbar /> */}
          </div>
        ) : (
          <nav id="previewNav">Preview Nav</nav>
        )}
    </div>
  )
}

export default PreviewNav