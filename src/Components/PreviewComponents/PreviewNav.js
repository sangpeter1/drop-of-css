import React from 'react'
// import { html2pdf } from 'html2pdf.js'

const PreviewNav = ({nav,jsxGenerator}) => {
  /*const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
  */
 // <button onClick={() => {downloadPDF("previewNav")}}>Download PDF</button>
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
        <button onClick={() => {downloadPDF("previewNav")}}>Download PDF</button>
    </div>
  )
}

export default PreviewNav