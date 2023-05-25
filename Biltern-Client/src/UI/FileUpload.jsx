import React, {useState, useRef} from 'react';

import "./FileUpload.css"; 

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 */

const FileUpload = (props) => {
    const {accept, multiple, onFilesAdded, dragMessage, uploadMessage} = props;
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');
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
                onFilesAdded(event.dataTransfer.files);
            }
            else {
                onFilesAdded([event.dataTransfer.files[0]]);
            }
        }
    };
    
    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            setUploadedFileName(event.target.files[0].name);
            if (multiple) {
                onFilesAdded(event.target.files);
            }
            else {
                onFilesAdded([event.target.files[0]]);
            }
        }
    };
    
    const onButtonClick = () => {
        inputRef.current.click();
    };
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(event) => event.preventDefault()}>
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
      </form>
    );
  };

export default FileUpload;