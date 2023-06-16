import React from 'react'
// import { html2pdf } from 'html2pdf.js'

const PreviewTitle = ({ title,jsxGenerator }) => {

  /*const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
  */
 // <button onClick={() => {downloadPDF("previewTitle")}}>Download PDF</button>

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
          <header id="previewTitle" dangerouslySetInnerHTML={{__html:''}}>Your Website Title</header>
          )}
    </div>
  )
}

export default PreviewTitle;