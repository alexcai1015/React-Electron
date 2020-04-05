import React from 'react';
import { Box } from '@material-ui/core';
import { NavigationBar } from '../common/components/NavigationBar';

import { PassUploadTab } from './PassUploadTab';

export const BulkUpload = () => {
  return (
    <Box>
      <NavigationBar />
      <PassUploadTab />
    </Box>
  );
};