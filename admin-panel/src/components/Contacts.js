import React from 'react';
import UploadFiles from './UploadFiles';
import '../components/css/Contacts.css';

const Contacts = () => {
  return (
    <>
      <div className='contacts_page'>
        <div className='contacts_page_button1'>
          <span>BUTTON 1</span>
          <UploadFiles
            fileType='.csv'
            url='https://swc.iitg.ac.in/onestopapi/createcontact'
          />
        </div>
        <div className='contacts_page_button2'>
          <span>BUTTON 2</span>
          <UploadFiles
            fileType='.csv'
            url='https://swc.iitg.ac.in/onestopapi/createcontact'
          />
        </div>
      </div>
    </>
  );
};

export default Contacts;
