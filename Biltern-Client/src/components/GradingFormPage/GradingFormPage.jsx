import React from "react";
import classes from "./GradingFormPage.module.css";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { Document, Page } from 'react-pdf';
import pdf from "./CS319_AnalysisReport_Iter1_Caffe (2).pdf";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { submitGradingForm } from "../../apiHelper/backendHelper";
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../features/alertSlice';


pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function GradingFormPage(){

    const dispatch = useDispatch();

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


    const [stajDegerlendirmeFormu, setStajDegerlendirmeFormu] = React.useState(0);
    const [relatedToCS, setRelatedToCS] = React.useState("N");
    const [supervisorSimilarBackground, setSupervisorSimilarBackground] = React.useState("N");
    const [partBSatisfactory, setPartBSatisfactory] = React.useState("");
    const [revisionDate, setRevisionDate] = React.useState("")
    const [tableEvidence1, setTableEvidence1] = React.useState("");
    const [tableEvidence2, setTableEvidence2] = React.useState("");
    const [tableEvidence3, setTableEvidence3] = React.useState("");
    const [tableEvidence4, setTableEvidence4] = React.useState("");
    const [tableEvidence5, setTableEvidence5] = React.useState("");
    const [tableEvidence6, setTableEvidence6] = React.useState("");
    const [tableEvidence7, setTableEvidence7] = React.useState("");
    const [tableEvidence8, setTableEvidence8] = React.useState("");
    const [tableAssesment1, setTableAssesment1] = React.useState(0);
    const [tableAssesment2, setTableAssesment2] = React.useState(0);
    const [tableAssesment3, setTableAssesment3] = React.useState(0);
    const [tableAssesment4, setTableAssesment4] = React.useState(0);
    const [tableAssesment5, setTableAssesment5] = React.useState(0);
    const [tableAssesment6, setTableAssesment6] = React.useState(0);
    const [tableAssesment7, setTableAssesment7] = React.useState(0);
    const [tableAssesment8, setTableAssesment8] = React.useState(0);
    const [reportSatisfactory, setReportSatisfactory] = React.useState("");
    const [recommendPlace, setRecommendPlace] = React.useState("");
    const [signature, setSignature] = React.useState("");

    const sumOfItems2_7 = tableAssesment2 + tableAssesment3 + tableAssesment4 + tableAssesment5+ tableAssesment6 +tableAssesment7;

    function handleSubmit(){
        let formData = new FormData();
        formData.append('input1', stajDegerlendirmeFormu);
        formData.append('input2', relatedToCS);
        formData.append('input3', supervisorSimilarBackground);
        formData.append('input4', partBSatisfactory === "satisfactory"? "choice1": "choice2");
        formData.append('input5', revisionDate);
        formData.append('input6', tableAssesment1);
        formData.append('input7', sumOfItems2_7);
        formData.append('input8', tableAssesment8);
        formData.append('input9', reportSatisfactory === "satisfactory"? "choice1": "choice2");
        formData.append('input10', recommendPlace);
        formData.append('input11', tableEvidence1);
        formData.append('input12', tableAssesment1);
        formData.append('input13', tableEvidence2);
        formData.append('input14', tableAssesment2);
        formData.append('input15', tableEvidence3);
        formData.append('input16', tableAssesment3);
        formData.append('input17', tableEvidence4);
        formData.append('input18', tableAssesment4);
        formData.append('input19', tableEvidence5);
        formData.append('input20', tableAssesment5);
        formData.append('input21', tableEvidence6);
        formData.append('input22', tableAssesment6);
        formData.append('input23', tableEvidence7);
        formData.append('input24', tableAssesment7);
        formData.append('input25', tableEvidence8);
        formData.append('input26', tableAssesment8);
        formData.append('formName', "company");

        submitGradingForm(3, formData, "multipart/form-data")
            .then(res => {
                console.log(res.data)
                dispatch(setTimedAlert("Grading form submitted successfully", "success"));
            })
            .catch(err => {
                console.log(err)

                dispatch(setTimedAlert("Grading form submission failed", "error"));
            });
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
                            <h3>
                                Part-A: Work Place
                            </h3>
                            <p>
                                Average of the grades on the Summer Training Evaluation Form
                            </p>
                            <form>
                                <label>
                                    (Staj değerlendirme formu) filled by employer:
                                    <input 
                                        type="number"  
                                        onChange={(ev)=>setStajDegerlendirmeFormu(ev.target.valueAsNumber)}
                                    />
                                </label>
                                <p className={classes.explaining_information}>
                                    To be satisfactory, average of the grades on the "Staj değerlendirme
                                    Formu" must be at least 7.
                                </p>
                                <label><br/>
                                    Is the work done related to computer engineering? [Y/N]:
                                    <select
                                        onChange={(choice)=>setRelatedToCS(choice.target.value)}    
                                    >
                                        <option value="N">N</option>
                                        <option value="Y">Y</option>
                                    </select>
                                </label>
                                <label><br/>
                                    Is the supervisor a computer engineer or has a similar engineering backgroud? [Y/N]:
                                    <select
                                        onChange={(choice)=>setSupervisorSimilarBackground(choice.target.value)} 
                                    >
                                        <option value="N">N</option>
                                        <option value="Y">Y</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <p className={classes.explaining_information}>
                            ...... If all conditions in Part-A are satisfied, continue to Part-B,
                            else mark Unsatisfactory in Overall Evaluation ......
                        </p>


                        <div className={classes.part_a}>
                            <h3>
                                Part-B: Report
                            </h3>
                            <form>
                                <label>
                                    Satisfactory
                                    <input 
                                        type="radio"
                                        value="satisfactory"
                                        checked={partBSatisfactory === "satisfactory"}
                                        onChange={(event)=>setPartBSatisfactory(event.target.value)}
                                    />
                                </label>
                                <label>
                                    Revision required
                                    <input 
                                        type="radio"
                                        value="revisionRequired"
                                        checked={partBSatisfactory === "revisionRequired"}
                                        onChange={(event)=>setPartBSatisfactory(event.target.value)}
                                    />
                                </label>
                                <p>
                                    If revision is required, changes needed must be stated on the report. The report is returned to the student until satisfactory.
                                </p>
                                <label>
                                    Due date for resubmission: 
                                    <input 
                                        type="date" 
                                        style={{width: 100}}
                                        onChange={(event)=>setRevisionDate(event.target.value)}
                                    />
                                </label>
                                <p className={classes.explaining_information}>
                                    Student is given two weeks for each revision.
                                </p>
                            </form>
                        </div>
                        <p className={classes.explaining_information}>
                            ...... If the report in Part-B is Satisfactory, continue to Part-C,
                            else return it to the student for Revision ......
                        </p>

                        <div className={classes.part_a}>
                            <table>
                                <tr>
                                    <th> Evaluation of the Work </th>
                                    <th> On what page(s) of the report is the evidence of this found? </th>
                                    <th> Assesment/quality score (from 0=missing to 10=full) </th>
                                </tr>
                                <tr>
                                    <th>
                                        (1) Able to perform work at the level expected from a summer training in the
                                        area of computer engineering. (this is the evaluation of all the work done
                                        in the summer training)
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence1(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment1(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (2) Solves complex engineering problems by applying principles of engineering,
                                        science, and mathematics.                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence2(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment2(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (3) Recognizes ethical and professional responsibilities in engineering situations.                                             
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence3(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment3(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (4) Able to make informed judgements that consider the impact of engineering
                                        solutions in global, economic, environmental, and social contexts.                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence4(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment4(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (5) Able to acquire new knowledge using appropriate learning strategy
                                        or strategies.                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence5(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment5(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (6) Able to apply new knowledge as needed.                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence6(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment6(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        (7) Has awareness about diversity, equity, and inclusion.                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text" 
                                            onChange={(event)=>setTableEvidence7(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment7(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className={classes.part_a}>
                            <table>
                                <tr>
                                    <th> Evaluation of Report </th>
                                    <th> On what page(s) of the report is the counter evidence of this found? </th>
                                    <th> Assesment/quality score (from 0=missing to 10=full) </th>
                                </tr>
                                <tr>
                                    <th>
                                        Able to prepare reports with high standards in terms of content, 
                                        organization, style and language (the Summer Training report
                                        itself to be evaluated).                                            
                                    </th>
                                    <td>
                                        <input 
                                            type="text"
                                            onChange={(event)=>setTableEvidence8(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            onChange={(event)=>setTableAssesment8(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>


                        <div className={classes.part_a}>
                            <h3>
                                Part-C: Final Version of the Report
                            </h3>
                            <h5>
                                Based on the final version of the report, as evaluated on the back side of this form:
                            </h5>
                            <form>
                                <label>
                                    Assessment/quality score of Evaluation of the Work - item(1):
                                    <input 
                                        type="number"
                                        value={tableAssesment1}
                                    />
                                </label>
                                <p className={classes.explaining_information}>
                                    To be satisfactory, the score must be at least 7/10.
                                </p>
                                <label><br/>
                                    Sum of the Assessment/quality scores of Evaluation of Work - items (2)-(7):
                                    <input
                                        type="number"
                                        value={sumOfItems2_7}    
                                    />
                                </label>
                                <p className={classes.explaining_information}>
                                    To be satisfactory, the score must be at least 30/60.
                                </p>
                                <label><br/>
                                    The Assessment/quality score of Evaluation of Report:
                                    <input
                                        type="number"
                                        value={tableAssesment8}
                                    />
                                </label>
                                <p className={classes.explaining_information}>
                                    To be satisfactory, the score must be at least 7/10.
                                </p>
                            </form>
                        </div>
                        <div className={classes.part_a}>
                            <h3> Overall Evaluation</h3>
                            <label>
                                Satisfactory
                                <input 
                                    type="radio"
                                    value="satisfactory"
                                    checked={reportSatisfactory === "satisfactory"}
                                    onChange={(event)=>setReportSatisfactory(event.target.value)}
                                />
                            </label>
                            <label>
                                Unsatisfactory
                                <input 
                                    type="radio"
                                    value="unsatisfactory"
                                    checked={reportSatisfactory === "unsatisfactory"}
                                    onChange={(event)=>setReportSatisfactory(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className={classes.part_a}>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice1"
                                    checked={reportSatisfactory === "choice1"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                I strongly recommend this place for future students
                            </label>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice2"
                                    checked={reportSatisfactory === "choice2"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                I am satisfied with this place 
                            </label>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice3"
                                    checked={reportSatisfactory === "choice3"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                Unsatisfactory
                            </label>
                        </div>
                        <button 
                            className={classes.submit_button}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button

                        >
                            Download Grading Form
                        </button>
                    </div>
            </SplitPane>          

        </div>
    )
}