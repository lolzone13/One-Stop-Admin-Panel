import React, { useState } from 'react'
import Button from '@mui/material/Button';
import './css/UploadFiles.css';
import axios from 'axios';


function UploadFiles(props) {


    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}`+`createOutlet`, formData);
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
                    <input name="upload-file" type="file" accept={props.fileType} id="customFile" onChange={onChange} style = {{ visibility:' hidden '}} />
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