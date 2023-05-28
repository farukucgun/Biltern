import React from "react";
import classes from "./GradingFormPage.module.css";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { Document, Page } from 'react-pdf';
import pdf from "./CS319_AnalysisReport_Iter1_Caffe (2).pdf";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function GradingFormPage(){
    const [numPages, setNumPages] = React.useState(null);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const [sizes, setSizes] = React.useState([
        630,
        'auto'
    ]);
    
    const [scale, setScale] = React.useState(1)
    function onSlide(event){
        console.log(sizes[0])
        setScale((event.pageX-220)/630)
    }




    return (
        <div className={classes.grading_form_page_container}>
            <SplitPane
                split='vertical'
                sizes={sizes}
                onChange={setSizes}
                onDragEnd={(ev)=>onSlide(ev)}
            >

            
                <div className={classes.student_report}>
                    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page 
                                className={classes.page} 
                                key={`page_${index + 1}`} 
                                pageNumber={index + 1} 
                                scale={scale} 
                            />
                        ))}
                    </Document>
                </div>
                <div>
                        <div className={classes.part_a}>
                            <h5>
                                Part-A: Work Place
                            </h5>
                            <p>
                                Average of the grades on the Summer Training Evaluation Form
                            </p>
                            <form>
                                <label>
                                    (Staj değerlendirme formu) filled by employer:
                                    <input type="number"  style={{width: "40px"}}/>
                                </label>
                                <label><br/>
                                    Is the work done related to computer engineering? [Y/N]:
                                    <select>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </select>
                                </label>
                                <label><br/>
                                    Is the supervisor a computer engineer or has a similar engineering backgroud? [Y/N]:
                                    <select>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </select>
                                </label>
                            </form>
                            
                        </div>
                        <div className={classes.part_a}>
                            <h5>
                                Part-B: Report
                            </h5>
                            <form>
                                <label>
                                    Satisfactory
                                    <input type="checkbox"/>
                                </label>
                                <label>
                                    Revision required
                                    <input type="checkbox"/>
                                </label>
                            </form>
                            <p>
                                If revision is required, changes needed must be stated on the report. The report is returned to the student until satisfactory.
                            </p>
                        </div>
                        <div className={classes.part_a}>
                            <h5>
                                Part-C: Final Version of the Report
                            </h5>
                            <h5>
                                Based on the final version of the report, as evaluated on the back side of this form:
                            </h5>
                            <form>
                                <label>
                                    Assessment/quality score of Evaluation of the Work - item(1):
                                    <input />
                                </label>
                                <label><br/>
                                    Sum of the Assessment/quality scores of Evaluation of Work - items (2)-(7):
                                    <input/>
                                </label>
                                <label><br/>
                                    The Assessment/quality score of Evaluation of Report:
                                    <input/>
                                </label>
                            </form>
                        </div>
                    </div>
            </SplitPane>          

        </div>
    )
}