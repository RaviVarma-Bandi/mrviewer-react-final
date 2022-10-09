import React from 'react'
import { Card, CardContent, Container, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as axiosConf from "../api/axiosConf";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
      password: Yup.string()
        .required('Password is Required'),
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    let data = {
      email: formik.values.email,
      password: formik.values.password
    }

    console.log(data)

    try {
      const res = await axiosConf.login(data);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('jwtToken', JSON.stringify(res.data.jwtToken));
      console.log(localStorage)
      if(res.data.user === ""){
        toast.error('INVALID CREDENTIALS');
      }else{
        if(res.data.user.role === "USER") {
          navigate("/user/movies");
        }
        if(res.data.user.role === "ADMIN") {
          navigate("/admin");
        }
      }
    } 
    catch (error) {
       alert("Invalid email or password")
    }
  }

  return (
    <div>
      <Container fluid>
        <Grid xs={12}>
          <Card className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <CardContent className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                <input class="rounded"
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Email Address'
                  {...formik.getFieldProps('email')}
                />
                {
                  formik.touched.email && formik.errors.email ?
                    (<div><small class="text-danger">{formik.errors.email}</small></div>) : null
                }

                <input class="mt-3 rounded"
                  id="password"
                  name="password"
                  type="password"
                  placeholder='password'
                  {...formik.getFieldProps('password')}
                />
                {
                  formik.touched.password && formik.errors.password ?
                    (<div><small class="text-danger">{formik.errors.password}</small></div>) : null
                }
                <button type="submit" class="btn btn-success btn-md mx-3 mt-3">Submit</button>

                <a href="www.google.com" class="text-left my-1">
                  forgot password?
                </a>
                <p class="my-1">Don't have an account? <strong><a class="text-muted" href='/register'>Sign Up</a></strong></p>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  )
}


export default Login