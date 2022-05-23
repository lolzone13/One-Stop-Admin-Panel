import React, { useState } from 'react'
import Button from '@mui/material/Button';
import './css/UploadFiles.css';
import axios from 'axios';


function UploadFiles(props) {
    
    const idVal = (props.compName === undefined) ? "first" : props.compName;
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    
    const onChange = e => {
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        console.log(props.compName, filename, props.url);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(props.url, formData);
            console.log(props.url);
            console.log('Successfully added!');
            window.location.reload();


        } catch (error) {
            console.log(error);
        }
        
    }


    return (
        <div className="file-box">
            <form onSubmit={onSubmit} className="form-box">
                <div>
                    <input name="upload-file" type="file" accept={props.fileType} id={idVal} onChange={onChange} style = {{ visibility:' hidden '}} />
                    <label htmlFor={idVal}>
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