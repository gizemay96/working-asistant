import React from 'react';
import { useFormik } from 'formik';

import loginValidationShema from "../assets/validations/loginValidation";

import { login } from '../services/user.service'
import { useUser } from '../contexts/UserContext'


import {
     FormGroup,
     Label,
     Input,
     FormText,
     Button,
     Card,
     CardBody
   } from "reactstrap";

const Login = ({history}) => {
     const { setActiveUser } = useUser();

     const formik = useFormik({
          initialValues: {
               identifier: '',
               password: '',
          },
          onSubmit: values => {
               login(values.identifier, values.password)
                    .then(res =>
                         setActiveUser(res),
                         history.push('/')
                    )
                    .catch(err => {
                         console.log(err.response)
                    });
          },
          validationSchema: loginValidationShema,
     });
     return (
          <div className="content">
               <Card className="container">
                    <CardBody>
                         <form onSubmit={formik.handleSubmit}>
                              <FormGroup>
                                   <Label for="exampleEmail">Email address</Label>
                                   <Input
                                       id="identifier"
                                       name="identifier"
                                       type="identifier"
                                       onChange={formik.handleChange}
                                       value={formik.values.identifier}
                                   />
                                   <FormText color="muted">
                                        We'll never share your email with anyone else.
                                   </FormText>
                              </FormGroup>
                              <FormGroup>
                                   <Label for="examplePassword">Password</Label>
                                   <Input
                                         id="password"
                                         name="password"
                                         type="text"
                                         onChange={formik.handleChange}
                                         value={formik.values.password}
                                        autoComplete="off"
                                   />
                              </FormGroup>
                              <FormGroup check>
                                   <Label check>
                                        <Input type="checkbox" />{' '}
                                        Check me out
                                        <span className="form-check-sign">
                                             <span className="check"></span>
                                        </span>
                                   </Label>
                              </FormGroup>
                              <Button color="primary" type="submit">
                                   Submit
                              </Button>
                         </form>
                    </CardBody>
               </Card>

          </div>
     );
};

export default Login;