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



function CreateRelease(props) {
     const [itemForUpdate] = useState(props.updateItem)

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
                                   <FormGroup>
                                        <Label for="releaseDate">Release Date</Label>
                                        <Input
                                             type="select"
                                             name="releaseDate"
                                             id="releaseDate"
                                             onChange={formik.handleChange}
                                             value={formik.values.releaseDate}
                                        >
                                             <option>Development</option>
                                             <option>Bug</option>
                                        </Input>
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="Project">Project</Label>
                                        <Input
                                             id="Project"
                                             name="Project"
                                             type="text"
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
