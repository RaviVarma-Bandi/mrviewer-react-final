import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react'
import * as axiosConf from "../../api/axiosConf";

function ResetPassword() {
    const emailRegExp =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const formik = useFormik ({
        initialValues:{
            email:""
        },
        onSubmit: async (values) => {
            console.log(values);
            let res;
            try{
                res = await axiosConf.resetPassword(values.email);
                if(res.status === 204){
                    alert("nice")
                }
                console.log(res);
            }catch(error){
                console.log("error", error);
                if(error.response.status === 404){
                    formik.errors.email = "User does not exist";
                }
            }
        },
        validate: (values) => {
            let errors = {};
            if(!values.email) {
                errors.email="* required feild";
            }else if(!emailRegExp.test(values.email)){
                errors.email = "invalid email pattern";
            }

            return errors;
        },
    });

    return (
        <div>
            <Container fluid>
                <Grid xs={12}>
                    <Card className='bg-dark text-white my-3 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <CardContent className='d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
                            <p className="text-white-50 mb-5">Please provide registered email only!</p>

                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                                <div>
                                    <label>Email</label>
                                    <br />
                                    <input class="rounded"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='provide email'
                                        {...formik.getFieldProps('email')}
                                    />
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            (<div><small class="text-danger">{formik.errors.email}</small></div>) : null
                                    }
                                </div>

                                <button type="submit" class="btn btn-success btn-md my-3 mx-3 ">Submit</button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </div>
    )
}

export default ResetPassword