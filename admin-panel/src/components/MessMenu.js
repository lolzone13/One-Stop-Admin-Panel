import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadFiles from './UploadFiles.js';
import "./css/MessMenu.css"

const MessMenu = () => {



    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className='messmenu_page'>
            <div className='messmenu_page_button1'>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Brahmaputra"}>Brahmaputra</MenuItem>
                            <MenuItem value={"Lohit"}>Lohit</MenuItem>
                            <MenuItem value={"Siang"}>Siang</MenuItem>
                            <MenuItem value={"Disang"}>Disang</MenuItem>
                            <MenuItem value={"Dibang"}>Dibang</MenuItem>
                            <MenuItem value={"Kapili"}>Kapili</MenuItem>
                            <MenuItem value={"Manas"}>Manas</MenuItem>
                            <MenuItem value={"Barak"}>Barak</MenuItem>
                            <MenuItem value={"Kameng"}>Kameng</MenuItem>
                            <MenuItem value={"Umiam"}>Umiam</MenuItem>
                            <MenuItem value={"Dhansiri"}>Dhansiri</MenuItem>
                            <MenuItem value={"Subansiri"}>Subansiri</MenuItem>
                            <MenuItem value={"Married Scholar's Hostel"}>Married Scholar's Hostel</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <span>SELECT THE CSV</span>
                <UploadFiles fileType='.csv' url='https://swc.iitg.ac.in/onestopapi/createmessmenu' />
            </div>
        </div>
    )
}



/*
<!-- component -->
<div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' class="hidden" />
    </label>
</div>
*/

export default MessMenu;