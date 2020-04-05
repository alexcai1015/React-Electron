import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography } from '@material-ui/core';
import { People, LocalShipping } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

import { UploadSuccessModal } from './UploadSuccessModal';

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
    setIsUploadSuccessModalOpen(true);
  };

  const handleFileChangeVehicle = (files) => {
    setUploadBoxTextVehicle(files[0].name);
    setIsUploadSuccessModalOpen(true);
  };

  const acceptedFile = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

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
        Download the template here.
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
        Download the template here.
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

      <UploadSuccessModal
        open={isUploadSuccessModalOpen}
        handleClose={() => {
          setIsUploadSuccessModalOpen(false);
        }}
      />
    </>
  );
};
