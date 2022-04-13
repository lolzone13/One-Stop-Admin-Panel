import React, { useState } from 'react'
import Button from '@mui/material/Button';


function UploadButton() {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <input name="upload-file" type="file" accept='.csv' id="customFile" onChange={onChange} hidden/>
                    <label htmlFor='customFile'>
                        {filename}
                    </label>
                </div>

                <Button type="submit" variant="contained"> 
                Upload
                </ Button>
            </form>
        </>
    )
}

export default UploadButton;