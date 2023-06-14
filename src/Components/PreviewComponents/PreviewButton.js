import React from 'react'
// import { html2pdf } from 'html2pdf.js'


const PreviewButton = ({button,jsxGenerator}) => {
  /*const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
  */
 // <button onClick={() => {downloadPDF("previewButton")}}>Download PDF</button>
  return (
    <div>
      <div id="previewButton">
        <div dangerouslySetInnerHTML={{__html: jsxGenerator(button),}}/>
      </div>
  
    </div>
  )
}

export default PreviewButton