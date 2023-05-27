import React, {useState, useRef} from 'react';

import "./FileUpload.css"; 

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 */

const FileUpload = (props) => {
    const {accept, multiple, dragMessage, uploadMessage, buttonMessage, onSubmit} = props;
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [files , setFiles] = useState([]);
    const inputRef = useRef(null);
    
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } 
        else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };
    
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setUploadedFileName(event.dataTransfer.files[0].name);
            if (multiple) {
                setFiles(event.dataTransfer.files);
            }
            else {
                setFiles([event.dataTransfer.files[0]]);
            }
        }
    };
    
    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            setUploadedFileName(event.target.files[0].name);
            if (multiple) {
                setFiles(event.target.files);
            }
            else {
                setFiles([event.target.files[0]]);
            }
        }
    };
    
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        onSubmit(files);
    }
    
    return (
        <form id="form-file-upload" onDragEnter={handleDrag}>
            <input 
                ref={inputRef} 
                type="file" 
                id="input-file-upload" 
                onChange={handleChange} 
                accept={accept}
                multiple={multiple}
                />
            <label 
                id="label-file-upload" 
                htmlFor="input-file-upload" 
                className={dragActive ? "drag-active" : "" }>
                <div>
                    {uploadedFileName && <p>Uploaded: {uploadedFileName}</p>}
                    <p>{dragMessage}</p>
                    <button 
                        className="file-upload-button" 
                        onClick={onButtonClick}
                        type='button'
                    >
                        {uploadMessage}
                    </button>
                </div> 
            </label>
            { dragActive 
            && 
            <div 
                id="drag-file-element" 
                onDragEnter={handleDrag} 
                onDragLeave={handleDrag} 
                onDragOver={handleDrag} 
                onDrop={handleDrop}>  
            </div> }
            <button 
                onClick={submitHandler}
                className="submit"
                type='button'
            >
                {buttonMessage}
            </button>
        </form>
    );
  };

export default FileUpload;