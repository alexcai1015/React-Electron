import React from 'react';
import { NavigationBar } from '../common/components/navigationBar';
import ListTable from '../common/components/listTable';

export const Dashboard = (props) => {
  return (
    <div>
      <NavigationBar />

      <div style={{ height: '50px' }}>
        {/* TODO: replace with filter */}
      </div>

      <ListTable />
    </div>
  );
};
