import React from 'react';

import { NavigationBar } from '../../common/components/NavigationBar';

import { ListTable } from './dashboard/ListTable';

export const Dashboard = (props) => {
  return (
    <div>
      <NavigationBar />

      <div style={{ height: '50px' }}>{/* TODO: replace with filter */}</div>

      <ListTable />
    </div>
  );
};
