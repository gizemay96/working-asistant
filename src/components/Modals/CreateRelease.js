import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { createWork, updateWork } from '../../services/works.service'

// import createWorkValidationShema from "../../assets/validations/createWorkValidation";
import '../../assets/scss/black-dashboard-react/custom/createWork.scss'

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



function CreateRelease(props) {
    const [itemForUpdate] = useState(props.updateItem)
    const [value, setValue] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            releaseDate: itemForUpdate ? itemForUpdate.type : 'Development',
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

    return (
        <div>
            <div className="content">
                <Card className="container">
                    <CardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Basic example"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
    )
}

export default CreateRelease;
