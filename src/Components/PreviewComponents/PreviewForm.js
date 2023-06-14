import React from 'react'
// import { html2pdf } from 'html2pdf.js'

const PreviewForm = ({ form, jsxGenerator}) => {
  /*const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
  */
 // <button onClick={() => {downloadPDF("previewForm")}}>Download PDF</button>
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