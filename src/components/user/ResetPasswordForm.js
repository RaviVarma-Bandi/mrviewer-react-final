import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { useFormik } from 'formik'
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import * as axiosConf from "../../api/axiosConf";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      password1: "",
      password2: ""
    },
    validationSchema: Yup.object({
      password1: Yup.string()
        .required("* required field")
        .min(8, "Password must be 8 characters"),

      password2: Yup.string()
        .required("* required field")
        .oneOf([Yup.ref('password1'), null], 'Passwords must match')
    }),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    let res;
    console.log(searchParams.get("token"));
    let token = searchParams.get("token");
    let passwords = {
      password1 : formik.values.password1,
      password2 : formik.values.password2
    }
    try{
      res = await axiosConf.passowordResets(token, passwords);
      if(res.status >= 200 && res.status <= 299){
        alert("password changed")
      }
    }catch(error){
      console.log("error",error)
    }
  }


  return (
    <div>
      <Container fluid>
        <Grid xs={12}>
          <Card className='bg-dark text-white my-3 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <CardContent className='d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                <div>
                  <label>Password</label>
                  <br />
                  <input class="rounded"
                    id="password1"
                    name="password1"
                    type="password"
                    placeholder='enter passowrd'
                    {...formik.getFieldProps('password1')}
                  />
                  {
                    formik.touched.password1 && formik.errors.password1 ?
                      (<div><small class="text-danger">{formik.errors.password1}</small></div>) : null
                  }
                </div>

                <div>
                  <label>Confirm Password</label>
                  <br />
                  <input class="rounded"
                    id="password2"
                    name="password2"
                    type="password"
                    placeholder='confirm password'
                    {...formik.getFieldProps('password2')}
                  />
                  {
                    formik.touched.password2 && formik.errors.password2 ?
                      (<div><small class="text-danger">{formik.errors.password2}</small></div>) : null
                  }
                </div>
                <button type="submit" class="btn btn-success btn-md mx-3 mt-3">Submit</button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  )
}

export default ResetPasswordForm