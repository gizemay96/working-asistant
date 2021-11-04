import React from 'react';
import { useFormik } from 'formik';
import logo1 from 'assets/img/waa2.png'
import loginValidationShema from "assets/validations/loginValidation";

import { login } from 'services/user.service'
import { useUser } from 'contexts/UserContext'


import {
     FormGroup,
     Label,
     Input,
     FormText,
     Button,
     Card,
     CardBody,
     CardHeader
} from "reactstrap";

const Login = ({ history }) => {
     const { setActiveUser } = useUser();

     const { handleSubmit, handleChange, values, errors, touched } = useFormik({
          initialValues: {
               identifier: '',
               password: '',
          },
          onSubmit: values => {
               loginAction(values);
          },
          validationSchema: loginValidationShema,
     });

     const loginAction = async (values) => {
          const res = await login(values)
          if (res) {
               setActiveUser(res);
               setTimeout(() => {
                    history.push('/')
               }, 500)
          }

     }
     return (
          <div className="content">
               <div className="container">
                    <div className="d-flex justify-content-center">
                         <img alt="logo" className="mb-5" style={{ width: "200px" }} src={logo1} ></img>
                    </div>
                    <Card className="container login-card">
                         <CardHeader className="text-center"><h1>Login</h1></CardHeader>
                         <CardBody>
                              <form onSubmit={handleSubmit}>
                                   <FormGroup>
                                        <Label className="log-reg-label" for="exampleEmail">Email address</Label>
                                        <Input
                                             id="identifier"
                                             name="identifier"
                                             type="identifier"
                                             onChange={handleChange}
                                             value={values.identifier}
                                        />
                                        <span className="form-error">
                                             {errors.identifier && touched.identifier ? (
                                                  <div>{errors.identifier}</div>
                                             ) : null}
                                        </span>
                                        <FormText color="muted">
                                             We'll never share your email with anyone else.
                                        </FormText>
                                   </FormGroup>
                                   <FormGroup>
                                        <Label className="log-reg-label" for="examplePassword">Password</Label>
                                        <Input
                                             id="password"
                                             name="password"
                                             type="password"
                                             onChange={handleChange}
                                             value={values.password}
                                             autoComplete="off"
                                        />
                                        <span className="form-error">
                                             {errors.password && touched.password ? (
                                                  <div>{errors.password}</div>
                                             ) : null}
                                        </span>
                                   </FormGroup>
                                   <Button color="primary" type="submit">
                                        Submit
                                   </Button>
                              </form>
                         </CardBody>
                    </Card>
               </div>

          </div>
     );
};

export default Login;