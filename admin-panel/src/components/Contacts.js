import React from 'react';
import UploadFiles from './UploadFiles';
import TableContactsSubsection from './TableContactsSubsection.js';
import '../components/css/Contacts.css';
import Dropdown from './Dropdown';
import axios from 'axios';
import { computeFlexColumnsWidth } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';

const Contacts = () => {
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
  const [allSections, setAllSections] = React.useState([]);
  const [selection, setSelection] = React.useState('');
  const [secondSelection, setSecondSelection] = React.useState('');
  const [allSubsections, setAllSubsections] = React.useState({});




  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://swc.iitg.ac.in/onestopapi/getAllSubsections');

        const sectionData = {};
        const firstDropDownData = [];
        res.data.forEach((element) => {
          console.log(element);
          if (element.section !== undefined) {
            sectionData[element.section] = element.subsection;
            firstDropDownData.push(element.section);
          }

        });
        //console.log(sectionData);
        setAllSections(firstDropDownData);
        setAllSubsections(sectionData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  //console.log(selection);
  //console.log(allSubsections[selection]);
  return (
    <>
      <div className='contacts_page'>
        <div className='contacts-upload'>
          <div className='contacts_page_button1'>
            <span>Section</span>
            <UploadFiles
              fileType='.csv'
              url='https://swc.iitg.ac.in/onestopapi/createsection'
              compName='first'
            />
          </div>
          <div className='contacts_page_button2'>
            <span>Contacts</span>
            <UploadFiles
              fileType='.csv'
              url='https://swc.iitg.ac.in/onestopapi/createcontact'
              compName='second'
            />
          </div>
        </div>
        <div className='contacts-select'>
          <div className='contacts_page_button2'>
            <span style={{ marginBottom: '1.1rem' }}>Select Section</span>
            <br />
            <Dropdown data={allSections} setSelection={setSelection} setSecond={setSecondSelection} />
          </div>
          <div className='contacts_page_button2'>
            {selection !== '' && (
              <div>
                <span>Select Subsection</span>
                <div>
                  <br />
                  <br />
                </div>
                <Dropdown
                  data={allSubsections[selection]}
                  setSelection={setSecondSelection}
                />
              </div>
            )}
          </div>
        </div>

        {secondSelection  && (
          <div className='contacts_page_table2'>
            <TableContactsSubsection data={secondSelection} />
          </div>
        )}
      </div>
    </>
  );
};

export default Contacts;
