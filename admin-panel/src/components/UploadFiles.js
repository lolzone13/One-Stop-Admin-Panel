import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import './css/UploadFiles.css';


function UploadFiles() {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    // const onUpload = e => {
    //     const del = async () => {
    //         const response = axios.post("url");
    //         return await response;
    //     }
    // }

    return (
        <div className="file-box">
            <form onSubmit={onSubmit} className="form-box">
                <div>
                    <input name="upload-file" type="file" accept='.csv' id="customFile" onChange={onChange} hidden/>
                    <label htmlFor='customFile'>
                        <div className="file-select">
                            {filename}
                        </div>
                    </label>
                </div>
                <div className="upload-button">
                    <Button type="submit" variant="contained" > 
                
                    Upload
                    </ Button>
                </div>
            </form>
        </div>
    )
}

export default UploadFiles;