import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { createWork, updateWork } from '../../services/works.service'

// import createWorkValidationShema from "../../assets/validations/createWorkValidation";
import '../../assets/scss/black-dashboard-react/custom/createWork.scss'
import styles from '../../assets/scss/black-dashboard-react/custom/test.module.scss';
import ruLocale from 'date-fns/locale/ru';

import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody
} from "reactstrap";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import PickersDay from '@mui/lab/PickersDay';
import { ClickAwayListener } from "@material-ui/core";


const TextFieldCustom = styled(TextField)({
  '& label.Mui-focused': {
    color: '#c852e5',
  },
  '& label.Mui-focused': {
    color: '#c852e5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#c852e5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c852e5',
    },
    color: "white"
  },
});




const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#07152a"
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          outline: 'none',
          color: 'white',
          border: "none"
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: "none"

        }
      }
    },
  },
});

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  backgroundColor: "#27293d",
  color: "white",
  ":hover": {
    backgroundColor: "#1565c0"
  },
}));









function CreateRelease(props) {
  const [itemForUpdate] = useState(props.updateItem)
  const [value, setValue] = React.useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAway = () => { if (isOpen) { console.log('ww'); setIsOpen(false); } };
  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    console.log(value)
    renderWeekPickerDay();
  }, [], [value])

  const formik = useFormik({
    initialValues: {
      releaseDate: value,
      Project: itemForUpdate ? itemForUpdate.ticketId : '',
    },
    onSubmit: values => {
      if (itemForUpdate) {
        updateWork(values, itemForUpdate.id)
          .then(res => {
            formik.resetForm();
            props.closeModal(true)
          });
      } else {
        createWork(values)
          .then(res => {
            formik.resetForm();
            props.closeModal(true)
          });
      }

    },
    //   validationSchema: createWorkValidationShema,
  });

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <CustomPickersDay {...pickersDayProps} />;
    }


    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.homepage}>
        <div className="content">
          <Card className="container">
            <CardBody>
              <ClickAwayListener onClickAway={handleClickAway}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="dark-blue-picker">
                    <DatePicker
                      open={isOpen}
                      onClose={handleClick}
                      onOpen={handleClick}
                      label="Release Date"
                      value={value}
                      inputFormat="dd/MM/yyyy"
                      onChange={(newValue) => { setValue(newValue); }}
                      renderDay={renderWeekPickerDay}
                      renderInput={(params) => <TextFieldCustom onClick={handleClick} id="custom-css-outlined-input" {...params} style={{ width: "100%", color: "white", outlineColor: "white", borderBlock: "none" }} />}
                    />
                  </div>
                </LocalizationProvider>
              </ClickAwayListener>


              <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label for="Project">Project</Label>
                  <Input
                    id="Project"
                    name="Project"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.Project}
                  />
                </FormGroup>
                <div className="d-flex justify-content-between">
                  <Button onClick={() => props.closeModal(true)} color="primary" type="button">
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    {itemForUpdate ? 'Update Item' : 'Add New'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

        </div>
      </div>
    </ThemeProvider>
  )
}

export default CreateRelease;
