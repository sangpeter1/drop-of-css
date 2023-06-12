import React from 'react'
import { html2pdf } from 'html2pdf.js'

const PreviewSideNav = ({sideNav,jsxGenerator}) => {
  const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
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
        <button onClick={() => {downloadPDF("previewSideNav")}}>Download PDF</button>
    </div>
  )
}

export default PreviewSideNav