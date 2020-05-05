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
import { UploadWarningModal } from './UploadWarningModal';
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
    paddingTop: 10,
    paddingLeft: 70,
  },
  tabPanel: {
    paddingTop: 10,
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

const UPLOAD_MODAL_MESSAGE_INITIAL_STATE =
  'We will send bulk upload results to individuals via SMS and email.';

export const PassUploadTab = () => {
  const classes = useStyles();
  const { error, isLoading, response, isCompleted, execute, reset: resetUpload } = useUploadFile(
    '/v1/batch/access-passes'
  );
  const [value, setValue] = useState(0);
  const { showSnackbar } = useSnackbar();
  const [uploadBoxTextIndividual, setUploadBoxTextIndividual] = useState(UPLOAD_TEXT);
  const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] = useState(false);
  const [isUploadWarningModalOpen, setIsUploadWarningModalOpen] = useState(false);
  const [uploadModalMessage, setUploadModalMessage] = useState(UPLOAD_MODAL_MESSAGE_INITIAL_STATE);

  // ! TODO: put other upload success modal state cleanup here
  const resetUploadModal = () => {
    setUploadModalMessage(UPLOAD_MODAL_MESSAGE_INITIAL_STATE);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChangeIndividual = (files) => {
    setUploadBoxTextIndividual(files[0].name);
    execute(files[0]);
  };

  const handleFileAddedMessage = (fileName) => `${fileName} selected.`;

  const getDeclinedLineError = (message) => {
    const [, messageLine, messageError] = message.match(/Record\s(\d+):\swas\sdeclined.\s(.+)\./);
    return {
      line: messageLine,
      error: messageError,
    };
  };

  useEffect(() => {
    const getBulkUploadStats = (results) => {
      const lineError = {};
      const stats = results.reduce(
        (acc, result) => {
          const nextAcc = {
            ...acc,
          };

          // ! TODO: express declaratively
          // ! TODO: is there a more reliable to classify the result?
          if (result.includes('Success')) {
            nextAcc.approved += 1;
          } else if (result.includes('declined')) {
            nextAcc.declined += 1;
            const declinedLineError = getDeclinedLineError(result);
            const line = parseInt(declinedLineError.line, 10) + 1;
            if (lineError[declinedLineError.error]) lineError[declinedLineError.error].push(line);
            else lineError[declinedLineError.error] = [line];
          } else if (result.includes('No change.')) {
            nextAcc.existing += 1;
          }

          return nextAcc;
        },
        {
          approved: 0,
          declined: 0,
          existing: 0,
          declinedLineError: lineError,
        }
      );

      return stats;
    };

    if (isCompleted && !error) {
      try {
        const records = JSON.parse(response);
        const recordsCount = records.length;

        // ? TODO: remove this if guard clause?
        if (!recordsCount) {
          return;
        }

        const recordsStats = getBulkUploadStats(records);
        let message = `${recordsStats.approved} out of ${recordsCount} record/s were successfully approved.\n\n`;

        if (recordsStats.approved > 0) {
          message += `${recordsStats.approved} approved applicant/s will be notified via SMS/email to access their QR codes.\n`;
        }

        if (recordsStats.existing > 0) {
          message += `${recordsStats.existing} existing approved record/s from the file. No change done.\n`;
        }

        if (recordsStats.declined > 0) {
          message += `Found ${recordsStats.declined} applicant/s with WRONG DATA INPUT in the CSV file. Please fix the inputs in the file following the specific error lines below.\n\n`;

          Object.keys(recordsStats.declinedLineError).forEach((declinedError) => {
            message += `${declinedError}: Line record/s ${recordsStats.declinedLineError[
              declinedError
            ].join(', ')}`;
          });
        }

        setUploadModalMessage(message);
        if (recordsStats.declined > 0) setIsUploadWarningModalOpen(true);
        else setIsUploadSuccessModalOpen(true);
      } catch (e) {
        // ? TODO: error logging service?
      }
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
        <Tab icon={<People />} label="INDIVIDUALS" />
      </Tabs>

      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <h3>Bulk Upload CSV File</h3>
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
        message={uploadModalMessage}
        handleClose={() => {
          setIsUploadSuccessModalOpen(false);
          resetUploadModal();
        }}
      />

      <UploadWarningModal
        open={isUploadWarningModalOpen}
        message={uploadModalMessage}
        handleClose={() => {
          setIsUploadWarningModalOpen(false);
          resetUploadModal();
        }}
      />
    </>
  );
};

const StyledBox = styled(Box)({
  display: 'block',
  margin: '0 auto',
  width: 500,
  marginTop: 30,
  textAlign: 'center',
});

const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
});
