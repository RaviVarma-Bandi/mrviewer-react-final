import { Card, CardContent, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { Container } from 'react-bootstrap'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as axiosConf from "../api/axiosConf";


function Register() {
    const userNameRegExp = /^[a-z0-9]+$/i;
    const phoneRegExp = /^\d{10}$/i;
    const emailRegExp =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            mobileNumber: '',
            gender: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("* required feild")
                .max(15, "Username must be between 6-15")
                .min(5, "Username must be between 6-15")
                .matches(userNameRegExp, "Username format is invalid"),

            email: Yup.string()
                .required("* required field")
                .matches(emailRegExp, "Email format is invalid"),

            gender: Yup.string()
                .required("* required feild"),

            mobileNumber: Yup.string()
                .required("* required field")
                .min(10, "Number should be 10 digits")
                .max(10, "Number should be 10 digits")
                .matches(phoneRegExp, "Number format is invalid"),

            password: Yup.string()
                .required("* required field")
                .min(8, "Password must be 8 characters"),

            confirmPassword: Yup.string()
                .required("* required field")
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
    })

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault()
        const user = {
            username: formik.values.username,
            email: formik.values.email,
            gender: formik.values.gender,
            mobileNumber: formik.values.mobileNumber,
            password1: formik.values.password,
            password2: formik.values.confirmPassword
        }

        console.log(JSON.stringify(user));

        let response;
        try {
            response = await axiosConf.signup(user);
            if (response.status === 201) {
                navigate("/user/verify");
            }
        } catch (error) {
            if (error.response.status === 0) {
                alert("Cannot connect to server");
            } else if (error.response.status === 409) {
                if (error.response.data.includes("username")) {
                    toast.error("username exists");
                }
                if (error.response.data.includes("mobileNumber")) {
                    toast.error("This mobile number is already registered");
                }
                if (error.response.data.includes("email")) {
                    toast.error("This email is already registered");
                }
            }
            else if (error.response.status >= 500 && error.response.status <= 599) {
                alert("Server error. Please try again in some time")
            }
        }
        console.log("resData", response);
    }

    return (
        <div>
            <Container fluid>
                <Grid xs={12}>
                    <Card className='bg-dark text-white my-3 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <CardContent className='d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                            <form onSubmit={onSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                                <div>
                                    <label>Username</label>
                                    <br />
                                    <input class="rounded"
                                        id="username"
                                        name="username"
                                        type="username"
                                        placeholder='Eg. JohnCena'
                                        {...formik.getFieldProps('username')}
                                    />
                                    {
                                        formik.touched.username && formik.errors.username ?
                                            (<div><small class="text-danger">{formik.errors.username}</small></div>) : null
                                    }
                                </div>

                                <div>
                                    <label>Email</label>
                                    <br />
                                    <input class="rounded"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='john@viewer.com'
                                        {...formik.getFieldProps('email')}
                                    />
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            (<div><small class="text-danger">{formik.errors.email}</small></div>) : null
                                    }
                                </div>
                                <div>
                                    <label>Mobile Number</label>
                                    <br />
                                    <input class="rounded"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        type="mobileNumber"
                                        placeholder='mobile number'
                                        {...formik.getFieldProps('mobileNumber')}
                                    />
                                    {
                                        formik.touched.mobileNumber && formik.errors.mobileNumber ?
                                            (<div><small class="text-danger">{formik.errors.mobileNumber}</small></div>) : null
                                    }
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <br />
                                    <input class="rounded"
                                        id="gender"
                                        name="gender"
                                        type="text"
                                        placeholder='E.g. male'
                                        {...formik.getFieldProps('gender')}
                                    />
                                    {
                                        formik.touched.gender && formik.errors.gender ?
                                            (<div><small class="text-danger">{formik.errors.gender}</small></div>) : null
                                    }
                                </div>

                                <div>
                                    <label>Password</label>
                                    <br />
                                    <input class="rounded"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='enter passowrd'
                                        {...formik.getFieldProps('password')}
                                    />
                                    {
                                        formik.touched.password && formik.errors.password ?
                                            (<div><small class="text-danger">{formik.errors.password}</small></div>) : null
                                    }
                                </div>

                                <div>
                                    <label>Confirm Password</label>
                                    <br />
                                    <input class="rounded"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder='confirm password'
                                        {...formik.getFieldProps('confirmPassword')}
                                    />
                                    {
                                        formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                            (<div><small class="text-danger">{formik.errors.confirmPassword}</small></div>) : null
                                    }
                                </div>
                                <button type="submit" class="btn btn-success btn-md mx-3 mt-3">Submit</button>
                                <p class="my-1">Already registered? <strong><a class="text-muted" href='/login'>Sign in</a></strong></p>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </div>
    )
}

export default Register