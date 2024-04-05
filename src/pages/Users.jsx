import React, { useRef, useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { ClipLoader } from 'react-spinners';
import { Header } from '../components';
import Switch from 'react-switch';

const Users = () => {
  const selectionsettings = { persistSelection: true };

  const gridInstance = useRef(null);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersList();
  }, []); // Fetch data on component mount

  const fetchUsersList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users'); // Fetch data from backend API
      if (response.ok) {
        const result = await response.json();
        setUsersData(result);
      } else {
        console.error('Failed to fetch users list');
      }
    } catch (error) {
      console.error('Error fetching users list:', error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleSwitchChange = async (checked, columnName, rowIndex) => {
    try {
      const userToUpdate = usersData[rowIndex];
      if (userToUpdate && columnName) {
        console.log('columnName:', columnName);
        console.log('checked:', checked);
        
        // Construct request body
        const requestBody = {
          virus_total: usersData[rowIndex].virus_total,
          the_phish: usersData[rowIndex].the_phish,
          sms_whatsapp_phishing: usersData[rowIndex].sms_whatsapp_phishing,
          [columnName]: checked ? 1 : 0
        };
        console.log('requestBody:', requestBody);
  
        const response = await fetch(`http://localhost:3001/api/users/${userToUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        if (response.ok) {
          const updatedUsersData = [...usersData];
          updatedUsersData[rowIndex][columnName] = checked ? 1 : 0;
          setUsersData(updatedUsersData);
        } else {
          console.error('Failed to update user status');
        }
      } else {
        console.error('Invalid columnName or userToUpdate');
      }
    } catch (error) {
      console.error('Error updating user status:', error.message);
    }
  };
    
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-main-dark-bg rounded-3xl">
      <Header category="Page" title="Users" />
      {loading ? (
        // Render loader when data is still loading
        <div className="flex justify-center items-center h-screen bg-secondary-dark-bg">
          <ClipLoader color="#fff" size={100} />
        </div>
      ) : (
        // Render the grid once data is loaded
        <GridComponent
          dataSource={usersData}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          allowSorting
          ref={gridInstance}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="User ID" isPrimaryKey={true} />
            <ColumnDirective field="username" headerText="Username" />
            <ColumnDirective field="name" headerText="Name" />
            <ColumnDirective field="virus_total" headerText="Virus Total" template={(rowData) => (
              <Switch
                onChange={(checked) => handleSwitchChange(checked, 'virus_total', rowData.index)}
                checked={rowData.virus_total === 1}
              />
            )} />
            <ColumnDirective field="the_phish" headerText="The Phish" template={(rowData) => (
              <Switch
                onChange={(checked) => handleSwitchChange(checked, 'the_phish', rowData.index)}
                checked={rowData.the_phish === 1}
              />
            )} />
            <ColumnDirective field="sms_whatsapp_phishing" headerText="SMS & Whatsapp Phishing" template={(rowData) => (
              <Switch
                onChange={(checked) => handleSwitchChange(checked, 'sms_whatsapp_phishing', rowData.index)}
                checked={rowData.sms_whatsapp_phishing === 1}
              />
            )} width={200}/>
            <ColumnDirective field="payment_date" headerText="Payment" width={120}/>
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      )}
    </div>
  );
};

export default Users;