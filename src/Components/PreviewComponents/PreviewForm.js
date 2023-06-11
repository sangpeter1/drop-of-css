import React from 'react'

const PreviewForm = ({ form, jsxGenerator}) => {
  return (
    <div>
        <div
              id="previewForm"
              style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(form),
              }}
            />
    </div>
  )
}

export default PreviewForm