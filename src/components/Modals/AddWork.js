import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { addWork, updateWork } from '../../services/works.service'

import addWorkValidationShema from "../../assets/validations/addWorkValidation";
import '../../assets/scss/black-dashboard-react/custom/addWork.scss'

import {
     FormGroup,
     Label,
     Input,
     Button,
     Card,
     CardBody
} from "reactstrap";


function AddWork(props) {
     const [itemForUpdate] = useState(props.updateItem)
     const [environments, setEnvironment] = useState({
          dev: itemForUpdate ? itemForUpdate.dev : {
               active: true,
               date: `${new Date()}`
          },
          fut: itemForUpdate ? itemForUpdate.fut : {
               active: false,
               date: ''
          },
          uat: itemForUpdate ? itemForUpdate.uat : {
               active: false,
               date: ''
          },
          preprod: itemForUpdate ? itemForUpdate.preprod : {
               active: false,
               date: ''
          },
          prod: itemForUpdate ? itemForUpdate.prod : {
               active: false,
               date: ''
          },
     });

     // useEffect(() => {
     //      console.log(itemForUpdate)
     // }, [])

     const formik = useFormik({
          initialValues: {
               type: itemForUpdate ? itemForUpdate.type : 'Development',
               ticketId: itemForUpdate ? itemForUpdate.ticketId : '',
               name: itemForUpdate ? itemForUpdate.name : '',
               branch: itemForUpdate ? itemForUpdate.branch : '',
               currentEnv: itemForUpdate ? itemForUpdate.currentEnv : 1,
               ...environments
          },
          onSubmit: values => {
               if (itemForUpdate) {
                    updateWork({ ...itemForUpdate, values })
               } else {
                    addWork(values)
               }
               formik.resetForm();
               props.closeModal(true)
          },
          validationSchema: addWorkValidationShema,
     });

     const changeEnv = (key) => {
          const data = environments;
          data[key].active = !data[key].active
          data[key].date = !data[key].active ? '' : `${new Date()}`;
          setEnvironment({ ...data });
     }


     return (
          <div>
               <div className="content">
                    <Card className="container">
                         <CardBody>
                              <form onSubmit={formik.handleSubmit}>
                                   <FormGroup>
                                        <Label for="type">Work Type</Label>
                                        <Input
                                             type="select"
                                             name="type"
                                             id="type"
                                             onChange={formik.handleChange}
                                             value={formik.values.type}
                                        >
                                             <option>Development</option>
                                             <option>Bug</option>
                                        </Input>
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="ticketId">Ticket Id</Label>
                                        <Input
                                             id="ticketId"
                                             name="ticketId"
                                             type="ticketId"
                                             onChange={formik.handleChange}
                                             value={formik.values.ticketId}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="name">Work Name</Label>
                                        <Input
                                             id="name"
                                             name="name"
                                             type="name"
                                             onChange={formik.handleChange}
                                             value={formik.values.name}
                                        />
                                   </FormGroup>
                                   <FormGroup>
                                        <Label for="branch">Work Branch</Label>
                                        <Input
                                             id="branch"
                                             name="branch"
                                             type="branch"
                                             onChange={formik.handleChange}
                                             value={formik.values.branch}
                                        />
                                   </FormGroup>
                                   <Label for="branch">Environments</Label>
                                   <div className="d-flex justify-content-between">
                                        <FormGroup>
                                             <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1">
                                                  <Button type="button" onClick={() => changeEnv('dev')} className="btn-icon btn-round " size="sm"
                                                       color={environments.dev.active === true ? "success-custom" : "danger"}
                                                  >
                                                       <small>Dev</small>
                                                  </Button>
                                             </span>
                                        </FormGroup>
                                        <FormGroup>
                                             <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1">
                                                  <Button type="button" onClick={() => changeEnv('fut')} className="btn-icon btn-round " size="sm"
                                                       color={environments.fut.active === true ? "success-custom" : "danger"}
                                                  >
                                                       <small>Fut</small>
                                                  </Button>
                                             </span>
                                        </FormGroup>

                                        <FormGroup>
                                             <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1">
                                                  <Button type="button" onClick={() => changeEnv('uat')} className="btn-icon btn-round " size="sm"
                                                       color={environments.uat.active === true ? "success-custom" : "danger"}
                                                  >
                                                       <small>Uat</small>
                                                  </Button>
                                             </span>
                                        </FormGroup>

                                        <FormGroup>
                                             <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1">
                                                  <Button type="button" onClick={() => changeEnv('preprod')} className="btn-icon btn-round " size="sm"
                                                       color={environments.preprod.active === true ? "success-custom" : "danger"}
                                                  >
                                                       <small>PRP</small>
                                                  </Button>
                                             </span>
                                        </FormGroup>

                                        <FormGroup>
                                             <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1">
                                                  <Button type="button" onClick={() => changeEnv('prod')} className="btn-icon btn-round " size="sm"
                                                       color={environments.prod.active === true ? "success-custom" : "danger"}
                                                  >
                                                       <small>PRD</small>
                                                  </Button>
                                             </span>
                                        </FormGroup>

                                   </div>
                                   <Button color="primary" type="submit">
                                        {itemForUpdate ? 'Update Item' : 'Add New'}
                                   </Button>
                                   <Button onClick={() => props.closeModal(true)} color="primary" type="button">
                                        Close
                                   </Button>
                              </form>
                         </CardBody>
                    </Card>

               </div>
          </div>
     )
}

export default AddWork;