import React from 'react'
import { useFormik } from 'formik';
import logo1 from 'assets/img/waa2.png'
import registerValidationShema from "assets/validations/registerValidation";

import { register } from 'services/user.service'
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

function Register({ history }) {

     const { setActiveUser } = useUser();

     const { handleSubmit, handleChange, values, errors, touched } = useFormik({
          initialValues: {
               username: '',
               email: '',
               password: '',
               confirmPassword: ''
          },
          onSubmit: values => {
               register(values)
                    .then(res =>
                         setActiveUser(res),
                         setTimeout(() => {
                              history.push('/')
                         }, 500)
                    )
                    .catch(err => {
                    });
          },
          validationSchema: registerValidationShema,
     });

     return (
          <div className="content">
               <div className="container">
               <div className="d-flex justify-content-center">
                         <img className="mb-5" style={{ width: "200px" }} src={logo1} ></img>
                    </div>
                    <Card className="container login-card">
                         <CardHeader className="text-center"><h1>Register</h1></CardHeader>
                         <CardBody>
                              <form onSubmit={handleSubmit}>
                              <FormGroup>
                                        <Label className="log-reg-label" for="exampleEmail">User Name</Label>
                                        <Input
                                             id="username"
                                             name="username"
                                             type="username"
                                             onChange={handleChange}
                                             value={values.username}
                                        />
                                            <span className="form-error">
                                             {errors.username && touched.username ? (
                                                  <div>{errors.username}</div>
                                             ) : null}
                                        </span>
                                   </FormGroup>
                                   <FormGroup>
                                        <Label className="log-reg-label" for="exampleEmail">Email address</Label>
                                        <Input
                                             id="email"
                                             name="email"
                                             type="email"
                                             onChange={handleChange}
                                             value={values.email}
                                        />
                                            <span className="form-error">
                                             {errors.email && touched.email ? (
                                                  <div>{errors.email}</div>
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
                                   <FormGroup>
                                        <Label className="log-reg-label" for="exampleconfirmPassword">Confirm Password</Label>
                                        <Input
                                             id="confirmPassword"
                                             name="confirmPassword"
                                             type="password"
                                             onChange={handleChange}
                                             value={values.confirmPassword}
                                             autoComplete="off"
                                        />
                                            <span className="form-error">
                                             {errors.confirmPassword && touched.confirmPassword ? (
                                                  <div>{errors.confirmPassword}</div>
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
     )
}

export default Register
