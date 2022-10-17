import { Card, CardContent, Grid} from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import * as axiosConf from "../../api/axiosConf";
import { toast } from 'react-toastify';

function EditUser() {
    const phoneRegExp = /^\d{10}$/i;
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const [user, setUser] = useState([]);
    const param = useParams();
    const id = user.id;

    const formik = useFormik({
        enableReinitialze: true,
        initialValues: {
            username: '',
            email: '',
            mobileNumber: '',
            gender: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("* required field")
                .matches(emailRegExp, "Email format is invalid"),

            mobileNumber: Yup.string()
                .required("* required field")
                .min(10, "Number should be 10 digits")
                .max(10, "Number should be 10 digits")
                .matches(phoneRegExp, "Number format is invalid"),
        }),
    })

    const getUserById = async () => {
        try{
            const res = await axiosConf.getUserById(param.id);
            if(res !== null){
                setUser(JSON.parse(JSON.stringify(res.data)));
                console.log(res.data)
                formik.values.username = res.data.username;
                formik.values.email = res.data.email;
                formik.values.mobileNumber = res.data.mobileNumber;
                formik.values.gender = res.data.gender;
                formik.values.password = res.data.password;
                formik.values.confirmPassword = res.data.password;
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
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
            response = await axiosConf.editUser(user, id);
            if (response.status === 200) {
                alert("Updated details successfully")
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

    useEffect(()=>{
        getUserById();
    }, [])

    return (
        <div>
           <Container fluid>
                <Grid xs={12}>
                    <Card className='bg-dark text-white my-3 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <CardContent className='d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
                            <p className="text-white-50 mb-5">Please update only email and mobile number!</p>

                            <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                                <div>
                                    <label>Username</label>
                                    <br />
                                    <input class="rounded"
                                        id="username"
                                        name="username"
                                        type="username"
                                        placeholder='Eg. JohnCena'
                                        value = {formik.values.username}
                                        {...formik.getFieldProps('username')}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label>Email</label>
                                    <br />
                                    <input class="rounded"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='john@viewer.com'
                                        value = {formik.values.email}
                                        onChange={formik.handleChange}
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
                                        value = {formik.values.mobileNumber}
                                        onChange = {formik.handleChange}
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
                                        value = {formik.values.gender}
                                        {...formik.getFieldProps('gender')}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <br />
                                    <input class="rounded"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='enter passowrd'
                                        value = {formik.values.password}
                                        {...formik.getFieldProps('password')}
                                        hidden
                                    />
                                </div>

                                <div>
                                    <br />
                                    <input class="rounded"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder='confirm password'
                                        value={formik.values.password}
                                        {...formik.getFieldProps('confirmPassword')}
                                        hidden
                                    />
                                </div>
                                <button type="submit" class="btn btn-success btn-md mx-3 ">Submit</button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </div>
    )
}

export default EditUser