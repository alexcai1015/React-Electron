import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, Typography, LinearProgress, styled } from '@material-ui/core';
import { People } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

import { useUploadFile } from '../common/hooks/useUploadFile';
import { useSnackbar } from '../hooks';
import { PassType } from '../common/constants/PassType';

import { UploadSuccessModal } from './UploadSuccessModal';
import { DownloadTemplateLink } from './passUploadTab/DownloadTemplateLink';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.defaultProps = {
  children: '',
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingTop: 40,
    paddingLeft: 70,
  },
  tabPanel: {
    paddingTop: 20,
    paddingLeft: 70,
    paddingRight: 70,
  },
  uploadBox: {
    paddingTop: 20,
  },
  uploadBoxText: {
    marginTop: '5%',
  },
});

const UPLOAD_TEXT = 'Click Here or Drag and Drop to Upload (.csv) file';

const acceptedFile = ['.csv', 'text/csv'];

export const PassUploadTab = () => {
  const classes = useStyles();
  const { error, isLoading, response, isCompleted, execute, reset: resetUpload } = useUploadFile(
    '/v1/batch/access-passes'
  );
  const [value, setValue] = useState(0);
  const { showSnackbar } = useSnackbar();
  const [uploadBoxTextIndividual, setUploadBoxTextIndividual] = useState(UPLOAD_TEXT);
  const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] = useState(false);
  const [uploadSuccessModalMessage, setUploadSuccessModalMessage] = useState(
    'We will send bulk upload results to individuals via SMS and email.'
  );

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChangeIndividual = (files) => {
    setUploadBoxTextIndividual(files[0].name);
    execute(files[0]);
  };

  const handleFileAddedMessage = (fileName) => `${fileName} selected.`;

  const getBulkUploadStats = (results) => {
    let stats = {
      approved: 0,
      declined: 0,
      existing: 0,
      approvedExisting: 0
    };

    results.forEach((result) => {
      if (result.indexOf('Success') > 0) stats.approved += 1;
      else if (result.indexOf('declined') > 0) stats.declined += 1;
      else if (result.indexOf('No change.') > 0) stats.existing += 1;
    });

    return stats;
  }

  useEffect(() => {
    if (isCompleted && !error) {
      setIsUploadSuccessModalOpen(true);

      try {
        const records = JSON.parse(response);
        const recordsCount = records.length;

        if (recordsCount > 0) {
          const recordsStats = getBulkUploadStats(records);
          const message =
            `${recordsStats.approved} out of ${recordsCount} records were successfully approved.\n\n` +
            `${recordsStats.approved} approved applicants will be notified via SMS/email to access their QR codes.\n` +
            `${recordsStats.existing} of existing approved records from the file. No change done.\n` +
            `${recordsStats.declined} applicants with incomplete or invalid data will also be notified via SMS/email.`;
          setUploadSuccessModalMessage(message);
        }
      }
      catch(e) {}
    }
  }, [isCompleted, error, response]);

  useEffect(() => {
    if (isCompleted && error) {
      showSnackbar({
        message: error,
        severity: 'error',
      });

      resetUpload();
    }
  }, [error, isCompleted, resetUpload, showSnackbar]);

  return (
    <>
      <Tabs
        className={classes.root}
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<People />} label="FOR INDIVIDUALS" />
      </Tabs>

      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <h3>Bulk Upload File for Individuals</h3>
        Please follow the fields format to avoid data error upon uploading.
        <br />
        <DownloadTemplateLink type={PassType.INDIVIDUAL} />
        <div className={classes.uploadBox}>
          <DropzoneArea
            onChange={handleFileChangeIndividual}
            acceptedFiles={acceptedFile}
            filesLimit={1}
            dropzoneText={uploadBoxTextIndividual}
            showPreviewsInDropzone={false}
            dropzoneParagraphClass={classes.uploadBoxText}
            getFileAddedMessage={handleFileAddedMessage}
            showAlerts
          />
        </div>
      </TabPanel>

      {isLoading && (
        <StyledBox component="div">
          <Typography>File Uploading...</Typography>
          <StyledLinearProgress />
        </StyledBox>
      )}

      <UploadSuccessModal
        open={isUploadSuccessModalOpen}
        message={uploadSuccessModalMessage}
        handleClose={() => {
          setIsUploadSuccessModalOpen(false);
        }}
      />
    </>
  );
};

const StyledBox = styled(Box)({
  display: 'block',
  margin: '0 auto',
  width: 500,
  marginTop: 50,
  textAlign: 'center',
});

const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
});
