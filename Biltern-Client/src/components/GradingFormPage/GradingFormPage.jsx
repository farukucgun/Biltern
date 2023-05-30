import React from "react";
import classes from "./GradingFormPage.module.css";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { Document, Page } from 'react-pdf';
import pdf from "./CS319_AnalysisReport_Iter1_Caffe (2).pdf";
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { submitGradingForm, getGrading, getGradingForm } from "../../apiHelper/backendHelper";
import FileUpload from '../../UI/FileUpload';
import { uploadSignature, displaySignature } from "../../apiHelper/backendHelper";


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


    const [stajDegerlendirmeFormu, setStajDegerlendirmeFormu] = React.useState(undefined);
    const [relatedToCS, setRelatedToCS] = React.useState(undefined);
    const [supervisorSimilarBackground, setSupervisorSimilarBackground] = React.useState(undefined);
    const [partBSatisfactory, setPartBSatisfactory] = React.useState(undefined);
    const [revisionDate, setRevisionDate] = React.useState(undefined)
    const [tableEvidence1, setTableEvidence1] = React.useState(undefined);
    const [tableEvidence2, setTableEvidence2] = React.useState(undefined);
    const [tableEvidence3, setTableEvidence3] = React.useState(undefined);
    const [tableEvidence4, setTableEvidence4] = React.useState(undefined);
    const [tableEvidence5, setTableEvidence5] = React.useState(undefined);
    const [tableEvidence6, setTableEvidence6] = React.useState(undefined);
    const [tableEvidence7, setTableEvidence7] = React.useState(undefined);
    const [tableEvidence8, setTableEvidence8] = React.useState(undefined);
    const [tableAssesment1, setTableAssesment1] = React.useState(undefined);
    const [tableAssesment2, setTableAssesment2] = React.useState(undefined);
    const [tableAssesment3, setTableAssesment3] = React.useState(undefined);
    const [tableAssesment4, setTableAssesment4] = React.useState(undefined);
    const [tableAssesment5, setTableAssesment5] = React.useState(undefined);
    const [tableAssesment6, setTableAssesment6] = React.useState(undefined);
    const [tableAssesment7, setTableAssesment7] = React.useState(undefined);
    const [tableAssesment8, setTableAssesment8] = React.useState(undefined);
    const [reportSatisfactory, setReportSatisfactory] = React.useState(undefined);
    const [recommendPlace, setRecommendPlace] = React.useState(undefined);
    const [signature, setSignature] = React.useState(undefined);

    const sumOfItems2_7 = tableAssesment2 + tableAssesment3 + tableAssesment4 + tableAssesment5+ tableAssesment6 +tableAssesment7;

    function handleSubmitPartA(){
        let formData = {
            input1: stajDegerlendirmeFormu,
            input2: relatedToCS,
            input3: supervisorSimilarBackground,
            input9: reportSatisfactory === "satisfactory"? "choice1": "choice2",
            input10: recommendPlace,
            formName: "company"
        }
        submitGradingForm(6, formData)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    }
    function handleSubmit(){
        let formData = {
        input1: stajDegerlendirmeFormu,
        input2: relatedToCS,
        input3: supervisorSimilarBackground,
        input4: partBSatisfactory === "satisfactory"? "choice1": "choice2",
        input5: revisionDate,
        input6: tableAssesment1,
        input7: sumOfItems2_7,
        input8: tableAssesment8,
        input9: reportSatisfactory === "satisfactory"? "choice1": "choice2",
        input10: recommendPlace,
        input11: tableEvidence1,
        input12: tableAssesment1,
        input13: tableEvidence2,
        input14: tableAssesment2,
        input15: tableEvidence3,
        input16: tableAssesment3,
        input17: tableEvidence4,
        input18: tableAssesment4,
        input19: tableEvidence5,
        input20: tableAssesment5,
        input21: tableEvidence6,
        input22: tableAssesment6,
        input23: tableEvidence7,
        input24: tableAssesment7,
        input25: tableEvidence8,
        input26: tableAssesment8,
        formName: (tableEvidence1 === undefined? "iteration": "final") 
        }

         submitGradingForm(6, formData)
             .then(res => {
                 console.log(res.data)
             })
             .catch(err => {
                 console.log(err)
             });
    }
    React.useEffect(() =>{
        getGrading(6)
        .then(res => {
            console.log(res.data);
            setReportSatisfactory(res.data.input9 === "choice1"? "satisfactory": "unsatisfactory" );
            setRecommendPlace(res.data.input10);
            if(res.data.input1 !== undefined ){
                setStajDegerlendirmeFormu(parseInt(res.data.input1));
                setRelatedToCS(res.data.input2);
                setSupervisorSimilarBackground(res.data.input3);
            }
            if( res.data.input4 !== undefined){
                setPartBSatisfactory(res.data.input4 === "choice1"? "satisfactory": "revisionRequired");
                setRevisionDate(res.data.input5);
                if( res.data.input6 !== undefined){
                    setTableEvidence1(res.data.input11);
                    setTableAssesment1(parseInt(res.data.input12));
                    setTableEvidence2(res.data.input13);
                    setTableAssesment2(parseInt(res.data.input14));
                    setTableEvidence3(res.data.input15);
                    setTableAssesment3(parseInt(res.data.input16));
                    setTableEvidence4(res.data.input17);
                    setTableAssesment4(parseInt(res.data.input18));
                    setTableEvidence5(res.data.input19);
                    setTableAssesment5(parseInt(res.data.input20));
                    setTableEvidence6(res.data.input21);
                    setTableAssesment6(parseInt(res.data.input22));
                    setTableEvidence7(res.data.input23);
                    setTableAssesment7(parseInt(res.data.input24));
                    setTableEvidence8(res.data.input25);
                    setTableAssesment8(parseInt(res.data.input26));
                }
            }


        })
        .catch(err => {
            console.log(err)
        });
    },[])


    const uploadSignatureHandler = (files) => {
        console.log(files[0]);
        const formData = new FormData();
        formData.append('file', files[0]);
        uploadSignature( formData, "multipart/form-data")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                // console.log(err)
            });
    }

    React.useEffect(()=>{
        displaySignature( 'arraybuffer')
        .then(res => {
            console.log(res.data)
            var blob = new Blob( [ res.data ], { type: "image/jpeg" } );
            setSignature(window.URL.createObjectURL(blob))
        })
        .catch(err => {
            console.log(err)
    });
    },[])


    const downloadReport = (blob) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'file.pdf');
        } 
        else {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'file.pdf';
            link.click();
        
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 0);
        }
    }
    function downloadGradingFormHandler(){
        getGradingForm(6, 'arraybuffer', true)
        .then(res => {
            const blob = new Blob([res.data], {type: 'application/pdf'});
            downloadReport(blob);
        })
        .catch(err => {
            console.log(err);
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

                <div>
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
                </div>

                <div className={classes.grading}>
                        <div className={classes.grading_parts}>
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
                                        defaultValue={stajDegerlendirmeFormu}
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
                                        <option>Select</option>
                                        <option value="N" selected={relatedToCS === "N"}>N</option>
                                        <option value="Y" selected={relatedToCS === "Y"}>Y</option>
                                    </select>
                                </label>
                                <label><br/>
                                    Is the supervisor a computer engineer or has a similar engineering backgroud? [Y/N]:
                                    <select
                                        onChange={(choice)=>setSupervisorSimilarBackground(choice.target.value)} 
                                    >
                                        <option>Select</option>
                                        <option value="N" selected={supervisorSimilarBackground === "N"}>N</option>
                                        <option value="Y" selected={supervisorSimilarBackground === "Y"}>Y</option>
                                    </select>
                                </label>
                            </form><br/>
                            <button
                                onClick={handleSubmitPartA}
                            >
                                Submit Part-A
                            </button>
                        </div>
                        <p className={classes.explaining_information}>
                            ...... If all conditions in Part-A are satisfied, continue to Part-B,
                            else mark Unsatisfactory in Overall Evaluation ......
                        </p>


                        <div className={classes.grading_parts}>
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
                                        defaultValue={revisionDate}
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
                        {
                            revisionDate !== undefined &&
                            <div>
                                <div className={classes.grading_parts}>
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
                                            defaultValue={tableEvidence1}
                                            onChange={(event)=>setTableEvidence1(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment1}
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
                                            defaultValue={tableEvidence2}
                                            onChange={(event)=>setTableEvidence2(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment2}
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
                                            defaultValue={tableEvidence3}
                                            onChange={(event)=>setTableEvidence3(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment3}
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
                                            defaultValue={tableEvidence4}
                                            onChange={(event)=>setTableEvidence4(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment4}
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
                                            defaultValue={tableEvidence5}
                                            onChange={(event)=>setTableEvidence5(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment5}
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
                                            defaultValue={tableEvidence6}
                                            onChange={(event)=>setTableEvidence6(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment6}
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
                                            defaultValue={tableEvidence7}
                                            onChange={(event)=>setTableEvidence7(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment7}
                                            onChange={(event)=>setTableAssesment7(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className={classes.grading_parts}>
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
                                            defaultValue={tableEvidence8}
                                            onChange={(event)=>setTableEvidence8(event.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            defaultValue={tableAssesment8}
                                            onChange={(event)=>setTableAssesment8(event.target.valueAsNumber)}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>


                        <div className={classes.grading_parts}>
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
                            </div>
                        }
                        
                        <div className={classes.grading_parts}>
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
                        <div className={classes.grading_parts}>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice1"
                                    checked={recommendPlace === "choice1"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                I strongly recommend this place for future students
                            </label><br/>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice2"
                                    checked={recommendPlace === "choice2"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                I am satisfied with this place 
                            </label><br/>
                            <label>
                                <input 
                                    type="radio"
                                    value="choice3"
                                    checked={recommendPlace === "choice3"}
                                    onChange={(event)=>setRecommendPlace(event.target.value)}
                                />
                                Unsatisfactory
                            </label>
                        </div>
                        <div className={classes.buttons}>
                            { signature !== undefined &&
                                    <img src={signature} style={ {width: "150px", border:"1px solid black"}}/>
                                }
                            <div className={classes.upload_signature}>           
                                <FileUpload 
                                    accept=".png" 
                                    multiple={false}
                                    dragMessage="Drag and drop an png file here or click"
                                    uploadMessage="Upload an png file"    
                                    buttonMessage="Upload signature"
                                    onSubmit={uploadSignatureHandler}
                                />
                            </div>
                            <button 
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                onClick={downloadGradingFormHandler}
                            >
                                Download Grading Form
                            </button>
                        </div>
                    </div>
            </SplitPane>          
        </div>
    )
}