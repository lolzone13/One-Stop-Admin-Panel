import React from 'react';
import UploadFiles from './UploadFiles';
import TableContactsSubsection from './TableContactsSubsection.js';
import '../components/css/Contacts.css';
import Dropdown from './Dropdown';
import axios from 'axios';

const Contacts = () => {
  const [allSections, setAllSections] = React.useState([]);
  const [section, setSection] = React.useState('');
  const [allSubsections, setAllSubsections] = React.useState([]);
  const [subsection, setSubsection] = React.useState('');

  const schema = [
  {
    section: 'Departments',
    subsection: ['Chemical Engineering', 'Civil Engineering', 'Computer Science and Engineering', 'Electrical Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering'],
  },
  {
    section: 'IITG Administration',
    subsection: ['Director Office', 'Deputy Director Office'],
  },
  ]

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          'https://swc.iitg.ac.in/onestopapi/getAllSubsections'
        );
        console.log('hiiii', res.data);
        setAllSections(schema.subsection);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className='contacts_page'>
        <div className='contacts_page_button1'>
          <span>BUTTON 1</span>
          <UploadFiles
            fileType='.csv'
            url='https://one-stop-api.herokuapp.com/createcontact'
          />
        </div>
        <div className='contacts_page_button2'>
          <span>BUTTON 2</span>
          <UploadFiles
            fileType='.csv'
            url='https://one-stop-api.herokuapp.com/createcontact'
          />
        </div>
        <div className='contacts_page_button2'>
          <span>Select Section</span>
          <Dropdown 
          allSections = {allSections}
          
          />
        </div>
        <div className='contacts_page_button2'>
          <span>Select Subsection</span>
          <Dropdown/>
        </div>
        <div className='contacts_page_table2'>
          <TableContactsSubsection />
        </div>
      </div>
    </>
  );
};

export default Contacts;
