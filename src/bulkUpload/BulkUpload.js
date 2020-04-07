import React from 'react';
import { Box } from '@material-ui/core';
import { NavigationBar } from '../common/components/NavigationBar';
import { GoogleAnalytics } from '../common/components/GoogleAnalytics';

import { PassUploadTab } from './PassUploadTab';

export const BulkUpload = () => {
  return (
    <>
      <GoogleAnalytics />
      <Box>
        <NavigationBar />
        <PassUploadTab />
      </Box>
    </>
  );
};