import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, Typography, LinearProgress, styled } from '@material-ui/core';
import { People, LocalShipping } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

import { useUploadFile } from '../common/hooks/useUploadFile';

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

export const PassUploadTab = () => {
  const classes = useStyles();
  const { error, isLoading, isCompleted, execute } = useUploadFile('/v1/batch/access-passes');
  const [value, setValue] = React.useState(0);
  const [uploadBoxTextIndividual, setUploadBoxTextIndividual] = React.useState(
    'Click Here or Drag and Drop to Upload CSV/Excel file'
  );
  const [uploadBoxTextVehicle, setUploadBoxTextVehicle] = React.useState(
    'Click Here or Drag and Drop to Upload CSV/Excel file'
  );
  const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChangeIndividual = (files) => {
    setUploadBoxTextIndividual(files[0].name);
    execute(files[0]);
  };

  const handleFileChangeVehicle = (files) => {
    setUploadBoxTextVehicle(files[0].name);
    execute(files[0]);
  };

  const acceptedFile = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  useEffect(() => {
    if (isCompleted && !error) {
      setIsUploadSuccessModalOpen(true);
    }
  }, [isCompleted, error]);

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
        <Tab icon={<LocalShipping />} label="FOR VEHICLES" />
      </Tabs>

      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <h3>Bulk Upload File for Individuals</h3>
        Please follow the fields format to avoid data error upon uploading.
        <br />
        <DownloadTemplateLink />
        <div className={classes.uploadBox}>
          <DropzoneArea
            onChange={handleFileChangeIndividual}
            acceptedFiles={acceptedFile}
            filesLimit={1}
            dropzoneText={uploadBoxTextIndividual}
            showPreviewsInDropzone={false}
            showAlerts={false}
            dropzoneParagraphClass={classes.uploadBoxText}
          />
        </div>
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <h3>Bulk Upload File for Vehicles</h3>
        Please follow the fields format to avoid data error upon uploading.
        <br />
        <DownloadTemplateLink />
        <div className={classes.uploadBox}>
          <DropzoneArea
            onChange={handleFileChangeVehicle}
            acceptedFiles={acceptedFile}
            filesLimit={1}
            dropzoneText={uploadBoxTextVehicle}
            showPreviewsInDropzone={false}
            showAlerts={false}
            dropzoneParagraphClass={classes.uploadBoxText}
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
