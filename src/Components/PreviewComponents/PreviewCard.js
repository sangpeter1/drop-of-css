import React from 'react'
// import { html2pdf } from 'html2pdf.js'

const PreviewCard = ({card,jsxGenerator}) => {
  /*const downloadPDF = (id) => {
    const element = document.getElementById(id); 
    html2pdf().from(element).save('component.pdf'); 
  };
  */
 // <button onClick={() => {downloadPDF("previewCard")}}>Download PDF</button>

  return (
    <div>
      <div id="previewCard" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
      dangerouslySetInnerHTML={{__html: jsxGenerator(card),}}/>
    </div>
  )
}

export default PreviewCard